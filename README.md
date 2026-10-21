# 📏 Web Weight Toolkit

**English** | [Italiano](README.it.md)

Tools, checklists and guides to analyze an existing website and improve its
performance and efficiency. Extracted from chiaracorrado.dev's scripts:
[origin and adaptations](ORIGIN.md). [MIT license](LICENSE).

## 📚 Complete handbook

The [English handbook](docs/en/README.md) provides procedures and reusable records:

- [Tool catalog](docs/en/TOOLS.md): network, runtime, accessibility, resources, hosting and models.
- [Audit method](docs/en/guide/METHOD.md) and [WSG review](docs/en/guide/WSG.md).
- [EcoIndex and Ecograder](docs/en/guide/ECOINDEX.md), including imports of existing results.
- [Performance](docs/en/guide/PERFORMANCE.md), [accessibility](docs/en/guide/ACCESSIBILITY.md), [media and fonts](docs/en/guide/MEDIA-FONTS.md).
- [Hosting and carbon.txt](docs/en/guide/HOSTING.md), [energy and environmental models](docs/en/guide/CARBON.md).
- [Design decisions](docs/en/guide/DESIGN.md), [automation and CI](docs/en/guide/AUTOMATION.md).
- [Glossary](docs/en/GLOSSARY.md), [verified sources and versions](docs/en/SOURCES.md), audit templates and an improvement register.

```sh
npm ci
npx playwright install chromium
npm run measure:network -- https://your-domain.example/ reports/network-before
npm run metrics:ecoindex -- RESULT_UUID https://your-domain.example/ reports/ecoindex-before
```

`metrics:ecoindex` imports an existing EcoIndex analysis; it does not start a scan.
Replace the placeholder URLs and UUID. Read the guides for units, conditions
and limitations before comparing results.

## 🧭 Choose a path

- **You only have a public URL:** follow the [introductory guide](docs/en/GUIDE.md), starting with Network and Lighthouse. Build scripts do not download the site.
- **You have a static build:** use the commands below to measure HTML and local resources and enforce a budget.
- **You need to prioritize improvements:** use the [checklist](docs/en/CHECKLIST.md) and record results in the [audit template](templates/en/AUDIT.md).

## Analyze a build

Requires Node.js 22.12 or later. The three local analysis scripts need no
external packages. Run from the toolkit directory:

```sh
node scripts/measure-page-weight.mjs /absolute/path/to/build
node scripts/check-budget.mjs /absolute/path/to/build
node scripts/check-links.mjs /absolute/path/to/build
```

You can also use `npm run measure:weight -- /path/to/build` and the equivalent
`check:budget` and `check:links` commands. Without an argument, they look for
`dist/` in the current directory. Reports are written to its
`reports/page-weight.json`. The budget command regenerates the report and exits
with code 1 if any page exceeds a threshold or a referenced resource is missing.

Edit `budget.json` for your project. Limits are in bytes, expressed initially
as multiples of KiB (1024 bytes). `requests` counts unique local resources plus
the document; `thirdParty` counts detected remote references. Zero JS is the
template's starting choice: set a reasoned threshold for necessary interactions.
The link checker verifies local HTML pages and fragments, not external link
availability or non-HTML downloads. It does not require opening a new tab.

## Compare before and after

After a representative build, keep the report as a baseline:

```sh
mkdir -p performance
cp reports/page-weight.json performance/page-weight-baseline.json
```

Change the site, rebuild and measure again. The next report includes absolute
and percentage differences for matching routes. Do not overwrite the baseline
before evaluating a regression. Version only a reviewed baseline without
confidential data.

## Optional Lighthouse CI

```sh
npm ci
npm run lighthouse
```

The included configuration looks for `./dist` and analyzes the home page three
times. Copy the build there or change `staticDistDir` in `.lighthouserc.json`;
add representative routes to `url`. Chrome/Chromium must be installed; set
`CHROME_PATH` to its executable if needed. Reports stay local in `.lighthouseci/`.
For a remote site, remove `staticDistDir` and provide absolute URLs.
A performance score below 0.90 produces a warning; accessibility below 1
produces an error. These are starting choices: a score of 100 does not certify
WCAG conformance.

## What the measurements mean

The static report sums detected HTML and local resources and estimates
gzip/Brotli. It does not measure network traffic, CPU, energy or emissions.
Inline sizes are included in HTML and also shown by category: do not add them
to the total again.

The parser comes from the original site and uses regular expressions. It
assumes a build served at the domain root and does not resolve every HTML/CSS
construct. It takes the last candidate in each srcset and separately counts
picture alternatives, although the browser downloads only the selected one.
It does not execute JS, follow JS/CSS imports or all nested CSS dependencies,
or apply media queries. Absolute HTTP references are classified as external,
even on the original domain. `thirdParty` describes these references, not trackers.
Use Network to confirm requests, selected resources and transferred bytes.

`npm test` checks file counting, missing resources, budgets on internal pages
and EcoIndex validation. Unit tests need no npm package installation.
`npm run test:browser` checks the Network script against a local fixture after
installing the browser dependencies.

Companion project: [Lighter Web Starter](https://github.com/kiaruzza/lighter-web-starter).
