import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { join, relative, sep } from 'node:path';

export const METHODOLOGY_VERSION = '1.0.0';

const RESOURCE_EXTENSIONS =
  /\.(?:avif|css|gif|html?|ico|jpe?g|js|mjs|mp3|mp4|ogg|otf|png|svg|ttf|wasm|webm|webp|woff2?|xml)$/i;
const IMAGE_EXTENSIONS = /\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i;
const FONT_EXTENSIONS = /\.(?:otf|ttf|woff2?)$/i;
const JS_EXTENSIONS = /\.(?:js|mjs)$/i;
const CSS_EXTENSIONS = /\.css$/i;

const byteLength = (value) => Buffer.byteLength(value);

async function walk(dir) {
  const result = [];
  for (const name of await readdir(dir)) {
    const filePath = join(dir, name);
    const info = await stat(filePath);
    if (info.isDirectory()) result.push(...(await walk(filePath)));
    else result.push(filePath);
  }
  return result;
}

function routeFor(filePath, root) {
  const path = relative(root, filePath).split(sep).join('/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -'/index.html'.length)}/`;
  return `/${path}`;
}

function isThirdParty(url) {
  return /^https?:$/i.test(url.protocol) && url.hostname !== 'local';
}

function isLocalUrl(value) {
  return value.startsWith('/') && !value.startsWith('//');
}

function cleanUrl(value) {
  return value.trim().split('#', 1)[0].split('?', 1)[0];
}

function candidatesFromSrcset(value) {
  const candidates = value
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter(Boolean);
  return candidates.length ? [candidates[candidates.length - 1]] : [];
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/gi)].map(([, name, value]) => [
      name.toLowerCase(),
      value,
    ]),
  );
}

function addReference(references, value, kind, baseUrl) {
  if (!value) return;
  const clean = cleanUrl(value);
  if (!clean || clean.startsWith('data:') || clean.startsWith('blob:') || clean.startsWith('#'))
    return;
  let url;
  try {
    url = new URL(clean, baseUrl);
  } catch {
    return;
  }
  references.push({ value: clean, url, kind });
}

function referencesFromHtml(source, pageUrl) {
  const references = [];
  for (const match of source.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)) {
    const tag = match[0];
    const element = match[1].toLowerCase();
    const attrs = attributes(tag);
    if (element === 'link') {
      const rel = (attrs.rel ?? '').toLowerCase().split(/\s+/);
      if (
        rel.some((value) =>
          [
            'stylesheet',
            'icon',
            'apple-touch-icon',
            'manifest',
            'preload',
            'modulepreload',
          ].includes(value),
        )
      ) {
        addReference(references, attrs.href, rel.includes('stylesheet') ? 'css' : 'other', pageUrl);
      }
    }
    if (element === 'script') addReference(references, attrs.src, 'js', pageUrl);
    if (
      ['img', 'source', 'video', 'audio', 'track', 'iframe', 'embed', 'object'].includes(element)
    ) {
      addReference(references, attrs.src, element === 'iframe' ? 'other' : 'media', pageUrl);
      for (const value of candidatesFromSrcset(attrs.srcset ?? ''))
        addReference(references, value, 'media', pageUrl);
      if (element === 'object') addReference(references, attrs.data, 'other', pageUrl);
    }
  }
  for (const match of source.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const value of cssUrls(match[1]))
      addReference(references, value, 'css-dependency', pageUrl);
  }
  return references;
}

