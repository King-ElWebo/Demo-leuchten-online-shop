# Engineering contract

This document defines the stable implementation architecture for every showcase. Project scope, visual identity, and content remain authoritative in [`docs/project/`](../project/SITE.md). Package roles and exceptions are defined in [`STACK.md`](STACK.md); autonomous and QA routing is defined in [`TOOLING.md`](TOOLING.md).

## Application architecture

- Use the Next.js App Router.
- Use Server Components by default. Add `'use client'` only for real browser interactivity, state, gestures, or motion.
- Keep client and motion boundaries small; do not convert a page or large section to a Client Component for one interactive child.
- Prefer static generation for stable showcase content.
- Use typed local data by default.
- Do not add a database, CMS, authentication, API, or backend infrastructure unless [`SITE.md`](../project/SITE.md) requires it.
- Pages compose sections. Sections receive data through typed props and compose presentational components.
- Presentational components do not access databases or remote services.
- Keep project-specific components separate from neutral accessibility and behavior primitives.
- Keep route-specific code near its route when that makes ownership clearer.
- Add `loading`, `error`, `not-found`, or route-handler files only when the route has a real state that needs them.

## Data flow

Prefer the shortest understandable flow:

```text
typed local data → page/server component → section → presentational component
```

Derive local data modules from [`CONTENT.md`](../project/CONTENT.md) and avoid two manually maintained sources of truth. Do not introduce repositories, service layers, query abstractions, or global stores for simple static showcase data.

## Component boundaries

- Prefer composition over configuration-heavy universal components.
- Do not build a universal marketing-section system.
- Do not abstract a component because two blocks only look vaguely similar.
- Reuse accessibility, semantics, focus behavior, input behavior, and utilities more freely than visible styling.
- Keep page files focused on route composition rather than detailed markup for every section.
- Split components by a clear responsibility, not by arbitrary line count.
- Avoid giant components with unrelated state, presentation, data, and motion responsibilities.
- Avoid unnecessary barrel files and dependency indirection.
- Keep the base UI easy to delete when a project is configured.

## TypeScript

- Keep `strict` mode enabled.
- Use explicit domain types near the data they describe.
- Do not use casual `any`, broad type assertions, or `@ts-ignore` to bypass a design problem.
- Model optional data honestly and handle it before rendering.
- Use discriminated unions for genuinely different states; do not create complex generic schemas for fixed static content.
- Do not weaken `tsconfig.json` to make validation pass.

## Styling and tokens

- Define project tokens for recurring color, typography, spacing, easing, and geometry values after [`DESIGN.md`](../project/DESIGN.md) is ready.
- Do not scatter repeated brand values across components.
- Do not create a large token framework for values used once.
- Use CSS and Tailwind where each is clearest; avoid extraction that makes a local rule harder to understand.
- Keep responsive rules beside the component or project layer they control.
- Never ship a predetermined visual theme from the master template.

## Accessibility

- Use semantic landmarks, headings, lists, buttons, links, labels, and form controls.
- Use a button for an action and a link for navigation.
- Make all functionality keyboard accessible with a visible, unobscured focus state.
- Provide meaningful alt text for informative media and empty alt text for decorative media.
- Provide touch parity; essential information and actions cannot be hover-only.
- Honor `prefers-reduced-motion` and remove large spatial movement when requested.
- Give forms persistent labels, instructions where needed, and useful error states.
- Review text, controls, focus indicators, and essential graphics for contrast.

## Performance

- Use `next/image` for content images and define correct responsive `sizes`.
- Use supported `next/font` tooling for project fonts; do not add blocking remote stylesheet links.
- Keep client JavaScript proportional to actual interactivity.
- Prefer transforms and opacity for animation where practical.
- Do not leave `will-change` applied permanently.
- Avoid unnecessary scroll listeners and per-frame React state updates.
- Audit large media and provide appropriate source dimensions and crops.
- Reserve media space to prevent layout shift.
- Use native scrolling by default.

## Error, loading, empty, and not-found states

Add a state only where a real failure or delay can occur:

- A static page with complete local data normally needs no loading or error boundary.
- A dynamic route must handle an unknown slug intentionally, commonly with `notFound()`.
- Optional media or content needs an explicit fallback only if omission is permitted by the project specification.
- A form or remote integration needs accessible pending, success, and error feedback.
- Do not create empty framework files merely to populate the tree.

## Clean-code standards

- **Naming:** Use domain language from project specifications; avoid `Thing`, `Item`, and visual names that hide purpose.
- **Responsibility:** A file or component should have one clear reason to change.
- **Comments:** Explain non-obvious intent or constraint, not syntax.
- **Dead code:** Remove unused components, styles, data, flags, and exports.
- **Dependencies:** Add a package only when its value exceeds its runtime, maintenance, and cognitive cost.
- **Error suppression:** Do not disable checks or swallow errors merely to get green output.
- **Duplication:** Remove meaningful repeated behavior, but tolerate small visible-style duplication when abstraction would erase art direction.
- **Premature abstraction:** Wait for a proven shared contract before generalizing.
- **Data structures:** Prefer small readable objects and arrays over configurable mini-languages.

Verification must satisfy [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) and the concise rules in [`.agents/rules/`](../../.agents/rules/).
