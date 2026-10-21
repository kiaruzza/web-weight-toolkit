import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { validateResult, normalizeResult } from './lib/ecoindex.mjs';

const [id, expectedUrl, output = 'reports/ecoindex'] = process.argv.slice(2);
if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id ?? '') || !expectedUrl) {
  throw new Error('Usage: npm run metrics:ecoindex -- UUID EXPECTED_URL [output-directory]');
}
const expected = new URL(expectedUrl);
if (!['http:', 'https:'].includes(expected.protocol)) throw new Error('An HTTP(S) URL is required.');
const source = `https://api.ecoindex.fr/v1/ecoindexes/${id}`;
async function getJson(url, optional = false) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (optional && response.status === 204) return null;
  if (!response.ok || response.status === 204) throw new Error(`EcoIndex HTTP ${response.status}: ${url}`);
  return response.json();
}
const result = validateResult(await getJson(source), expectedUrl, id);
const practices = await getJson(`${source}/best-practices`, true);
const snapshot = normalizeResult(result, practices, { source, importedAt: new Date().toISOString() });
await mkdir(output, { recursive: true });
await writeFile(join(output, 'raw.json'), JSON.stringify({ result, practices }, null, 2) + '\n');
await writeFile(join(output, 'snapshot.json'), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Existing result imported into ${output}; no new scan started.`);
