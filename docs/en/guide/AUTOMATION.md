# Automation: builds, browser, EcoIndex and CI

**English** | [Italiano](../../guide/AUTOMAZIONE.md)

Local checks catch repeatable regressions. External scans and manual reviews
have different schedules and purposes. Run commands from the toolkit root;
relative output paths are resolved against the current directory.

## 1. Measure the build

Static scripts only need Node.js 22.12 or later:

```sh
node scripts/measure-page-weight.mjs /path/to/build
node scripts/check-budget.mjs /path/to/build
node scripts/check-links.mjs /path/to/build
```

`reports/page-weight.json` contains discovered HTML routes, unique local
resources, raw bytes, gzip/Brotli estimates and missing resources.
Budgets apply to every page, not only the home page. Limits are in bytes:
1024 bytes = 1 KiB. Thresholds are initial choices that need a reason.

The regular-expression parser is not a browser. It does not follow JS/CSS imports
or every nested CSS dependency. It takes the last candidate of each srcset
and may count alternatives a browser will not load together. Absolute HTTP
URLs are classified as remote even for the original domain. No detected
references is not absolute proof of no external services. The link checker
is limited to local HTML pages and fragments.

## 2. Baselines and budgets differ

```sh
mkdir -p performance
cp reports/page-weight.json performance/page-weight-baseline.json
```

The baseline records a starting point. Later reports compare matching routes
using absolute/percentage differences. Baseline growth alone does not fail a
check; thresholds in `budget.json` do. Do not update both merely to make a
check pass; record the decision.

## 3. Measure browser loading

Install tools and the browser once:

```sh
npm ci
npx playwright install chromium
npm run measure:network -- https://your-domain.example/page/ reports/network-before
```

The command derives from the presentation measurement. It runs **three** times,
each in a new context with HTTP cache disabled and service workers bypassed.
Viewport: 1440×900, scale 1, locale it-IT, timezone Europe/Rome. No network/CPU
emulation or interactions. Observation lasts 15 seconds from navigation start.
For another window, use the third argument, between 1 and 120 seconds:

```sh
npm run measure:network -- http://127.0.0.1:4321/ reports/network-local 5
```

Keep `results.json` and the first run's screenshot, `page.png`. The JSON includes Chromium
version, protocol, final URL, title, status, timings, errors and individual
requests. Byte values come from CDP for completed HTTP(S) requests; failed and
unfinished requests are counted separately, without invented byte values.
Other-origin requests are not a tracker classification. JS bytes concern Script
resources; they do not measure CPU time or separate inline scripts from the
document's bytes.

Medians are published only when all three runs are eligible. Timeouts, error
statuses and some block pages are excluded, but detection is not exhaustive:
always inspect title and screenshot. `null` medians mean diagnostic data was
kept, not that a comparable measurement is available. Metric medians are
calculated independently and need not correspond to the same execution.

For consent, scrolling, login and interactions, use a specific documented test.
This script describes initial loading, not the whole experience. The browser's
observation locale remains it-IT regardless of the documentation/CLI language;
record that when comparing multilingual pages.

## 4. Import EcoIndex

```sh
npm run metrics:ecoindex -- RESULT_UUID https://your-domain.example/ reports/ecoindex-before
```

The script imports only an existing result, validates URL/fields and separates
observations from estimates. See the [EcoIndex guide](ECOINDEX.md) for interpretation,
units, 204 responses and publication criteria. It is not a job for every pull
request and does not replace Network.

## 5. Lighthouse CI

The configuration uses `./dist`, three home-page runs and local output.
Change `staticDistDir` and `url` for your project. For remote sites, remove
`staticDistDir` and supply absolute URLs.

```sh
npm run lighthouse
```

Chrome/Chromium must be available. Set `CHROME_PATH` to the executable if needed.
Performance below 0.90 gives a warning; accessibility below 1 gives an error.
These thresholds are not conformance statements. Do not confuse `.lighthouseci/`
with the static report `reports/page-weight.json`.
Reference: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci).

## 6. Reasonable schedules

| Moment | Suggested project checks |
| --- | --- |
| Code/content change | Build, HTML, links, budgets and tests for changed parts |
| New interaction | Browser, keyboard, screen reader and JS-off scenario |
| Representative release | Lighthouse on main routes and Network comparison |
| After deployment | Compression, caching, redirects, 404s and public journeys |
| Scheduled review/substantial change | EcoIndex, provider, WSG and technical statement |

The template includes CI for site checks. The toolkit includes CI for its own
tests; it does not try to build a website it does not contain.
Run toolkit unit tests with `npm test`; run the Network script's local browser
verification with `npm run test:browser`, after installing Chromium.
