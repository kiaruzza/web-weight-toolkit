# ✅ Audit checklist

**English** | [Italiano](../CHECKLIST.md)

## Before

- [ ] Define pages, user journey and success criteria.
- [ ] Record the deployed version and repeatable conditions.
- [ ] Keep three runs, raw data and the median.
- [ ] Exclude error responses, blocks and noncomparable content.

## Analysis

- [ ] Network: transferred bytes, resources, requests, domains and waterfall.
- [ ] Images: useful pixels, quality, formats and loading.
- [ ] CSS, JS and fonts: identify unnecessary dependencies.
- [ ] Without JS: content and navigation remain available.
- [ ] Keyboard: focus, skip link, commands and no traps.
- [ ] Screen reader, zoom, light/dark themes and narrow viewport.
- [ ] Lighthouse/axe: assess violations, not just scores.
- [ ] Hosting: HTTPS, compression, caching, redirects and 404 status.

## After

- [ ] Describe the change, expected benefit and possible trade-offs.
- [ ] Repeat measurements and the user journey under the same conditions.
- [ ] Compare network data separately from build sizes.
- [ ] Confirm accessibility and functionality have not regressed.
- [ ] Update budgets and baselines only with a reviewed reason.
- [ ] Date any environmental estimates and specify the model.

## Product and WSG review

- [ ] Pin the WSG version and link relevant criteria in the record.
- [ ] Document the page's purpose, journey and simpler alternatives.
- [ ] Assign content owners and review dates.
- [ ] Justify new scripts, dependencies and external services.
- [ ] Review frequency and retention of builds, reports, logs and backups.

## Hosting and environmental evidence

- [ ] Verify the domain and service in Green Web Check and provider documents.
- [ ] Keep the date and scope of claims; do not infer zero impact.
- [ ] If present, validate carbon.txt and review its linked documents.
- [ ] For EcoIndex, keep URL, version, date, inputs and estimates separately.
- [ ] For CO2.js/IF, keep model, version, manifest, inputs and functional unit.
- [ ] Publish only reviewed results, with limitations and open issues.
