# Sources, versions and maintenance

**English** | [Italiano](../FONTI.md)

Review date: 21 October 2026. These guides are original practical adaptations,
with primary-source links for definitions and service behavior. Italian and
English editions are maintained together. Third-party code and documents retain
their own licenses and attribution.

| Area | Primary source | Maintenance note |
| --- | --- | --- |
| WSG | [Pinned draft, 16 October 2026](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/) / [latest published](https://www.w3.org/TR/web-sustainability-guidelines/) | Review titles, criteria and links when versions change |
| WCAG | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) / [WAI evaluation](https://www.w3.org/WAI/test-evaluate/) | Distinguish automation from a complete evaluation |
| Network/runtime | [Network](https://developer.chrome.com/docs/devtools/network/reference/), [Performance](https://developer.chrome.com/docs/devtools/performance), [Coverage](https://developer.chrome.com/docs/devtools/coverage/) | Record the browser version used |
| Lab/field | [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), [PSI](https://developers.google.com/speed/docs/insights/v5/about) | Record version, profile and data scope |
| Automation | [LHCI](https://github.com/GoogleChrome/lighthouse-ci), [Playwright](https://playwright.dev/docs/intro), [axe-core](https://github.com/dequelabs/axe-core) | Preserve lockfile and check updates |
| Linux screen reader | [Orca, GNOME manual](https://help.gnome.org/orca/) | Record desktop, browser, versions and keyboard layout; commands depend on configuration |
| Images | [Squoosh](https://squoosh.app/), [Astro](https://docs.astro.build/en/guides/images/) | Verify formats and variants in the browser |
| EcoIndex | [Method](https://www.ecoindex.fr/en/how-it-works/), [API](https://api.ecoindex.fr/docs), [OpenAPI](https://api.ecoindex.fr/openapi.json) | Verified GET /v1/ecoindexes/{id} and /best-practices endpoints; handle 204 |
| Ecograder | [Service](https://ecograder.com/) | Beta and legacy link presented; record the version used |
| Hosting | [Green Web Check](https://www.thegreenwebfoundation.org/support/how-does-the-green-web-check-work/), [Directory](https://www.thegreenwebfoundation.org/tools/directory/) | Review domain/documents when service changes |
| Claims | [carbon.txt tools](https://carbontxt.org/tools) / [syntax](https://carbontxt.org/syntax) | Use the current validator, not copied claims |
| Models | [CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/), [IF](https://if.greensoftware.foundation/) | Keep version, parameters, units and inputs |
| Profiling | [Firefox/CO2.js description, GWF](https://www.thegreenwebfoundation.org/news/carbon-emissions-in-browser-devtools-firefox-profiler-and-co2-js/) | Check counter availability for the platform |
| Learning | [GSF Learn IT](https://learn.greensoftware.foundation/it/) / [English](https://learn.greensoftware.foundation/), [Patterns](https://patterns.greensoftware.foundation/personas/front-end-engineer/), [SCI for Web](https://greensoftware.foundation/standards/sci-web/) | Community translation; SCI for Web presented as a draft project |

During review, automatic fetches of WebPageTest and its documentation returned
403/502, and Website Carbon returned 403. They are included as references for
manual consultation, without attributing unverified prices, account features,
parameters or formulas.

To update the handbook, open the primary source, compare version/status,
verify relevant commands/examples and update the date/notes. Do not copy entire
standards into the repository; link the precise version.
