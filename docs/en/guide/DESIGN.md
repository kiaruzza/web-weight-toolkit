# Design content and code that ask for fewer resources

**English** | [Italiano](../../guide/PROGETTAZIONE.md)

This guide generalizes the original site's decisions: native platform features,
static output, justified dependencies and progressive enhancement. Not every
site can or should match the template; make costs visible in relation to
people's needs.

## Content and journeys

Assign each page an objective, owner and review date. Remove duplication that
forces people to consult different pages for the same information. A shorter
page is not automatically better: preserve needed instructions, contacts,
translations and alternatives.

Before adding search, test navigation, headings and links. If search is needed,
design empty results and errors too. Avoid journeys requiring many opened
pages to find a simple fact.

## Decide about JavaScript

Complete [JAVASCRIPT-DECISION.md](../../../templates/en/JAVASCRIPT-DECISION.md).
First try relevant links, forms, details/summary and native HTML elements;
consider CSS for presentation and preferences. If a script addresses a real
need, define fallback, focus behavior, errors and loading/execution cost.

The original site used a small theme controller. The template follows system
preferences through CSS: an extraction choice, not a prohibition on manual
selectors. If you add one, measure bytes/browser work and test with the script
unavailable.

With [Coverage](https://developer.chrome.com/docs/devtools/coverage/), record
the journey before deciding what to remove; test states that may use the code.
For interaction costs, use a trace rather than bundle size alone.

## Static output, servers and cache

Where content changes only when its owner publishes, static generation can
avoid work on every request. For personalized content, search or data writes,
design the dynamic component within its scope. Consider cache invalidation
and error handling too.

Do not move costs into ever-more-frequent builds without measuring them.
Keep duration, frequency, cache and job triggers. Not every editorial change
requires external scanning of the entire site.

## Dependencies and external services

For each new dependency, record purpose, alternative, license, maintenance,
transitives and execution environment. Build-time tooling is not automatically
browser code. For external widgets, also observe requests, consent, availability,
privacy and fallbacks.

Choose updates deliberately, preserve the lockfile and run relevant checks.
Do not force incompatible updates without reviewing effects. Distinguish
development-tool issues from code exposed to visitors, without ignoring either.

## End of life

Define what to archive or delete and how to handle moved public URLs.
Review duplicate media originals, old builds, backups, logs and automated reports.
Retention limits must meet operational needs and service requirements.
Preserve useful evidence without keeping every artifact forever.

Connect decisions to the [WSG review](WSG.md) and improvement register.
An editorial or organizational decision can also be your next experiment.
