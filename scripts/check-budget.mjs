import { readFile } from 'node:fs/promises';
import { measureSite, writeReport, printReport } from './page-weight.mjs';
const limits = JSON.parse(await readFile(new URL('../budget.json', import.meta.url), 'utf8'));
const report = await writeReport(await measureSite(process.argv[2] ?? 'dist'));
printReport(report);
for (const page of report.pages) {
  const actual = { html: page.resources.html, css: page.resources.css,
    js: page.resources.applicationJs, fonts: page.resources.fonts,
    largestImage: page.largestImageBytes, total: page.rawBytes,
    requests: page.requestCount, thirdParty: page.thirdPartyRequestCount };
  for (const [key, limit] of Object.entries(limits)) {
    if (!Number.isFinite(limit) || limit < 0 || !(key in actual)) throw new Error(`Invalid threshold: ${key}`);
    if (actual[key] > limit) {
      console.error(`${page.route}: ${key} = ${actual[key]}, limit ${limit}`);
      process.exitCode = 1;
    }
  }
  if (page.missingResources.length) {
    console.error(`${page.route}: missing resources: ${page.missingResources.join(', ')}`);
    process.exitCode = 1;
  }
}
