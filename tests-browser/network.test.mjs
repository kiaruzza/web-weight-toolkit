import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';

test('measures three local visits and preserves raw data, errors and medians', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'network-'));
  const server = createServer((request, response) => {
    if (request.url === '/app.js') {
      response.writeHead(200, { 'Content-Type': 'application/javascript' });
      response.end('document.body.dataset.ready = "true";');
    } else if (request.url === '/manca.png') {
      response.writeHead(404); response.end('missing');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end('<!doctype html><html lang="it"><title>Local fixture</title><h1>Test page</h1><script src="/app.js"></script><img src="/manca.png" alt=""></html>');
    }
  });
  try {
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const url = `http://127.0.0.1:${server.address().port}/`;
    const child = spawn(process.execPath, [resolve('scripts/measure-network.mjs'), url, dir, '1']);
    let errors = '';
    child.stderr.on('data', chunk => { errors += chunk; });
    child.stdout.resume();
    const code = await new Promise((resolve, reject) => { child.once('error', reject); child.once('close', resolve); });
    assert.equal(code, 0, errors);
    const report = JSON.parse(await readFile(join(dir, 'results.json'), 'utf8'));
    const page = report.pages[0];
    assert.equal(page.runs.length, 3);
    assert.ok(page.runs.every(run => run.eligible && run.status === 200));
    assert.ok(page.medians.transferredBytes > 0);
    assert.ok(page.medians.jsTransferredBytes > 0);
    assert.equal(page.medians.otherOriginRequests, 0);
    assert.ok(page.runs.every(run => run.requests.some(request => request.status === 404)));
    assert.ok(report.browser);
  } finally {
    await new Promise(resolve => server.close(resolve));
    await rm(dir, { recursive: true, force: true });
  }
});