function cssUrls(source) {
  return [...source.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map(([, value]) => value);
}

function localFileFor(url, root, filesByRelativePath) {
  if (!isLocalUrl(url.pathname)) return null;
  let path = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (path.endsWith('/')) path += 'index.html';
  const direct = filesByRelativePath.get(path);
  if (direct) return direct;
  if (!RESOURCE_EXTENSIONS.test(path)) return filesByRelativePath.get(`${path}/index.html`) ?? null;
  return null;
}

function kindFor(filePath, referenceKind) {
  if (referenceKind === 'js' || JS_EXTENSIONS.test(filePath)) return 'js';
  if (referenceKind === 'css' || CSS_EXTENSIONS.test(filePath)) return 'css';
  if (IMAGE_EXTENSIONS.test(filePath)) return 'images';
  if (FONT_EXTENSIONS.test(filePath)) return 'fonts';
  return 'other';
}

async function resourceInfo(filePath, root, kind, cssVisited = new Set(), filesByRelativePath) {
  const data = await readFile(filePath);
  const info = {
    path: `/${relative(root, filePath).split(sep).join('/')}`,
    kind,
    rawBytes: data.length,
    gzipBytes: gzipSync(data).length,
    brotliBytes: brotliCompressSync(data).length,
  };
  if (kind === 'css' && !cssVisited.has(filePath)) {
    cssVisited.add(filePath);
    info.dependencies = [];
    for (const value of cssUrls(data.toString('utf8'))) {
      try {
        const dependencyUrl = new URL(value, `http://local${info.path}`);
        const dependency = localFileFor(dependencyUrl, root, filesByRelativePath);
        if (dependency && !info.dependencies.includes(dependency))
          info.dependencies.push(dependency);
      } catch {
        // Invalid CSS URLs are left to the existing HTML/CSS validation tools.
      }
    }
  }
  return info;
}

function emptyBreakdown() {
  return { html: 0, css: 0, applicationJs: 0, images: 0, fonts: 0, other: 0 };
}

function percentageDifference(current, baseline) {
  if (baseline === 0) return current === 0 ? 0 : null;
  return ((current - baseline) / baseline) * 100;
}

export async function measureSite(root = 'dist') {
  let files;
  try {
    files = await walk(root);
  } catch (error) {
    if (error.code === 'ENOENT')
      throw new Error(
        `Cannot measure page weight: ${root}/ does not exist. Generate a build first.`,
      );
    throw error;
  }
  const filesByRelativePath = new Map(
    files.map((filePath) => [relative(root, filePath).split(sep).join('/'), filePath]),
  );
  const htmlFiles = files.filter((filePath) => filePath.endsWith('.html')).sort();
  if (!htmlFiles.length)
    throw new Error(
      `Cannot measure page weight: no HTML files found in ${root}/. Generate a build first.`,
    );

  const pages = [];
  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, 'utf8');
    const route = routeFor(htmlFile, root);
    const pageUrl = new URL(route, 'http://local');
    const references = referencesFromHtml(html, pageUrl);
    const localResources = new Map();
    const thirdPartyResources = new Set();
    const missingResources = new Set();
    const cssVisited = new Set();


    for (const reference of references) {

      if (isThirdParty(reference.url)) {
        thirdPartyResources.add(reference.url.href);
        continue;
      }
      if (!isLocalUrl(reference.url.pathname)) continue;
      const filePath = localFileFor(reference.url, root, filesByRelativePath);
      if (!filePath) {
        missingResources.add(reference.value);
        continue;
      }
      const kind = kindFor(filePath, reference.kind);
      if (!localResources.has(filePath)) {
        localResources.set(
          filePath,
          await resourceInfo(filePath, root, kind, cssVisited, filesByRelativePath),
        );
      }
      const resource = localResources.get(filePath);
      for (const dependency of resource.dependencies ?? []) {
        if (!localResources.has(dependency)) {
          localResources.set(
            dependency,
            await resourceInfo(
              dependency,
              root,
              kindFor(dependency, 'other'),
              cssVisited,
              filesByRelativePath,
            ),
          );
        }
      }
    }

    const breakdown = emptyBreakdown();
    for (const resource of localResources.values()) {
      const category = resource.kind === 'js' ? 'applicationJs' : resource.kind;
      breakdown[category] += resource.rawBytes;
    }
    for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi))
      breakdown.css += byteLength(match[1]);
    for (const match of html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi))
      breakdown.applicationJs += byteLength(match[1]);
    breakdown.html = byteLength(html);
    const localRawResources = [...localResources.values()];
    const rawBytes =
      breakdown.html + localRawResources.reduce((sum, resource) => sum + resource.rawBytes, 0);
    const estimatedGzipBytes =
      gzipSync(Buffer.from(html)).length +
      localRawResources.reduce((sum, resource) => sum + resource.gzipBytes, 0);
    const estimatedBrotliBytes =
      brotliCompressSync(Buffer.from(html)).length +
      localRawResources.reduce((sum, resource) => sum + resource.brotliBytes, 0);
    const imageSizes = localRawResources
      .filter((resource) => resource.kind === 'images')
      .map((resource) => resource.rawBytes);
    const baseline = null;
    pages.push({
      route,
      resources: {
        html: breakdown.html,
        css: breakdown.css,
        applicationJs: breakdown.applicationJs,
        images: breakdown.images,
        fonts: breakdown.fonts,
        other: breakdown.other,
      },
      rawBytes,
      estimatedGzipBytes,
      estimatedBrotliBytes,
      largestImageBytes: Math.max(0, ...imageSizes),
      requestCount: 1 + localResources.size,
      thirdPartyRequestCount: thirdPartyResources.size,
      localResources: localRawResources.map(({ path, kind, rawBytes, gzipBytes, brotliBytes }) => ({
        path,
        kind,
        rawBytes,
        gzipBytes,
        brotliBytes,
      })),
      thirdPartyResources: [...thirdPartyResources].sort(),
      missingResources: [...missingResources].sort(),
      baseline,
    });
  }
  return { pages };
}

