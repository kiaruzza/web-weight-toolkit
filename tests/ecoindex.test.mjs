import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateResult, normalizeResult } from '../scripts/lib/ecoindex.mjs';
// Synthetic test data: not a real audit.
const id = '00000000-0000-4000-8000-000000000000';
const url = 'https://example.com/articolo/';
const result = { id, url, date: '2026-10-21T12:00:00Z', score: 80, grade: 'B', size: 42, nodes: 100, requests: 5, ges: 1, water: 2 };
test('rejects different URLs and paths, including on the same domain', () => {
  assert.throws(() => validateResult(result, 'https://example.com/', id), /Unexpected URL/);
  assert.equal(validateResult(result, url, id), result);
});
test('rejects incomplete results and impossible counts', () => {
  for (const change of [{ score: null }, { size: -1 }, { requests: 1.5 }, { date: null }, { grade: 'Z' }, { id: 'altro' }])
    assert.throws(() => validateResult({ ...result, ...change }, url, id));
});
test('preserves units and distinguishes missing practices from zero errors', () => {
  const snapshot = normalizeResult(result, null, { source: 'fixture' });
  assert.equal(snapshot.bestPractices, null);
  assert.equal(snapshot.observations.size.value, 42);
  assert.equal(snapshot.modelEstimates.water.unit, 'cl');
  assert.equal(snapshot.engineVersion, null);
  assert.throws(() => normalizeResult(result, { ok_count: -1 }, {}));
});
