# Energy, carbon and models: choose the boundaries

**English** | [Italiano](../../guide/CARBONIO.md)

## Three different questions

1. How many resources does a page prepare or transfer? Builds and Network help answer this.
2. What work does the device perform during the journey? Traces and profiles help observe it.
3. Which environmental impact do we estimate within stated boundaries? This needs a model with inputs, assumptions and units.

Do not automatically convert fewer bytes into a percentage of energy saved.
Keep observations, parameters and estimated results separate. If a quantity
was not measured, label it estimated or assumed instead of filling the table
with an apparently precise number.

## CO2.js

[CO2.js](https://developers.thegreenwebfoundation.org/co2js/overview/) provides
models for estimating emissions from declared inputs. Choose a model and
library version first; document inputs and settings. In your experiment,
vary one assumption to understand its influence. Do not compare results from
different versions and parameters without explaining the change.

A reproducible project record should include activity, boundaries, byte/energy
source, units, cache, considered traffic, any electricity-mix assumptions and
missing data. Keep raw inputs with results. A browser-side estimation library
is not always necessary; a separate analysis may answer the team's question.

## Firefox Profiler

[Firefox Profiler](https://profiler.firefox.com/) records and inspects browser
activity. The [integration described by Green Web Foundation](https://www.thegreenwebfoundation.org/news/carbon-emissions-in-browser-devtools-firefox-profiler-and-co2-js/)
uses CO2.js to contribute estimates where energy data is available. Availability
depends on platform and hardware; an absent counter is not zero consumption.

Record the same before/after journey, keeping device and conditions comparable,
and note competing processes and duration. Inspect activity continuing while
the page appears idle. Review recorded URLs/data before exporting or sharing
a profile. Do not present one device's profile as the whole service's impact.

## Impact Framework

[Impact Framework](https://if.greensoftware.foundation/) organizes observations,
transformations and results into an inspectable pipeline. Use it when a calculation
with several inputs needs to be repeatable. Start with the official guide;
keep manifest, plugins/versions and input data.

Alongside the manifest, keep a unit dictionary and observation provenance.
Check each transformation for confusion between power and energy or a per-visit
value and a period total. An executable pipeline makes logic inspectable;
it does not resolve unreliable inputs by itself.

## SCI and SCI for Web

[SCI for Web](https://greensoftware.foundation/standards/sci-web/) presents itself
as a web-specific extension of SCI; the consulted GSF source describes it as
a draft project. It supports investigation of boundaries and functional units,
including components beyond one page. It is not the name of a score already
computed by the toolkit.

For your service evaluation, choose the reference activity first: for example,
a completed purchase, including relevant systems. Explain included and excluded
components. A per-page number cannot silently replace the result for that
whole activity.

## Website Carbon and other summary reports

[Website Carbon](https://www.websitecarbon.com/) is a reference to explore for
page estimates. Its documentation was not automatically accessible during
this review (HTTP 403). Check its current method before reporting numbers,
parameters or comparisons. Do not assume equivalence with EcoIndex or your
own CO2.js pipeline.

## Learning and decisions

[Green Software Practitioner in Italian](https://learn.greensoftware.foundation/it/)
is a community translation; its page notes possible differences from English.
The [English course](https://learn.greensoftware.foundation/) is also available.
[Green Software Patterns](https://patterns.greensoftware.foundation/personas/front-end-engineer/)
provide a catalog for choosing experiments. GSF and Green Web Foundation are
different organizations, even where their materials connect.

Use [STATEMENT.md](../../../templates/en/STATEMENT.md) to publish results:
explain changes, verification, estimates and exclusions. Avoid absolute
statements such as “zero impact” based on a single test or provider verification.