export async function writeReport(
  report,
  reportPath = 'reports/page-weight.json',
  baselinePath = 'performance/page-weight-baseline.json',
) {
  let baseline;
  try {
    baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const baselinePages = new Map((baseline?.pages ?? []).map((page) => [page.route, page]));
  const pages = report.pages.map((page) => {
    const baselinePage = baselinePages.get(page.route);
    return {
      ...page,
      baseline: baselinePage
        ? {
            rawBytes: baselinePage.rawBytes,
            estimatedGzipBytes: baselinePage.estimatedGzipBytes,
            estimatedBrotliBytes: baselinePage.estimatedBrotliBytes,
            rawDifferenceBytes: page.rawBytes - baselinePage.rawBytes,
            gzipDifferenceBytes: page.estimatedGzipBytes - baselinePage.estimatedGzipBytes,
            brotliDifferenceBytes: page.estimatedBrotliBytes - baselinePage.estimatedBrotliBytes,
            rawDifferencePercent: percentageDifference(page.rawBytes, baselinePage.rawBytes),
            gzipDifferencePercent: percentageDifference(
              page.estimatedGzipBytes,
              baselinePage.estimatedGzipBytes,
            ),
            brotliDifferencePercent: percentageDifference(
              page.estimatedBrotliBytes,
              baselinePage.estimatedBrotliBytes,
            ),
          }
        : null,
    };
  });
  const output = {
    measurementTimestamp: new Date().toISOString(),
    methodologyVersion: METHODOLOGY_VERSION,
    measurementScope:
      'Generated HTML and locally referenced resources in dist/. Compressed values are local estimates, not production network transfer.',
    pages,
  };
  await mkdir(join(reportPath, '..'), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(output, null, 2)}\n`);
  return output;
}

export function printReport(report) {
  console.log('Generated-resource report');
  console.log(
    'Generated file bytes; gzip/Brotli are local estimates, not production traffic.',
  );
  for (const page of report.pages) {
    console.log(`\nRoute: ${page.route}`);
    console.log(`HTML                  ${page.resources.html} B`);
    console.log(`CSS                   ${page.resources.css} B`);
    console.log(`Application JavaScript        ${page.resources.applicationJs} B`);
    console.log(`Images              ${page.resources.images} B`);
    console.log(`Font                  ${page.resources.fonts} B`);
    console.log(`Other                 ${page.resources.other} B`);
    console.log(`Local resources       ${page.requestCount}`);
    console.log(`Remote references ${page.thirdPartyRequestCount}`);
    console.log('--------------------------------');
    console.log(`Raw total             ${page.rawBytes} B`);
    console.log(`Estimated gzip        ${page.estimatedGzipBytes} B`);
    console.log(`Estimated Brotli      ${page.estimatedBrotliBytes} B`);
    if (page.baseline) {
      console.log(
        `Raw baseline          ${page.baseline.rawBytes} B (${formatChange(page.baseline.rawDifferenceBytes, page.baseline.rawDifferencePercent)})`,
      );
      console.log(
        `Baseline gzip         ${page.baseline.estimatedGzipBytes} B (${formatChange(page.baseline.gzipDifferenceBytes, page.baseline.gzipDifferencePercent)})`,
      );
      console.log(
        `Baseline Brotli       ${page.baseline.estimatedBrotliBytes} B (${formatChange(page.baseline.brotliDifferenceBytes, page.baseline.brotliDifferencePercent)})`,
      );
    }
    if (page.missingResources.length)
      console.error(`Missing local resources: ${page.missingResources.join(', ')}`);
  }
  console.log('\nSummary');
  console.log('Route                    Bytes     Brotli*   JS        Resources Remote');
  for (const page of report.pages) {
    console.log(
      `${page.route.padEnd(24)} ${String(page.rawBytes).padStart(7)} B ${String(page.estimatedBrotliBytes).padStart(7)} B ${String(page.resources.applicationJs).padStart(7)} B ${String(page.requestCount).padStart(8)} ${String(page.thirdPartyRequestCount).padStart(11)}`,
    );
  }
}

function formatChange(bytes, percent) {
  const sign = bytes > 0 ? '+' : '';
  const percentage = percent === null ? 'n/a' : `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`;
  return `${sign}${bytes} B, ${percentage}`;
}
