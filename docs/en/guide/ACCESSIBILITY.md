# Accessibility: test the complete journey

**English** | [Italiano](../../guide/ACCESSIBILITA.md)

The template supplies semantics and initial checks. Work continues with added
content and interactions. Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) as a
technical reference, retaining relevant criteria and evidence per page/state.
The toolkit does not issue certifications or legal declarations.

## Prepare the test

Choose reading, navigation and the main action. List initial states, errors,
results, overlays and expanded content. Record browser, assistive technology,
versions, viewport and system preferences. Checking a closed home page does
not cover an open menu or a form in an error state.

## Automated checks and document review

Run axe on the relevant state. For each violation, inspect the affected node,
understand the cause, fix and repeat. Also review outcomes needing human judgment.
An alternative text can be present but inappropriate: presence alone does not
prove quality.

With [WAVE](https://wave.webaim.org/), inspect annotations and structure in page
context, separating errors and alerts. Use [Nu HTML Checker](https://validator.w3.org/nu/)
or HTML Validate for generated markup. [W3C WAI](https://www.w3.org/WAI/test-evaluate/tools/)
explains why tools and human expertise must be combined.

## Toolkit manual protocol

This is a project test plan, to supplement with the relevant official criteria:

| Test | Action | Evidence to record |
| --- | --- | --- |
| Title and structure | Read page title, h1, sections and landmarks | Meaningful labels and coherent hierarchy |
| Keyboard | Tab/Shift+Tab, then Enter/Space where expected | Order, visible focus, activation and no traps |
| Skip link | Activate it from the first Tab | Arrival at content and subsequent sequence |
| Expanded controls | Open details/menu/dialog and close it | Announced state, accessible commands and focus return |
| Forms | Submit missing/invalid data, then correct it | Identifiable labels, instructions, errors and confirmation |
| Screen reader | Navigate headings, landmarks and links; complete the task | Names, roles, states and reading order |
| Zoom/narrow screen | Increase zoom/text and test a narrow page | No lost text or covered controls |
| Themes/contrast | Check text, links, focus and controls in each theme | Color pairs and tested states |
| Motion | Test reduced-motion preferences and animation | Usable content and relevant pause controls |
| Without JavaScript | Reload and repeat reading/navigation | Available features, alternatives and necessary messages |

For Orca, NVDA or VoiceOver, record commands and announcements. If unfamiliar,
involve a competent tester and, where possible, users with disabilities.
Do not mark a test passed merely because the browser displays the page correctly.

## Orca on Linux

Include [Orca](https://help.gnome.org/orca/) in Linux testing. Configure voice,
keyboard layout and modifier according to the [official manual](https://help.gnome.org/orca/).
Use learn mode to become familiar with commands for the chosen configuration.

For your project test:

1. Record distribution, desktop environment, browser and versions, Orca version and keyboard layout.
2. Open the page and check title, language and reading order. Use structural navigation to find headings, sections and links.
3. Complete the journey without a mouse, including skip navigation and expanded elements. Record announced names, roles and states.
4. Where present, test forms, errors, confirmations and dynamic updates: check that they are perceivable and focus stays understandable.
5. After a fix, repeat under the same conditions; keep steps, observed announcements and open issues.

Keep Orca tests distinct from keyboard-only tests: the latter do not verify
screen reader announcements. An outcome applies to the tested browser, desktop
and assistive technology combination, not automatically to others.
Documenting this manual protocol does not require installing Orca in the
toolkit or adding website code.

## Closing an issue

Describe expected and actual behavior, reproduction steps, page/state,
evidence and relevant criterion. Close an issue by repeating the steps after
the fix and documenting the outcome. “Lighthouse 100” alone does not close
a manual finding.

The original site also tested themes, translations and poetry. This extraction
retains methods and reusable checks; personal results are not attributed to
template adopters.
