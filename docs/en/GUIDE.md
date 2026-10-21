# Analyze and lighten an existing website

**English** | [Italiano](../GUIDA.md)

This is the introductory path. The [complete handbook](README.md) provides
dedicated guides, a [tool catalog](TOOLS.md), WSG, models and automation procedures.

## 1. Define a repeatable test

Choose the home page, a content page and a journey important to your audience.
Record exact URL, date, browser/version, viewport, network, CPU, cache, consent
and interactions. Measure at least three times under the same conditions and
keep raw results and the median. Compare the same page before and after.
A block page, HTTP error or different content invalidates the comparison.

## 2. Network: understand what gets downloaded

Open DevTools → Network, disable the cache and reload with DevTools open.
Record request count, transferred bytes and resource sizes: these are distinct
quantities. Sort by size and filter images, fonts and JS. Check the waterfall,
status, Initiator and domain. Keep a HAR only after removing cookies, tokens
and personal data.

Repeat with cache enabled to separate first and repeat visits. Do not compare
a cold-cache run with one that reuses local resources. Other-origin requests
include CDNs and subdomains; not all are trackers.

Reference: [Chrome DevTools Network](https://developer.chrome.com/docs/devtools/network/reference/).

## 3. Without JavaScript and with a keyboard

Disable JavaScript in DevTools and reload. Check that text, links and navigation
remain available. Identify what truly needs a script: a visible but inert button
needs fixing, hiding or an alternative.

Enable JS again and try Tab, Shift+Tab, Enter, Space and Escape where relevant.
Check focus order, skip navigation, visible indicators, absence of traps and
meaningful names. Test zoom and a screen reader. axe and Lighthouse cover only
some problems; they do not replace these tests.

References: [axe-core](https://github.com/dequelabs/axe-core),
[Lighthouse accessibility](https://developer.chrome.com/docs/lighthouse/accessibility/).

## 4. Images: reduce pixels and quality deliberately

In [Squoosh](https://squoosh.app/), compare originals and variants at their display
size. Start with the heaviest images found in Network. Reduce unnecessary pixels,
then try WebP/AVIF and quality. Keep the original. Use srcset and sizes that match
the layout, width/height to reserve space, and lazy loading below the fold.
Do not lazy-load the main image. Check readability, meaningful details and the
variant the browser downloads.

## 5. Lighthouse and PageSpeed Insights

Run Lighthouse against a production build with documented conditions and three
repetitions. Read diagnostics and opportunities as well as scores. Check LCP,
CLS and JavaScript cost. TBT is a lab metric and does not replace INP.
Field metrics describe real visits; lab metrics describe a simulation.
PageSpeed Insights can show both where field data is available. Do not attribute
changes caused by network or content differences to your intervention.

References: [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/),
[PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about),
[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci).

## 6. Builds, budgets and regressions

If you have the source, generate a build and apply the toolkit scripts. Look
for growing categories and pages exceeding their budget. Before raising a
threshold, check dependencies, fonts, images and embedded content. Then inspect
compression, caching, redirects and 404s on the deployed site: a local build
does not describe server configuration.

## 7. EcoIndex and environmental estimates

[EcoIndex](https://www.ecoindex.fr/en/how-it-works/) uses page weight, requests
and DOM size to construct an indicator. Keep the date, URL and analysis conditions;
use inputs to guide changes. Emissions and water estimates depend on a model.
They are not direct measurements of the site's energy and cannot be inferred
from build bytes alone. For explicit models, explore
[CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/).

## 8. Choose and verify one change

Prefer changes that reduce unnecessary costs without obstructing use: remove
an unused script, resize an image, use local or system fonts, or defer an embed
until requested. Change one thing, repeat the same journey and record results
and trade-offs in the audit template. Do not claim percentage energy savings
based only on bytes saved.
