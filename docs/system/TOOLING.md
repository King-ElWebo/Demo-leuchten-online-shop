# Capability routing and local tooling

This document explains how a run discovers and routes skills, MCP servers, external tools, and repository-owned validation. [`AGENTS.md`](../../AGENTS.md) owns orchestration, [`ANTIGRAVITY.md`](ANTIGRAVITY.md) owns Antigravity-specific runtime behavior, [`RUNBOOK.md`](RUNBOOK.md) owns execution order, and the project specifications remain authoritative in their domains.

## Capability boundaries

- **Repository rules** in [`.agents/rules/`](../../.agents/rules/code-quality.md) are permanent constraints. They are always active and are never selected as skills.
- **Skills** are readable instruction packages discovered in the current agent environment. They supply expertise and methods, not external access.
- **MCP servers and external tools** are runtime capabilities discovered in the current environment. They may supply external data, applications, or interactive access, but they are not skills or website dependencies.
- **Local tooling** is installed with this repository and provides deterministic checks regardless of optional skill or MCP availability.

The repository does not vendor third-party skills or MCP servers. A name in this document describes a logical capability unless the preflight confirms an exact installed and readable package or callable tool. Never claim that a capability is installed from its name alone, and never hardcode a machine-specific installation path.

## Mandatory capability preflight

Follow the preflight in [`AGENTS.md`](../../AGENTS.md) after readiness review:

1. Enumerate skills the current environment can actually discover.
2. Enumerate visible MCP servers and external tools.
3. Map only relevant discoveries to the logical capabilities below.
4. Verify selected skills by exact name, readable `SKILL.md`, and phase relevance.
5. Verify selected MCP capabilities only when the server is installed and enabled, its tools are visible, and a harmless read-only discovery or health call succeeds.
6. Choose the smallest useful set: normally one primary skill for a phase and, if it adds a different perspective, one critic.
7. Assign a local fallback to every unavailable or unverified optional capability.
8. Continue unless a genuinely required capability has no safe fallback.

Use these states consistently:

| State                    | Meaning                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SELECTED_VERIFIED`      | Selected for this run and verified under the skill or MCP rules above.                                                                                                       |
| `AVAILABLE_NOT_SELECTED` | Discovered but not needed, or visible without a safe read-only verification path. It must not be used or claimed as verified yet.                                            |
| `UNAVAILABLE`            | Not discoverable, not readable, not enabled, or not reachable.                                                                                                               |
| `FALLBACK_ACTIVE`        | The documented repository or local method is being used instead.                                                                                                             |
| `BLOCKED_REQUIRED`       | The owning project specification requires the capability and no safe fallback can satisfy it. This is the only state that stops autonomous execution for capability reasons. |

Never use generation, writes, project creation, deletion, publishing, or another mutation as an MCP health check. If no safe read-only probe exists, use `AVAILABLE_NOT_SELECTED` and `FALLBACK_ACTIVE` until an authorized real use succeeds.

Keep the report brief and evidence-based:

```text
Antigravity capability preflight

SELECTED_VERIFIED
- Design intelligence: <exact readable package or none>
- Motion: <exact readable package or none>
- Browser verification: <exact safely probed capability or none>

AVAILABLE_NOT_SELECTED
- <capability and reason, or none>

UNAVAILABLE
- <optional capability or none>

FALLBACK_ACTIVE
- <capability: local method>

