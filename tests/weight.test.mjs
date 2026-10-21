import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { measureSite } from '../scripts/page-weight.mjs';

test('counts unique resources, inline scripts and missing resources', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'weight-'));
  try {
    await writeFile(join(dir, 'index.html'), '<link rel="stylesheet" href="/a.css"><img src="/manca.png"><script>abc</script><link rel="stylesheet" href="/a.css">');
    await writeFile(join(dir, 'a.css'), 'body{}');
    const { pages: [page] } = await measureSite(dir);
    assert.equal(page.requestCount, 2);
    assert.equal(page.resources.css, 6);
    assert.equal(page.resources.applicationJs, 3);
    assert.deepEqual(page.missingResources, ['/manca.png']);
    assert.equal(page.rawBytes, page.resources.html + 6);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('fails the budget for a regression on an internal page', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'budget-'));
  const script = resolve('scripts/check-budget.mjs');
  try {
    await mkdir(join(dir, 'dist', 'interna'), { recursive: true });
    await writeFile(join(dir, 'dist', 'index.html'), '<h1>Home</h1>');
    await writeFile(join(dir, 'dist', 'interna', 'index.html'), '<script>abc</script>');
    const result = spawnSync(process.execPath, [script, join(dir, 'dist')], { cwd: dir, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /\/interna\/: js/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
