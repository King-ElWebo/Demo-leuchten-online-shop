# Acceptance contract

Specification status: TEMPLATE_NOT_CONFIGURED

This document owns the completion and verification criteria for the configured showcase. It verifies the scope, visual direction, and content defined by the other project specifications; it must not silently introduce, expand, or contradict product scope. If a proposed check requires new functionality, first update the owning specification explicitly. Replace or extend project-specific markers, set concrete viewport values, then change the status to `READY`.

The untouched master repository is a special maintenance mode: its intentional `[REQUIRED: replace before production run]` markers and `TEMPLATE_NOT_CONFIGURED` status do not fail `pnpm qa`. A production showcase may not claim completion until all project documents are `READY` and no required markers remain.

## Project-specific acceptance

- [ ] [REQUIRED: replace before production run]
- [ ] Both signature moments in [`DESIGN.md`](DESIGN.md) work at their specified routes, viewports, input modes, and reduced-motion setting.
- [ ] The final result conforms to the brand thesis, composition grammar, typography, image direction, density, and responsive art direction in [`DESIGN.md`](DESIGN.md).

## Routes and behavior

- [ ] Every route in [`SITE.md`](SITE.md) exists and is listed in `tests/e2e/routes.ts`.
- [ ] Every route loads directly with a successful response.
- [ ] Global, contextual, mobile, and footer navigation reaches the intended destination.
- [ ] Every visible control has intentional behavior; no placeholder `#` actions remain unless documented as intentional.
- [ ] Every project-specific interaction produces its documented result.
- [ ] Browser back/forward behavior is coherent where navigation state is involved.
- [ ] Failure, empty, not-found, loading, or fallback states exist wherever the route actually needs them.

## Responsive layout

Default review viewports are editable per project:

| Review target | Default viewport | Project value                             |
| ------------- | ---------------- | ----------------------------------------- |
| Small mobile  | 320 × 568        | [REQUIRED: replace before production run] |
| Modern mobile | 390 × 844        | [REQUIRED: replace before production run] |
| Tablet        | 768 × 1024       | [REQUIRED: replace before production run] |
| Laptop        | 1440 × 1000      | [REQUIRED: replace before production run] |
| Large desktop | 1920 × 1080      | [REQUIRED: replace before production run] |

- [ ] Desktop layouts preserve the intended hierarchy, rhythm, image crops, and signature moments.
- [ ] Tablet layouts transform as specified rather than merely shrinking desktop.
- [ ] Mobile layouts are deliberately art-directed for priority, rhythm, crop, and touch.
- [ ] At least one intermediate width between each major breakpoint was spot-checked.
- [ ] No required viewport has horizontal document overflow.
- [ ] No unintended overlaps occur.
- [ ] No critical text, controls, focus indicator, or media is clipped.
- [ ] No image is broken, visibly distorted, or assigned an unintended crop.
- [ ] No unresolved placeholder content or asset remains in a `READY` project.

## Browser health

- [ ] For a static project, `pnpm build` creates `out/`; every required route loads directly and reloads from `wrangler pages dev out` with HTTP 200.
- [ ] Exported-site navigation, key interactions, and responsive local image variants work without a Next.js server or runtime image optimizer.
- [ ] Every required route has zero uncaught page errors.
- [ ] Every required route has zero unexpected browser console errors.
- [ ] Network failures do not break locally assigned production assets.
- [ ] Direct navigation and in-site navigation were both exercised.

## Accessibility

- [ ] All functionality is reachable by keyboard in a logical order.
- [ ] Focus is clearly visible and not obscured.
- [ ] Native semantic HTML is used before custom roles.
- [ ] Links and buttons match their behavior.
- [ ] Landmarks and heading order communicate the page structure.
- [ ] Every informative image has meaningful context-specific alt text; decorative images have empty alt text.
- [ ] Text, controls, focus indicators, and essential graphics received a contrast review.
- [ ] Forms, if present, have persistent labels, useful instructions, and clear error states.
- [ ] Essential information and actions do not depend on hover.
- [ ] Touch devices have an intentional alternative for hover-specific enhancement.
- [ ] `prefers-reduced-motion` removes large spatial movement and non-essential choreography.
- [ ] The automated accessibility scan has no unresolved serious or critical violations.

## Motion and performance

- [ ] Every animation has a documented purpose consistent with [`DESIGN.md`](DESIGN.md).
- [ ] Frequent interactions respond quickly and include suitable press feedback.
- [ ] Motion uses transform and opacity where practical and avoids permanent `will-change`.
- [ ] Scroll behavior does not rely on unnecessary listeners or competing motion systems.
- [ ] Animation remains smooth on the tested mobile and desktop browser projects.
- [ ] Images use `next/image` with correct intrinsic sizing or `fill` plus `sizes` where applicable.
- [ ] Fonts use supported Next.js font tooling where custom fonts are required.
- [ ] Large assets were audited and visible layout shift was reviewed.

## Metadata and production quality

- [ ] Route titles and descriptions match [`CONTENT.md`](CONTENT.md).
- [ ] Canonical, Open Graph, indexing, sitemap, and robots behavior match [`SITE.md`](SITE.md).
- [ ] No accidental no-index or template metadata remains in the production result.
- [ ] TypeScript strict checks pass without casual `any` or weakened configuration.
- [ ] ESLint passes without disabled checks added merely to obtain green output.
- [ ] Browser tests pass for mobile and desktop projects.
- [ ] Production build completes successfully.
- [ ] Generated QA reports, test results, and screenshots are ignored by version control where appropriate.

## Visual review and final polish

- [ ] Screenshots were captured and visually reviewed at every required viewport.
- [ ] Typography, whitespace, density, alignment, image crops, and responsive composition were refined after review.
- [ ] A dedicated motion pass was completed in the browser.
- [ ] A dedicated accessibility pass was completed.
- [ ] A final visual-cohesion pass confirmed the pages feel like one authored identity without repetitive template composition.

## Required evidence

| Evidence                | Required record                                                            |
| ----------------------- | -------------------------------------------------------------------------- |
| Routes and interactions | Routes visited and interactions exercised                                  |
| Responsive review       | Viewport dimensions and screenshot paths                                   |
| Browser health          | Console and page-error result                                              |
| Accessibility           | Keyboard/reduced-motion notes and automated scan result                    |
| Engineering             | Fresh output from `pnpm lint`, `pnpm typecheck`, and `pnpm build`          |
| Browser tests           | Fresh output from `pnpm test:e2e`                                          |
| Full local validation   | Fresh output from `pnpm qa` or individually documented equivalent commands |
| Remaining limitations   | Exact external blocker, impact, and evidence                               |

Commands and artifact locations are defined in [`TOOLING.md`](../system/TOOLING.md). Evidence—not confidence—is the completion standard.
