# Performance: loading, interaction and real conditions

**English** | [Italiano](../../guide/PERFORMANCE.md)

## Network: the first inventory

Open [Network](https://developer.chrome.com/docs/devtools/network/reference/),
keep DevTools open, disable cache and reload. Save URL, time, network profile,
requests and transferred quantity. Decoded file size can differ from bytes
sent over the network. Repeat separately with cache enabled.

Build an inventory for your audit: document, CSS, scripts, images, fonts, media
and external services. For every large resource, record what starts it and when
it is needed. Also examine failed and repeated requests; hiding them makes the
report less useful. Keep a HAR only after reviewing and removing personal data,
cookies and tokens.

## Lighthouse: lab diagnostics

Run three production-build tests with the same profile, without extensions
that modify the site. Keep reports and version. Start with the user's issue:
late main content, shifting layout or blocked interaction.
A [Lighthouse report](https://developer.chrome.com/docs/lighthouse/overview/)
is a starting point for identifying causes, not an isolated target.

Suggested experiment: when the main image arrives late, check dimensions,
discovery in HTML, priority and response times. Change one cause, repeat and
compare screenshots too. Do not preload every image to improve a score; this
may compete with the important resource.

## PageSpeed Insights and field data

[PageSpeed Insights](https://developers.google.com/speed/docs/insights/v5/about)
can show both Lighthouse and CrUX data from real experiences. Field data spans
a time window and may describe the origin when URL-level detail is unavailable.
Record the displayed scope. Missing field data proves neither a problem nor
an excellent result.

LCP concerns the arrival of main content, CLS layout stability and INP interaction
responsiveness. TBT supports lab diagnostics but is not equivalent to INP.
Do not expect a new deployment to change a field aggregate immediately.

## Performance and Coverage: observe a journey

With [Performance](https://developer.chrome.com/docs/devtools/performance),
record a concrete action: opening a menu, filtering a list or submitting a form.
Record the action's start and finish; locate long scripts, layout and rendering
in the trace. Repeat the same journey. A small page can still perform continuous
work and make interactions slow.

Open [Coverage](https://developer.chrome.com/docs/devtools/coverage/) and visit
relevant states before judging apparently unused code. In your experiment,
also try mobile, themes and printing. A branch unused during initial loading
may be needed in a later state.

## WebPageTest

For another location or a repeatable visual comparison, use
[WebPageTest](https://www.webpagetest.org/). Choose available location, browser,
connection, repetitions and first/repeat visits. Record test identifiers.
Inspect the waterfall and visual sequence: which resource separates a blank
page from readable content? Export available evidence. Service access and
options may change; they are not prerequisites for the local toolkit scripts.

## Present the comparison

Keep a table per page and scenario. Report individual runs, median, minimum/
maximum and exclusion reasons. Do not average a mobile home page, desktop
article and cached visit into one “site” value.

| Problem | Hypothesis | Evidence after the change |
| --- | --- | --- |
| Content appears late | Image discovered only after JS | Waterfall and visual sequence |
| Page shifts | Image space is not reserved | Layout and CLS trace |
| Form responds late | Script occupies the thread during the action | Interaction trace |
| Repeat visits download assets again | Caching or unstable URLs | Headers and second visit |

To automate a loading window with raw requests, use
[measure-network](AUTOMATION.md). It does not replace interaction tests.
