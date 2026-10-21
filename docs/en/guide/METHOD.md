# Audit method: from objective to verification

**English** | [Italiano](../../guide/METODO.md)

## Choose an activity and representative pages

“Make the website lighter” is not yet a test. Examples include reading an article,
finding contact details or completing registration. For each, choose a starting
page, required steps and a completion condition. Include a modest device, a
less favorable network and access methods relevant to the audience.

For hundreds of URLs, sample distinct page types and states, rather than just
the simplest home page. With login, consent, search or open menus, record those
states too. When comparing architectures, keep content and activities equivalent;
different pages do not isolate the effect of technology.

## Establish a baseline

Complete [AUDIT.md](../../../templates/en/AUDIT.md) before changing code.
Record initial/final URLs, commit/release, UTC date, browser version, viewport,
system, network/CPU profile, cache, test location, consent and interactions.
Also define when observation ends: an event, an interval or task completion.

Perform at least three comparable repetitions. Keep each result; report median
and minimum/maximum, explaining excluded failures. An HTTP 403, challenge, blank
page or article hidden by a block is not a valid observation of the full content.

## Collect four kinds of evidence

| Level | Example | What it supports |
| --- | --- | --- |
| Generated artifact | HTML, CSS, images in dist | Which files the build prepares |
| Browser observation | Network, traces, DOM state | What happens under those conditions |
| User experience | Keyboard, screen reader, completed journey | Whether people can perform the activity |
| Model or claim | EcoIndex, CO2.js, provider documents | An indicator or estimate within stated boundaries |

Keep levels separate: a small build does not prove good caching; grade A does
not prove a usable form; provider presence in a dataset does not eliminate
device and network costs.

## Turn observations into improvements

For each issue, record page/state, evidence, effect on people, affected resource,
suspected cause, proposed change and the check that will demonstrate its effect.
Use [IMPROVEMENTS.csv](../../../templates/en/IMPROVEMENTS.csv).

Prioritize barriers to use and resources loaded unnecessarily. Consider
prevalence, expected benefit, work and risk together. An image loaded on every
visit may matter more than a larger asset available only on request.
Do not multiply grams by visits without checking that the model and functional
unit support that calculation.

## Repeat and make results reviewable

Change one cause at a time when attributing an effect. Repeat the same tests
on the same page and complete the user journey. Record regressions and null
results too. If network, content or tool version changes, start a new series;
do not present it as a controlled comparison.

Deliver the baseline, after reports, decision, trade-offs, open issues, owner
and next review date. For a public account of the work, use
[STATEMENT.md](../../../templates/en/STATEMENT.md).
