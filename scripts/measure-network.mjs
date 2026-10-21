import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [inputUrl, outputPath = 'reports/network', duration = '15'] = process.argv.slice(2);
if (!inputUrl) throw new Error('Usage: npm run measure:network -- URL [output-directory] [seconds]');
const targetUrl = new URL(inputUrl);
if (!['http:', 'https:'].includes(targetUrl.protocol)) throw new Error('An HTTP(S) URL is required.');
const seconds = Number(duration);
if (!Number.isFinite(seconds) || seconds < 1 || seconds > 120) throw new Error('Duration must be between 1 and 120 seconds.');
const output = path.resolve(outputPath);
mkdirSync(output, { recursive: true });
const targets = [{ id: 'page', label: targetUrl.hostname, url: targetUrl.href }];
const protocol = {
  headless: true,
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  browserZoom: '100%',
  locale: 'it-IT',
  timezoneId: 'Europe/Rome',
  observationSeconds: seconds,
  repetitions: 3,
  cache: 'fresh browser context per run; HTTP cache disabled via CDP; service workers bypassed',
  interaction: 'none: no scroll, no consent, no subscription dismissal, no login',
  throttling: 'none; network and CPU not emulated',
  transferredBytes:
    'sum of CDP Network.loadingFinished.encodedDataLength for completed HTTP(S) requests, including protocol headers as reported by Chromium; no inferred bytes for failures or unfinished requests',
  jsTransferredBytes: 'same transfer measure, restricted to CDP resource type Script',
  otherOrigins:
    'requests whose URL origin differs from the final top-level document origin; includes subdomains/CDNs and is not a tracker classification',
  aggregation:
    'median of three eligible runs for each metric, calculated independently; raw runs retained',
  scope:
    'initial load of this URL for a fixed observation window, no interactions; not an energy/CO2 measurement',
};
const browser = await chromium.launch({ headless: true,  });
const report = {
  startedAt: new Date().toISOString(),
  browser: browser.version(),
  protocol,
  pages: [],
};
try {
  for (const target of targets) {
    const runs = [];
    for (let iteration = 1; iteration <= protocol.repetitions; iteration++) {
      const context = await browser.newContext({
        viewport: protocol.viewport,
        deviceScaleFactor: 1,
        locale: protocol.locale,
        timezoneId: protocol.timezoneId,
        serviceWorkers: 'block',
      });
      try {
        const page = await context.newPage();
        const client = await context.newCDPSession(page);
        await client.send('Network.enable');
        await client.send('Network.setCacheDisabled', { cacheDisabled: true });
        await client.send('Network.setBypassServiceWorker', { bypass: true });
        const requests = [],
          current = new Map();
        const at = () => new Date().toISOString();
        let observing = true;
        client.on('Network.requestWillBeSent', (event) => {
          if (!observing || !/^https?:/.test(event.request.url)) return;
          if (event.redirectResponse && current.has(event.requestId)) {
            const previous = current.get(event.requestId);
            previous.status = event.redirectResponse.status;
            previous.redirect = true;
            previous.encodedDataLength = event.redirectResponse.encodedDataLength || 0;
            previous.finished = true;
          }
          const request = {
            requestId: event.requestId,
            url: event.request.url,
            method: event.request.method,
            type: event.type,
            startedAt: at(),
            finished: false,
          };
          requests.push(request);
          current.set(event.requestId, request);
        });
        client.on('Network.responseReceived', (event) => {
          if (!observing) return;
          const request = current.get(event.requestId);
          if (request)
            Object.assign(request, {
              status: event.response.status,
              mimeType: event.response.mimeType,
              fromDiskCache: !!event.response.fromDiskCache,
              fromServiceWorker: !!event.response.fromServiceWorker,
            });
        });
        client.on('Network.loadingFinished', (event) => {
          if (!observing) return;
          const request = current.get(event.requestId);
          if (request)
            Object.assign(request, { encodedDataLength: event.encodedDataLength, finished: true });
        });
        client.on('Network.loadingFailed', (event) => {
          if (!observing) return;
          const request = current.get(event.requestId);
          if (request)
            Object.assign(request, { failed: event.errorText, canceled: !!event.canceled });
        });
        const startedAt = at(),
          started = performance.now();
        let navigationError;
        const navigation = page
          .goto(target.url, { waitUntil: 'domcontentloaded', timeout: Math.max(500, seconds * 1000 - 500) })
          .catch((error) => {
            navigationError = error.message;
          });
        await page.waitForTimeout(protocol.observationSeconds * 1000);
        observing = false;
        const observedMilliseconds = performance.now() - started;
        await navigation;
        const finalUrl = page.url(),
          finalOrigin = new URL(finalUrl).origin;
        const title = await page.title();
        const documentRequest = requests.findLast(
          (request) => request.type === 'Document' && !request.redirect && request.url === finalUrl.split('#')[0],
        );
        const status = documentRequest?.status;
        const blocked =
          status >= 400 || /Attention Required|Just a moment|Access denied/i.test(title);
        const finished = requests.filter((request) => request.finished);
        const sum = (list) =>
          list.reduce((total, request) => total + (request.encodedDataLength || 0), 0);
        const metrics = {
          transferredBytes: sum(finished),
          requests: requests.length,
          jsTransferredBytes: sum(finished.filter((request) => request.type === 'Script')),
          otherOriginRequests: requests.filter(
            (request) => new URL(request.url).origin !== finalOrigin,
          ).length,
          failedRequests: requests.filter((request) => request.failed).length,
          unfinishedRequests: requests.filter((request) => !request.finished && !request.failed)
            .length,
          imageTransferredBytes: sum(finished.filter((request) => request.type === 'Image')),
          fontTransferredBytes: sum(finished.filter((request) => request.type === 'Font')),
        };
        const run = {
          iteration,
          startedAt,
          observedMilliseconds: Math.round(observedMilliseconds),
          finalUrl,
          title,
          status,
          eligible: status >= 200 && status < 400 && !blocked && !navigationError,
          navigationError,
          headings: await page.locator('h1').allTextContents(),
          metrics,
          requests,
        };
        if (iteration === 1) await page.screenshot({ path: path.join(output, `${target.id}.png`) });
        runs.push(run);
        console.log(
          JSON.stringify({
            id: target.id,
            iteration,
            status,
            eligible: run.eligible,
            title,
            ...metrics,
          }),
        );
      } finally {
        await context.close();
      }
    }
    const eligible = runs.filter((run) => run.eligible);
    const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
    const medians =
      eligible.length === protocol.repetitions
        ? Object.fromEntries(
            Object.keys(eligible[0].metrics).map((key) => [
              key,
              median(eligible.map((run) => run.metrics[key])),
            ]),
          )
        : null;
    report.pages.push({ ...target, medians, runs });
    writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
  }
} finally {
  await browser.close();
}
report.finishedAt = new Date().toISOString();
writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
console.log('Saved: ' + path.join(output, 'results.json'));
