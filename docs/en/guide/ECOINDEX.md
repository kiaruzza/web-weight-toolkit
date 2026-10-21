# EcoIndex, Ecograder and interpreting results

**English** | [Italiano](../../guide/ECOINDEX.md)

## The question EcoIndex addresses

[EcoIndex](https://www.ecoindex.fr/en/how-it-works/) constructs an indicator
using transferred weight, requests and DOM complexity. A report may include
a score, grade and modeled environmental values. The first inputs help locate
technical costs; environmental values belong to the model, not to direct
measurements of your device's energy, emissions or water use.

## Run and document an analysis

1. Choose the exact public URL. After deployment, check that the expected content is reachable without login.
2. Open EcoIndex, start the analysis through its interface and wait for the result. Record date, URL, identifier and engine version where available.
3. Check that result and screenshot show the expected page. Consent, blocks and redirects can change what is observed.
4. Record size, requests and DOM nodes separately. Preserve the service's units in the template.
5. Read recommendations, choose a cause to verify in the browser and open an improvement item.
6. After changing the site, obtain a comparable analysis. Keep the prior result and explain content or condition differences.

Use the [official methodology](https://www.ecoindex.fr/en/how-it-works/) to
interpret the calculation. Do not reconstruct scores using invented thresholds
or treat grades and scores as universal indicators.

## Import an available result

The script derives from the original site's `update-ecoindex-snapshot.mjs`,
generalized to require an expected URL and write to a report directory.
It retrieves an existing API result without requesting a new scan:

```sh
npm run metrics:ecoindex -- RESULT_ID https://your-domain.example/page/ reports/ecoindex-before
```

Replace `RESULT_ID` with the analysis's real UUID, not a page name.
The script validates the full URL, date, numeric values and grade. It preserves
the raw response, normalized snapshot, source and import date. The snapshot
keeps `size` in the API's declared unit (KB), without silently converting to
bytes. Emissions are labeled `gCO2e`, water `cl`. Engine version is retained
when present; it is not inferred from the API URL.

The best-practices endpoint may return 204 when those data were not collected.
The snapshot records `null`, rather than replacing it with zeros or inventing
outcomes. A 404 or a result for a different URL stops the import.
Matching is intentionally strict: for an apex-domain report, provide that URL
and separately record any redirect to `www`.

Imports go into Git-ignored reports. To publish them, copy only a reviewed
result into a dedicated versioned directory and accompany it with
[ECOINDEX.md](../../../templates/en/ECOINDEX.md). Do not trigger an external
scan on every commit. Keep an analysis and update it when verifying a meaningful
change is useful.

Technical references: [API](https://api.ecoindex.fr/docs),
[OpenAPI schema](https://api.ecoindex.fr/openapi.json).

## From a report to a change

Use this as a diagnostic plan, not as the service's formula:

| Observation | Project check | Change to try |
| --- | --- | --- |
| Images dominate Network | Which variants download at this viewport? | Resize, correct sizes or load on request |
| Many scripts start immediately | Which task needs each one? | Remove unused code or defer integrations |
| Highly repetitive HTML | Do wrappers or duplicate content serve a purpose? | Simplify markup while preserving semantics and navigation |
| Unexpected external requests | Which element/service starts them? | Remove them or make activation explicit |
| Inconsistent runs | Same page, version and conditions? | Repeat a controlled series and explain exclusions |

Verify success on the user journey too. A shorter DOM that removes labels or
useful content is not a good outcome.

## Ecograder

[Ecograder](https://ecograder.com/) provides another assessment with recommendations.
On 21 October 2026, the consulted service presented a beta and a legacy link;
record which you used. Analyze the chosen URL, save the report and verify
one recommendation at a time in your environment.

For example, check a compression warning against a GET response for that resource;
compare render-blocking CSS warnings with the actual observed delay.
Do not change architecture merely to remove a warning with no demonstrated
effect. Ecograder and EcoIndex scores are not interchangeable.