BLOCKED_REQUIRED
- none
```

## Preferred Antigravity skill profile

These are preferred candidates, not installation claims. Select them only when Antigravity discovers the exact package and its `SKILL.md` is readable and relevant. Use the selected skill during its assigned phase; listing it in preflight is not sufficient.

### Creative direction and design intelligence

Prefer `ui-ux-pro-max` for brief interpretation, design-system recommendations, typography and color reasoning, responsive guidance, and UI/UX anti-pattern checks. `DESIGN.md` remains authoritative. Do not let a skill replace distinctive art direction with a generic industry template, and do not average several design-generation skills into one direction.

Fallback: apply the project specifications and supplied references, follow the repository design rules, and perform a manual browser critique.

### Motion implementation

Prefer `emil-design-eng` as the primary skill during the dedicated motion pass. If separately discovered and useful, select a narrowly scoped skill only for its matching task:

- `animate` for focused implementation of one animation;
- `review-animations` or `improve-animations` during motion QA;
- `find-animation-opportunities` only when `DESIGN.md` permits motion exploration;
- `mobile-native` only when mobile interaction quality materially benefits.

Do not activate all Emil skills at once. `emil-design-eng` owns the main motion pass, and no skill may increase animation density beyond `DESIGN.md`.

Fallback: Motion for React, CSS transitions, the repository motion rule, reduced-motion handling, and browser inspection.

### Visual refinement

Prefer an exact readable `Impeccable` package as a final critic and refinement capability. Use its conceptual `critique`, `polish`, `typeset`, `layout`, or `adapt` operations only after the direction and implementation are coherent. It is not a second creative director when UI/UX Pro Max owns design interpretation, and its animation capabilities do not redefine motion when Emil owns the motion pass. Recommendations stay within `SITE.md`, `DESIGN.md`, and `CONTENT.md`.

Fallback: inspect the required screenshots and live layout, apply the project design rules, and perform a manual visual critique.

### Engineering skills

Where discovered and relevant, use a Next.js skill during architecture and framework-sensitive implementation, a React quality skill after meaningful TSX implementation, an accessibility skill during implementation and final review, a responsive-design skill during viewport refinement, and a browser-verification skill during interactive QA. Repository engineering contracts and project specifications remain authoritative.

## Default phase ownership

```text
Project specifications
→ UI/UX Pro Max for design intelligence
→ optional OpenDesign during an authorized Concept Sprint
→ selected decisions written to DESIGN.md
→ Next.js/React implementation
→ Emil motion pass
→ responsive and accessibility refinement
→ Impeccable critique/polish
→ Antigravity browser verification
→ mandatory Playwright and axe baseline
→ pnpm qa
```

This sequence assigns expertise, not authority: UI/UX Pro Max does not own final project direction; OpenDesign never remains a parallel source of truth; Emil owns motion refinement; Impeccable owns final critique rather than initial direction; browser tooling supplies observations; and Playwright supplies deterministic evidence rather than aesthetic judgment.

## Skill-routing matrix

Every row is a logical capability, not an installation claim. An exact skill is usable only if the current environment discovers it and the agent can read its instructions.

| Logical capability                          | Purpose                                                                                                               | Appropriate phase                                                                 | Use when                                                                                                                                            | Do not use when                                                                                                                      | Authority limit                                                                                              | Local fallback                                                                                                                                         | Discovery requirement                                                                                                                                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Creative direction / UI design              | Interpret or critique information hierarchy, composition, interaction, and a distinctive visual thesis.               | Concept Sprint, design interpretation, or design critique.                        | The project needs one coherent design lens or a focused critique. Select one primary design skill and at most one separate critic.                  | Do not stack several overlapping design skills, reopen a `READY` direction without authorization, or replace project copy.           | `SITE.md` owns product behavior and `DESIGN.md` owns visual and motion direction.                            | Apply the completed project documents directly, use the repository design rule, and perform a manual visual-cohesion review.                           | Discover and read an exact UI/UX, creative-direction, brand, frontend-design, or clearly equivalent skill. Familiar labels such as “UI/UX Pro Max” are not proof of availability.                             |
| Next.js architecture                        | Apply current App Router, rendering, metadata, image, font, and server/client conventions.                            | Architecture and implementation.                                                  | The exact installed Next.js version or an unfamiliar framework convention needs specialist guidance.                                                | Do not use it to add routes, services, or dependencies outside `SITE.md` and `STACK.md`.                                             | `ENGINEERING.md`, `STACK.md`, installed-version documentation, and project scope win.                        | Read the version-matched documentation under the installed Next.js package and use official documentation for unresolved version-sensitive questions.  | Discover and read an applicable Next.js skill; confirm it addresses the installed version.                                                                                                                    |
| React quality                               | Review component boundaries, hooks, rendering, semantics, performance, and TypeScript after meaningful TSX exists.    | After component implementation and during refactoring.                            | A focused review can simplify real components or correct rendering and interaction issues.                                                          | Do not abstract speculative reuse, replace Server Components without cause, or run before there is meaningful component code.        | Project behavior and repository component-boundary rules win.                                                | Review against `ENGINEERING.md`, ESLint, TypeScript, React/Next documentation, and observed browser behavior.                                          | Discover and read an exact React quality or performance skill.                                                                                                                                                |
| Motion design                               | Guide interaction feel, easing, timing, choreography, interruption, and reduced-motion behavior.                      | Dedicated motion pass and motion critique.                                        | `DESIGN.md` calls for purposeful motion and the working interface is ready to tune. An Emil-Kowalski-style motion capability or equivalent may fit. | Do not invent motion density, add decorative choreography, or override a quiet direction.                                            | `DESIGN.md` controls motion character and density; the motion rule controls reusable safeguards.             | Use Motion for React and CSS already in the stack, follow the motion rule, honor reduced motion, and inspect behavior in the browser.                  | Discover and read an exact motion skill; a style reference in this matrix is not an installed package claim.                                                                                                  |
| Visual refinement / “Impeccable” equivalent | Find hierarchy, spacing, typography, crop, consistency, and interaction-polish issues in an already coherent build.   | Final visual critique and polish.                                                 | A refinement skill offers a distinct critic perspective after implementation.                                                                       | Do not use it as a second competing creative direction or as proof that visual QA occurred.                                          | It may recommend refinements only inside `DESIGN.md`, `SITE.md`, and `CONTENT.md`.                           | Inspect required screenshots and live viewports against the design specification and acceptance criteria.                                              | Use only an exact installed, readable visual-refinement or design-review skill. Never assume a capability named “Impeccable” exists.                                                                          |
| Responsive design                           | Review transformation across widths, content priority, crops, navigation, density, and touch behavior.                | Responsive implementation and viewport refinement.                                | Layout decisions differ across desktop, tablet, mobile, or intermediate widths.                                                                     | Do not treat mobile as stacked desktop or invent different content without `CONTENT.md` support.                                     | `DESIGN.md` owns responsive art direction; `CONTENT.md` owns approved content variants.                      | Implement CSS/container/media-query behavior, exercise Playwright viewports, and manually inspect intermediate widths.                                 | Discover and read an exact responsive-design or UI-audit skill.                                                                                                                                               |
| Accessibility                               | Guide semantic structure, keyboard behavior, focus, labels, contrast, touch targets, and reduced motion.              | During implementation and final accessibility review.                             | Any route or interaction is being built or verified.                                                                                                | Do not treat automated axe output as a substitute for keyboard, focus, meaning, and interaction reasoning.                           | It cannot change product scope or approved copy except to report a conflict requiring an owning-spec update. | Use native semantics, manual keyboard and focus review, browser inspection, the accessibility rule, and Playwright axe scans.                          | Discover and read an exact accessibility skill when available; accessibility work remains required without one.                                                                                               |
| Browser QA                                  | Exercise real navigation, scrolling, hover, focus, touch-size, runtime behavior, and visual layout.                   | Iterative QA and final browser verification.                                      | The running application needs interaction sequences or visual inspection beyond assertions alone.                                                   | Do not replace deterministic Playwright coverage or infer visual quality from generated files without looking at them.               | Observations create implementation work; they do not rewrite specifications.                                 | Use repository Playwright tests, Playwright CLI/UI where available, generated screenshots, and manual browser review as the last fallback.             | Discover and read an exact browser-verification skill and confirm its browser tooling is callable.                                                                                                            |
| GSAP expertise                              | Implement or review complex timelines, scroll choreography, or effects that Motion and CSS cannot reasonably express. | Architecture decision and dedicated motion implementation.                        | `DESIGN.md` explicitly requires complex choreography and a documented comparison shows GSAP is justified.                                           | Do not use for routine reveals, hover states, simple transitions, or as a default animation system.                                  | GSAP is opt-in under `STACK.md`; it cannot expand motion direction or density.                               | Use Motion for React and CSS, simplify the effect while preserving design intent, or pause only if the exact required behavior has no safe equivalent. | Discover and read a GSAP skill if present. If the dependency is justified, handle installation deliberately under `STACK.md` and the current user-authorized scope; never assume the skill or package exists. |
| Asset or image capability                   | Find, generate, assess, crop, or prepare project-permitted imagery.                                                   | Asset planning, approved research, implementation, or responsive crop refinement. | Project specifications permit discovery or generation and define rights, use, and art direction.                                                    | Do not fabricate client assets, ignore licensing, replace supplied media, or use temporary remote output as a production dependency. | `DESIGN.md` controls image direction and `CONTENT.md` controls assignments, alt text, source, and rights.    | Use supplied assets, local editing tools, CSS crops, and explicit placeholders only when the specifications permit them.                               | Discover and read an exact image or asset skill and verify that any required tool is callable.                                                                                                                |

## MCP and external-tool routing

MCP tools are optional runtime capabilities. The repository installs none, and a copied project must remain implementable and verifiable without them whenever a local fallback exists. Installation or connection makes tools available to Antigravity, but the model still selects them by relevance and permission. Follow the configuration boundaries in [`ANTIGRAVITY.md`](ANTIGRAVITY.md); reusable OpenDesign access belongs in Antigravity's global configuration rather than a copied repository, and neither location may place credentials in version control.

| MCP or external capability                       | Appropriate phase and use                                                                                                                                        | Permission expectations                                                                                                                                                      | Durable local output                                                                                                                              | Fallback when unavailable                                                                                                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Antigravity browser tooling                      | Preferred interactive and visual QA layer: navigate, scroll, hover, focus, inspect defined viewports, collect screenshots, and check console/runtime behavior.   | Local-site inspection and reversible browser interaction are normal QA. Do not submit external forms, publish, purchase, or mutate unrelated systems without authorization.  | Test cases, fixed code, inspected local screenshots, console notes, and acceptance evidence under the repository.                                 | Run Playwright tests and screenshots; use Playwright UI/CLI if available; perform documented manual review only as the last interactive fallback.                 |
| Official OpenDesign MCP                          | Preferred optional design MCP for an authorized Concept Sprint; in a `READY` Direct Build, only bounded implementation support, focused critique, or validation. | A harmless read-only probe verifies reachability only. Generation, project or artifact creation, saving, updating, deletion, and publishing require project/user permission. | Selected decisions in `DESIGN.md`, local reference notes, permitted local assets, and implementation requirements. Temporary output is not truth. | Use supplied references, one discovered design skill, the project documents, and local visual critique.                                                           |
| Figma MCP                                        | Inspect a real supplied Figma source or perform an explicitly requested Figma task. No Figma file is required for a showcase build.                              | Read supplied sources by default; creating or editing Figma content requires explicit authorization and access.                                                              | Implemented local components/tokens/assets and documented decisions; do not leave the build dependent on MCP availability.                        | Build directly from `DESIGN.md`, `CONTENT.md`, supplied exports, and local references.                                                                            |
| Image search or image-generation MCP             | Discover or generate imagery only when project specifications permit it.                                                                                         | Respect project authorization, licensing, attribution, privacy, and content restrictions. External publishing or account mutation is out of scope.                           | Final approved assets stored under `public/media/` with source, rights, assignment, alt text, focal point, and crop decisions in `CONTENT.md`.    | Use supplied assets, permitted local generation/editing, or specification-approved placeholders. Never retain temporary MCP URLs as production assets.            |
| GitHub MCP                                       | Read-only repository, issue, release, or code inspection when it materially helps implementation.                                                                | Commits, pushes, branches, issues, pull requests, reviews, merges, and other mutations require explicit user authorization.                                                  | Relevant findings incorporated into local code or concise local notes; repository changes remain local until separately authorized.               | Inspect the local Git repository and installed dependency sources; use official project documentation for external facts.                                         |
| Vercel MCP                                       | Deployment, deployment inspection, logs, or platform operations only when the user explicitly requests them.                                                     | No automatic deployment, project creation, environment change, domain change, or platform mutation during a normal showcase run.                                             | Authorized configuration changes documented locally and deployment evidence recorded only when deployment is in scope.                            | Complete local `pnpm build` and browser QA. A normal implementation run ends locally.                                                                             |
| Documentation MCP or official documentation tool | Resolve version-sensitive framework, browser, library, or platform questions.                                                                                    | Prefer read-only official sources; do not change accounts, projects, or configuration merely to read documentation.                                                          | Version-relevant decisions reflected in code, tests, or concise local documentation when they affect future maintenance.                          | Read installed package documentation first, then official documentation through available read-only web tools. Avoid generic search when a primary source exists. |

### OpenDesign policy

Use the [official upstream OpenDesign integration](https://github.com/nexu-io/open-design) as the preferred optional design MCP when it is installed and connected. Do not make it a repository dependency, commit a working machine-specific configuration, or recommend an unofficial bridge as the default.

- **Normal Direct Build:** when the project documents, especially `DESIGN.md`, are complete and `READY`, the default is `AVAILABLE_NOT_SELECTED`. Select OpenDesign only for bounded implementation support, a focused critique, or validation of a difficult visual decision unless the project explicitly permits more concept work. It must not reopen the approved direction.
- **Concept Sprint:** OpenDesign may become `SELECTED_VERIFIED` when visual direction is intentionally unresolved, the project is a major hero piece, the user requests bounded alternatives, and the `DESIGN.md` policy permits generation. Produce only a small purposeful set, normally one to three directions, then translate the selected result into `DESIGN.md`, local notes, permitted local assets, and implementation requirements.
- **Permission boundary:** a read-only health check never authorizes project creation, generation, artifact saving, updates, deletion, or publishing. Autonomous external generation or writes must be explicitly allowed by the project's external-design-tooling policy. Destructive deletion and public publishing always require direct authorization.

The browser verification model is deliberately additive:

```text
Playwright + axe = mandatory deterministic baseline
Antigravity browser tooling = interactive and visual verification
Manual inspection = final fallback
```

The Antigravity agent must inspect the live layouts and captured screenshots. Merely generating screenshot files does not satisfy visual QA.

## Repository-owned deterministic baseline

These checks do not depend on optional MCP access or globally installed skills.

| Check                              | Command             | Contract                                                                                                                                                                            |
| ---------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Formatting                         | `pnpm format:check` | Repository files match Prettier formatting.                                                                                                                                         |
| Documentation integrity            | `pnpm docs:check`   | Required documents and runtime contracts exist, `AGENTS.md` references them, local Markdown links resolve, and project readiness markers are coherent. Template mode remains valid. |
| Static code quality                | `pnpm lint`         | ESLint and Next.js rules pass without suppressing root causes.                                                                                                                      |
| Type safety                        | `pnpm typecheck`    | Strict TypeScript passes.                                                                                                                                                           |
| Browser and accessibility baseline | `pnpm test:e2e`     | Registered routes pass runtime, console, overflow, serious/critical axe, and screenshot coverage. Axe does not replace keyboard or focus reasoning.                                 |
| Production readiness               | `pnpm build`        | The Next.js production build completes.                                                                                                                                             |
| Aggregate gate                     | `pnpm qa`           | Formatting, docs, lint, types, Playwright, and production build all pass in sequence.                                                                                               |

Playwright is mandatory baseline QA, not a fallback. Keep [`tests/e2e/routes.ts`](../../tests/e2e/routes.ts) aligned with `SITE.md` and add project-specific interaction assertions where acceptance requires them. Browser MCP, when available, adds exploratory and visual coverage; it does not reduce the Playwright obligation.

Generated evidence belongs under [`artifacts/qa/`](../../artifacts/qa/README.md). Review screenshots at the project-defined viewports and at relevant intermediate widths. A screenshot file that nobody inspected is not visual evidence.

## Execution modes and handoff

Direct Build, Concept Sprint, Teamwork criteria, platform entry points, and the reusable prompts live in [`RUNBOOK.md`](RUNBOOK.md). All modes use the same authority hierarchy and local completion gate.

If an optional capability is missing, note it once, use the matrix fallback, and continue. Stop only when the project explicitly requires an external capability, the current environment cannot supply it, and no safe local alternative can satisfy the owning specification. Report the exact missing capability, affected criterion, attempted fallback, and required user action.
