# 📚 Web Weight Toolkit handbook

**English** | [Italiano](../README.md)

A useful audit begins with a question: what does a person need to accomplish,
and how many resources do we ask them to use? Technical measurements help answer
it; content, accessibility, infrastructure and maintenance complete the picture.

## 🧭 Reading paths

| Situation | Path | Deliverable |
| --- | --- | --- |
| First audit of a public website | [Method](guide/METHOD.md) → [Performance](guide/PERFORMANCE.md) → [EcoIndex](guide/ECOINDEX.md) | Baseline and three reasoned improvements |
| Project review | [WSG](guide/WSG.md) → [Design](guide/DESIGN.md) → [Accessibility](guide/ACCESSIBILITY.md) | Decision record and manual evidence |
| Page rich in images and video | [Media and fonts](guide/MEDIA-FONTS.md) → Network | Verified variants and loading behavior |
| Hosting selection or review | [Hosting and carbon.txt](guide/HOSTING.md) | Service evidence and HTTP checks |
| Request for an environmental estimate | [Models and carbon](guide/CARBON.md) | Explicit method, boundaries and assumptions |
| Checks on every change | [Automation](guide/AUTOMATION.md) | Budgets, baselines and repeatable reports |

The [tool catalog](TOOLS.md) connects each tool to a question, an output and
a guide. The [introductory guide](GUIDE.md) remains a short path.
The [glossary](GLOSSARY.md) explains units and metrics.

## 📝 Reusable records

- [Audit record](../../templates/en/AUDIT.md): conditions and before/after results.
- [WSG review](../../templates/en/WSG-REVIEW.md): scope, official criterion, evidence and owner.
- [Improvement register CSV](../../templates/en/IMPROVEMENTS.csv) / [Italian CSV](../../templates/INTERVENTI.csv): backlog for a spreadsheet.
- [EcoIndex record](../../templates/en/ECOINDEX.md): observed inputs separated from estimates.
- [JavaScript decision](../../templates/en/JAVASCRIPT-DECISION.md): need, native alternative and costs.
- [Technical statement](../../templates/en/STATEMENT.md): publish decisions and limitations.
- [Extended checklist](CHECKLIST.md): review before release and after deployment.

## Origin and updates

The method draws on Chiara Corrado's website layouts, budgets, scripts,
architecture decisions and manual tests, together with demonstrations from
“Il peso invisibile”. Italian and English guides are provided; official sources
may be in another language. These are not official WSG or WCAG translations.

Sources were checked on **21 October 2026**. WSG references are pinned to the
draft of 16 October 2026; online services and interfaces may change.
[Sources and maintenance](SOURCES.md) lists versions and references to review.

## Languages and navigation

Every guide and Markdown template links to its equivalent Italian edition.
The repository's main README is English; `README.it.md` is Italian.
`translations.json` records document pairs. When changing a procedure, update
both languages together. CSV template translations are listed in the handbook.
Index icons accompany text labels rather than replacing them. Scripts and
report keys use English in both editions.
