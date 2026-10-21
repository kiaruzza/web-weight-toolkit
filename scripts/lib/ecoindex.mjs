export function validateResult(result, expectedUrl, id) {
  if (!result || typeof result !== 'object') throw new Error('Invalid EcoIndex response.');
  const expected = new URL(expectedUrl);
  if (!['http:', 'https:'].includes(expected.protocol)) throw new Error('An HTTP(S) URL is required.');
  if (new URL(result.url).href !== expected.href) throw new Error(`Unexpected URL: ${result.url}; expected ${expected.href}`);
  if (result.id !== id) throw new Error('Unexpected EcoIndex identifier.');
  if (typeof result.date !== 'string' || !Number.isFinite(Date.parse(result.date))) throw new Error('Missing or invalid EcoIndex date.');
  for (const key of ['score', 'size', 'requests', 'nodes', 'ges', 'water']) {
    if (!Number.isFinite(result[key]) || result[key] < 0) throw new Error(`Invalid EcoIndex field: ${key}`);
  }
  if (result.score > 100 || !/^[A-G]$/.test(result.grade)) throw new Error('Invalid EcoIndex score or grade.');
  for (const key of ['requests', 'nodes']) {
    if (!Number.isInteger(result[key])) throw new Error(`Non-integer count: ${key}`);
  }
  return result;
}

export function normalizeResult(result, practices, metadata) {
  if (practices !== null) {
    for (const key of ['ok_count', 'warn_count', 'fail_count']) {
      if (!Number.isInteger(practices[key]) || practices[key] < 0) throw new Error(`Invalid best practices: ${key}`);
    }
  }
  return {
    ...metadata,
    id: result.id, analysisDate: result.date, url: result.url,
    engineVersion: result.ecoindex_version ?? null,
    score: result.score, grade: result.grade,
    observations: { size: { value: result.size, unit: 'KB (API-declared unit)' }, requests: result.requests, domNodes: result.nodes },
    modelEstimates: { greenhouseGas: { value: result.ges, unit: 'gCO2e' }, water: { value: result.water, unit: 'cl' } },
    bestPractices: practices === null ? null : { ok: practices.ok_count, warn: practices.warn_count, fail: practices.fail_count },
    scope: 'Existing EcoIndex result; service estimates, not direct energy or emissions measurements.',
  };
}
