# 🧰 Tool catalog

**English** | [Italiano](../STRUMENTI.md)

You do not need every tool for every audit. Choose according to the question,
keep outputs and conditions, then repeat after changes. “Included” means a
script in this repository. Other tools must be opened or installed separately;
they are not automatically integrated into the toolkit.

## Pages, networks and browser work

| Tool | Question and first procedure | Evidence and limitation | Guide |
| --- | --- | --- | --- |
| [Chrome Network](https://developer.chrome.com/docs/devtools/network/reference/) | Which files arrive? Disable cache, reload and sort by weight | Waterfall, requests and transferred bytes; initial visits differ from warm-cache visits | [Performance](guide/PERFORMANCE.md) |
| [Chrome Performance](https://developer.chrome.com/docs/devtools/performance) | What occupies the main thread? Record an interaction | Trace of script/layout/rendering; device- and scenario-dependent | [Performance](guide/PERFORMANCE.md) |
| [Chrome Coverage](https://developer.chrome.com/docs/devtools/coverage/) | How much CSS/JS is used? Record the whole journey | Used/unused bytes in that journey; not permission to delete blindly | [Design](guide/DESIGN.md) |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) | Which lab issues appear? Run three tests | HTML/JSON report and diagnostics; variable score | [Performance](guide/PERFORMANCE.md) |
| [PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about) | How do field and lab data compare? Analyze the exact URL | CrUX where available and Lighthouse; different scopes/times | [Performance](guide/PERFORMANCE.md) |
| [WebPageTest](https://www.webpagetest.org/) | How do location/network affect loading? Use identical before/after profiles | Waterfall and visual sequence; check service access/availability | [Performance](guide/PERFORMANCE.md) |
| [Firefox Profiler](https://profiler.firefox.com/) | Which activities cost resources during use? Record the journey | CPU profile and energy counters where available; not exposed by all hardware | [Carbon](guide/CARBON.md) |
| `measure-network.mjs` — included | How much transfers in a fixed window? Supply URL and output directory | Three Chromium runs, raw requests and median; not a whole session | [Automation](guide/AUTOMATION.md) |

## Accessibility and document quality

| Tool | Practical use | Evidence and limitation | Guide |
| --- | --- | --- | --- |
| [axe-core / axe DevTools](https://github.com/dequelabs/axe-core) | Analyze pages and opened interface states | Violations and affected elements; partial coverage | [Accessibility](guide/ACCESSIBILITY.md) |
| [WAVE](https://wave.webaim.org/) | Inspect structure and alerts in page context | Annotations for human review; some alerts require judgment | [Accessibility](guide/ACCESSIBILITY.md) |
| [Nu HTML Checker](https://validator.w3.org/nu/) | Submit a URL or generated HTML | Markup errors; valid HTML alone does not establish accessibility | [Accessibility](guide/ACCESSIBILITY.md) |
| [HTML Validate](https://html-validate.org/) | Check generated files in CI | Findings for configured rules; does not execute the site | [Automation](guide/AUTOMATION.md) |
| [Orca](https://help.gnome.org/orca/) — Linux screen reader | Test structural navigation, reading and forms in the chosen browser | Announcements and journey completion; record desktop, browser, versions and Orca settings | [Accessibility](guide/ACCESSIBILITY.md#orca-on-linux) |
| [NVDA](https://www.nvaccess.org/) / system VoiceOver | Listen to headings, landmarks, links and forms; complete the journey | Notes and real issues; screen reader familiarity required | [Accessibility](guide/ACCESSIBILITY.md) |
| Keyboard, zoom and browser contrast tools | Test focus, reflow and color pairs | Manual findings per state/theme; sampled colors must match actual use | [Accessibility](guide/ACCESSIBILITY.md) |

## Resources and regressions

| Tool | Practical use | Evidence and limitation | Guide |
| --- | --- | --- | --- |
| [Squoosh](https://squoosh.app/) | Compare pixels, format and quality | Exported file and visual comparison; check at display size | [Media/fonts](guide/MEDIA-FONTS.md) |
| [Astro Picture](https://docs.astro.build/en/guides/images/) | Generate responsive variants from local originals | Optimized files/HTML; check which variant downloads | [Media/fonts](guide/MEDIA-FONTS.md) |
| `measure-page-weight.mjs` — included | Measure a build directory | JSON per route, raw bytes and compression estimates; documented static-analysis limits | [Automation](guide/AUTOMATION.md) |
| `check-budget.mjs` — included | Apply budget.json thresholds to all pages | Exit code and report; thresholds are project decisions | [Automation](guide/AUTOMATION.md) |
| `check-links.mjs` — included | Check local HTML links and fragments | Missing links; does not check external service availability | [Automation](guide/AUTOMATION.md) |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Repeat audits on representative routes | Local reports and configurable thresholds; not continuous visitor monitoring | [Automation](guide/AUTOMATION.md) |
| curl — system tool | Request responses and inspect headers/redirects | Observed deployment HTTP; HEAD and GET may differ | [Hosting](guide/HOSTING.md) |

## Indicators, hosting and environmental models

| Tool or reference | Practical use | Evidence and limitation | Guide |
| --- | --- | --- | --- |
| [WSG](https://www.w3.org/TR/web-sustainability-guidelines/) | Review product, UX, code and infrastructure | Criteria linked to evidence; not a URL scanner | [WSG](guide/WSG.md) |
| [EcoIndex](https://www.ecoindex.fr/) | Analyze a page; read weight, requests and DOM before the score | Dated result, grade and model estimates; not direct energy measurement | [EcoIndex](guide/ECOINDEX.md) |
| `import-ecoindex.mjs` — included | Archive an existing result with URL validation | Snapshot and raw response; does not start scans | [EcoIndex](guide/ECOINDEX.md) |
| [Ecograder](https://ecograder.com/) | Treat recommendations as hypotheses to verify | Report/suggestions; record service version and examined page | [EcoIndex](guide/ECOINDEX.md) |
| [Website Carbon](https://www.websitecarbon.com/) | Explore another page assessment | Estimate with its own method; avoid numerical comparisons across models | [Carbon](guide/CARBON.md) |
| [Green Web Check](https://www.thegreenwebfoundation.org/green-web-check/) | Look up the actual served domain | Association with a verified provider in the dataset; not a code assessment | [Hosting](guide/HOSTING.md) |
| [Green Web Directory](https://www.thegreenwebfoundation.org/tools/directory/) | Search providers and inspect service/documentation | Directory and references; not a full service comparison | [Hosting](guide/HOSTING.md) |
| [carbon.txt builder / validator](https://carbontxt.org/tools) | Describe suppliers/public documents, then validate | Machine-readable file; valid syntax does not prove claims | [Hosting](guide/HOSTING.md) |
| [CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/) | Apply an explicit model to declared inputs | Reproducible estimate/parameters; does not turn bytes into direct measurements | [Carbon](guide/CARBON.md) |
| [Impact Framework](https://if.greensoftware.foundation/) | Organize observations/transformations in a pipeline | Inspectable manifest and results; quality depends on inputs | [Carbon](guide/CARBON.md) |
| [GSF Learn](https://learn.greensoftware.foundation/) / [Patterns](https://patterns.greensoftware.foundation/personas/front-end-engineer/) | Study principles and choose a pattern to test | Reasoned design decision; learning is distinct from an audit | [Carbon](guide/CARBON.md) |
| [SCI for Web](https://greensoftware.foundation/standards/sci-web/) | Study boundaries and functional units for web applications | Draft project, not a score already produced by the toolkit | [Carbon](guide/CARBON.md) |

Guides for tools also shown in the presentation revisit its demonstrations:
Network, navigation without JavaScript, Squoosh, build/EcoIndex and keyboard.
