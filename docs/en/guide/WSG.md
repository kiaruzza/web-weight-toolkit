# WSG: using the guidelines in a project

**English** | [Italiano](../../guide/WSG.md)

The W3C Web Sustainability Guidelines address the whole product lifecycle:
user experience, development, hosting/infrastructure, strategy and management.
The consulted version is the [W3C Group Note Draft of 16 October 2026](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/).
It is a draft, distinct from a W3C Recommendation. Check updates in the
[latest published version](https://www.w3.org/TR/web-sustainability-guidelines/).

This guide proposes an original working method. It does not reproduce all
criteria or assign WSG conformance to the template. For each review, open the
pinned version, choose the relevant criterion and record its exact link.
P01–P12 below are toolkit identifiers, not official WSG numbers.

## Links to official guidelines

These references belong to the pinned version of 16 October 2026. The right
column provides practical toolkit material alongside the source; it does not
replace the source's criteria.

| WSG reference | Practical material |
| --- | --- |
| [2.9 — Media](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x2-9-optimize-media-to-reduce-resource-use) | [Variants, quality and loading](MEDIA-FONTS.md) |
| [3.11 — JavaScript and APIs](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x3-11-use-sustainable-javascript-and-apis) | [Decisions and fallbacks](DESIGN.md) |
| [3.12 — Dependencies](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x3-12-use-dependencies-sparingly-and-maintain-them) | [Inventory and maintenance](DESIGN.md) |
| [4.1 — Hosting](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x4-1-use-sustainable-hosting) | [Service and evidence](HOSTING.md) |
| [4.2 — Caching](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x4-2-optimize-caching-and-support-offline-access) | [Headers and repeat visits](HOSTING.md) |
| [4.3 — Compression](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x4-3-reduce-data-transfer-with-compression) | [Deployment checks](HOSTING.md) |
| [5.13 — Product necessity](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x5-13-evaluate-if-a-digital-product-or-service-is-necessary) | [Needs and journeys](METHOD.md) |
| [5.18 — Data](https://www.w3.org/TR/2026/DNOTE-web-sustainability-guidelines-20261016/#x5-18-promote-responsible-data-practices) | [Retention and lifecycle](DESIGN.md) |

## Organize a team review

Before the meeting, choose a real task, such as “find and read an article”.
Include content owners, designers, developers and service operators. Bring
the technical baseline and usability issues. Avoid reducing the discussion
to the home page's single score.

Use this project agenda to surface decisions and evidence:

| Internal ID | Team question | Proposed experiment | Evidence to keep |
| --- | --- | --- | --- |
| P01 | Which need does this page address? | Remove a block that does not support the task | Before/after journey and editorial reasoning |
| P02 | Can people find content without repeated attempts? | Rewrite labels and simplify a step | Findability test and user notes |
| P03 | Can a keyboard user complete it? | Complete the journey without a mouse | Focus sequence and open issues |
| P04 | What arrives before it is requested? | Defer an embed until activation | Initial waterfall and after-click waterfall |
| P05 | Are we sending unnecessary pixels? | Compare two image dimensions | Files, screenshots and selected variant |
| P06 | Does this interaction need a script? | Native HTML prototype and fallback | Decision record, JS-off test and cost comparison |
| P07 | What happens on a second visit? | Reload with cache and versioned assets | Headers, 304 response or local reuse |
| P08 | Who owns obsolete content? | Assign page owners and review dates | Content inventory and review date |
| P09 | Does provider evidence cover the purchased service? | Compare contract and public documents | Dated references and open questions |
| P10 | Is an automated job still useful? | Review build/scan frequency and retention | Durations, frequency and retention policy |
| P11 | Are we collecting data we will not use? | Remove a redundant event or log | Inventory and retention requirements |
| P12 | Can we explain the result publicly? | Write a statement with method and limits | Technical page and linked evidence |

This is a selective agenda, not a complete WSG inventory. Open the official
text during the review and add aspects the table misses. For an online store,
for example, also consider search, checkout, catalog updates and connected systems.

## Complete the record

In the [review template](../../../templates/en/WSG-REVIEW.md), record source
version, criterion title/URI, scope, available evidence, outcome, action,
owner and deadline. Use clear internal outcomes: `to assess`, `evidence collected`,
`action open`, `not applicable with reason`. These describe team work, not
official conformance levels.

A working example: P04, an article with an embedded video. Before activation,
the player contacts other domains. Hypothesis: replace it with a local preview
and link, or load it on request through an accessible control. Keep a HAR,
keyboard test and journey comparison. Then link the official criterion selected
by the group and explain the relationship, without inventing a WSG identifier.

## Connection to the template

The template supplies a verifiable starting point: static content, system fonts,
no initial scripts, metadata and build checks. Adopters must still justify
content, media, suppliers, data retention, external services and maintenance.
Copying the template does not complete this review.

WSG and WCAG have different scopes. Follow the [accessibility path](ACCESSIBILITY.md)
and keep specific evidence; an environmental score does not resolve a barrier
to accessing content.
