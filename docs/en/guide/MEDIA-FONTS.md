# Images, video, audio and fonts

**English** | [Italiano](../../guide/MEDIA-FONT.md)

## Start with the actual inventory

Open Network and associate each resource with the content it supports.
Record URL, weight, pixel dimensions, display size, initial/on-request loading
and value to the activity. A huge decorative image and a necessary diagram
need different decisions. Keep originals, usage rights and export settings so
the next person can regenerate variants.

## Squoosh workshop

1. Open a copy of the original in [Squoosh](https://squoosh.app/).
2. Keep format and pixel dimensions fixed while finding acceptable quality; then try resizing and compare separately.
3. Compare meaningful details, edges, gradients and text at the display size.
4. Export a variant and record settings, bytes and observed defects.
5. Place it in the page, check the browser's choice and repeat the journey.

A controlled procedure avoids attributing to quality a difference mainly caused
by fewer pixels. Do not pick the same quality for all images: logos, photographs
and screenshots have different constraints.

## Responsive delivery

With Astro, use [Picture and local images](https://docs.astro.build/en/guides/images/).
The browser must choose for the layout and density: widths alone are insufficient
when sizes declares the wrong width. Inspect `currentSrc` and Network at target
viewports, preserving intrinsic dimensions that reserve space.

For the main image visible immediately, consider eager loading and appropriate
priority; try lazy loading for images farther below the first screen. Avoid
“lazy on everything”. The companion Lighter Web Starter includes a Picture
example; consult the linked Astro documentation for current syntax.

## SVG and equivalent content

For simple icons, prefer vectors where appropriate to the drawing. Remove
metadata and unnecessary content without breaking viewBox, contrast or semantics.
A decorative SVG does not need the same description as a chart. For complex
diagrams, consider an extended description or equivalent table.

## Video, audio and embeds

In your experiment, compare initial loading and explicit activation. Prepare
a lightweight poster, reasonable dimensions, controls and relevant alternatives
such as captions or transcripts. Avoid downloading an external player when
a content link suffices. If loading on request, the control must work from
a keyboard and explain which service opens.

Do not multiply video variants without a purpose: consider necessary quality,
duration and resolution. Even a file never downloaded still needs repository
and backup management.

## Fonts

The template starts with system fonts. If a dedicated font is needed, check
license, characters for actual published languages and required weights.
Consider formats appropriate to browser support, fallbacks and loading behavior.
Before subsetting, check accents, symbols and future content: removing necessary
glyphs creates regressions.

Test three conditions: a slow first visit, a cached resource and an unavailable
font. Observe readability and layout shifts. Do not preload weights unused on
the first screen or turn text into images to enforce typography.
