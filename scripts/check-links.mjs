import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, relative, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist');
const failures = [];

async function walk(dir) {
  const files = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) files.push(...(await walk(path)));
    else if (path.endsWith('.html')) files.push(path);
  }
  return files;
}

function routeFor(file) {
  const value = relative(root, file).split(sep).join('/');
  if (value === 'index.html') return '/';
  if (value.endsWith('/index.html')) return `/${value.slice(0, -'index.html'.length)}`;
  return `/${value}`;
}

function pageFor(pathname, sourceFile) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.startsWith('/')) {
    const clean = decoded.slice(1);
    return extname(clean) ? join(root, clean) : join(root, clean, 'index.html');
  }
  const target = normalize(join(dirname(sourceFile), decoded));
  return extname(target) ? target : join(target, 'index.html');
}

function idsIn(source) {
  return new Set(
    [...source.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => decodeURIComponent(match[1])),
  );
}

const files = await walk(root);
const sources = new Map(
  await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])),
);

for (const [file, source] of sources) {
  const route = routeFor(file);
  const links = [...source.matchAll(/<a\b([^>]*)>/gi)].map((match) => {
    const attributes = match[1];
    const href = attributes.match(/\bhref=["']([^"']*)["']/i)?.[1] ?? '';
    const target = attributes.match(/\btarget=["']([^"']*)["']/i)?.[1] ?? '';
    const rel = attributes.match(/\brel=["']([^"']*)["']/i)?.[1] ?? '';
    return { href, target, rel };
  });

  for (const { href, target, rel } of links) {
    if (!href) continue;

    if (/^https?:/i.test(href)) {
      const relTokens = new Set(rel.toLowerCase().split(/\s+/).filter(Boolean));

      if (target === '_blank' && !relTokens.has('noopener')) {
        failures.push(`${route}: ${href} requires rel="noopener"`);
      }
      continue;
    }

    if (/^(?:mailto:|tel:)/i.test(href)) continue;
    const [pathname, rawFragment] = href.split('#', 2);
    const targetFile = pathname ? pageFor(pathname.split('?')[0], file) : file;
    const targetSource = sources.get(targetFile);

    if (!targetSource) {
      failures.push(`${route}: ${href} points to a missing local page`);
      continue;
    }

    if (rawFragment) {
      const fragment = decodeURIComponent(rawFragment);
      if (!idsIn(targetSource).has(fragment)) {
        failures.push(`${route}: ${href} points to a missing fragment`);
      }
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Links checked on ${files.length} generated HTML pages.`);
