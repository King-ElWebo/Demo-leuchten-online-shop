# Agent constitution

This repository is a reusable production system for project-specific showcase websites. Google Antigravity is the primary production runtime; Codex is used primarily to maintain and audit this base repository. Project specifications define what to build; this file orchestrates the run; repository contracts and rules constrain it; discovered skills and MCP tools add optional expertise or access; local tooling supplies deterministic evidence.

## Required reading order

Before planning or implementation, read these exact files in order:

1. [`docs/project/SITE.md`](docs/project/SITE.md)
2. [`docs/project/DESIGN.md`](docs/project/DESIGN.md)
3. [`docs/project/CONTENT.md`](docs/project/CONTENT.md)
4. [`docs/project/ACCEPTANCE.md`](docs/project/ACCEPTANCE.md)
5. [`docs/system/ENGINEERING.md`](docs/system/ENGINEERING.md)
6. [`docs/system/STACK.md`](docs/system/STACK.md)
7. [`docs/system/ANTIGRAVITY.md`](docs/system/ANTIGRAVITY.md)
8. [`docs/system/TOOLING.md`](docs/system/TOOLING.md)
9. [`docs/system/RUNBOOK.md`](docs/system/RUNBOOK.md)
10. [`.agents/skills/README.md`](.agents/skills/README.md)
11. [`.agents/rules/00-showcase-orchestration.md`](.agents/rules/00-showcase-orchestration.md)
12. [`.agents/rules/code-quality.md`](.agents/rules/code-quality.md)
13. [`.agents/rules/design-quality.md`](.agents/rules/design-quality.md)
14. [`.agents/rules/responsive-accessibility.md`](.agents/rules/responsive-accessibility.md)
15. [`.agents/rules/motion-quality.md`](.agents/rules/motion-quality.md)
16. [`.agents/rules/qa-completion.md`](.agents/rules/qa-completion.md)

Files under [`docs/superpowers/`](docs/superpowers/README.md) are implementation history, not current runtime authority, and are not part of this required reading order.

## Terminology and authority

- **Project specifications** are the four files in `docs/project/`. `SITE.md` owns scope and functionality; `DESIGN.md` owns visual and motion direction; `CONTENT.md` owns copy and content data; `ACCEPTANCE.md` owns completion checks but cannot introduce, expand, or contradict product scope.
- **Repository rules** are the permanent constraints in `.agents/rules/`. They apply throughout every run and are not optional skills that need activation.
- **Skills** are discoverable instruction packages that provide expertise and working methods. They provide no external access, never outrank project specifications, and are available only when the current agent can discover and read them.
- **MCP servers and external tools** provide optional external data, tools, or interactive capabilities. They are not skills, npm packages, or runtime dependencies of the finished website.
- **OpenDesign MCP** is the preferred external design creation and iteration workspace when verified and permitted by `DESIGN.md`. Selected skills guide how Antigravity uses it; OpenDesign does not invoke those skills and never replaces `DESIGN.md` as durable authority.
- **Local tooling** is the repository-owned deterministic baseline: Prettier, the documentation checker, ESLint, TypeScript, Playwright with axe, and the production build.

Resolve every conflict in this order:

1. Direct user instructions
2. The relevant project specification for that domain
3. Repository engineering and stack contracts
4. Repository rules
5. Applicable skills
6. MCP recommendations and external suggestions
7. General agent defaults

Apply domain ownership rather than averaging conflicting documents. `SITE.md` decides scope and behavior, `DESIGN.md` decides visual and motion direction, `CONTENT.md` decides copy and content, and `ACCEPTANCE.md` verifies completion. A skill, MCP server, reference site, library default, or external design suggestion must never override an owning project specification or a direct user instruction.

## Readiness gate

Direct Build requires all four project specifications to say `Specification status: READY`, contain no `[REQUIRED: replace before production run]` markers, and be mutually consistent. `READY` means the brief, direction, and external-tool permissions are ready for execution; it does not mean an authorized `PRIMARY_DESIGN_PARTNER` OpenDesign phase should be skipped. Report a genuinely required missing decision instead of inventing it. Resolve minor implementation details coherently without pausing.

Use Concept Sprint only when visual direction, information architecture, or signature interactions are intentionally unresolved. It must update, or propose explicit updates to, the owning project documents before the final Direct Build. A normal `/goal` must not quietly become an uncontrolled redesign.

`TEMPLATE_NOT_CONFIGURED` is intentional in the untouched master repository. It permits base-template maintenance and the repository's own `pnpm qa`; it does not permit claiming that a production showcase is complete.

## Mandatory capability preflight

After the readiness review and before either execution mode, perform a short Antigravity capability preflight:

1. Extract explicit capability intent from the current user prompt, including natural-language design, motion, review, planning, testing, and Teamwork requests.
2. Reconcile that intent with the authority hierarchy. When a direct user instruction changes a recorded decision, update or explicitly reconcile the owning project document before implementation so durable direction is not contradictory.
3. Inspect the current environment for available skills, MCP servers, and tools.
4. Map user intent and project needs through the canonical [preferred Antigravity skill routing in `TOOLING.md`](docs/system/TOOLING.md#preferred-antigravity-skill-routing).
5. Classify relevant capabilities as `SELECTED_VERIFIED`, `AVAILABLE_NOT_SELECTED`, `UNAVAILABLE`, `FALLBACK_ACTIVE`, or `BLOCKED_REQUIRED`.
6. Select the smallest useful set, normally one primary skill per phase and at most one genuinely distinct critic where valuable.
7. Apply the `DESIGN.md` OpenDesign mode: select and use verified OpenDesign for permitted `PRIMARY_DESIGN_PARTNER` or `CONCEPT_SPRINT_PRIMARY` work, bound it to critique for `CRITIQUE_ONLY`, and do not use it for `OFF`.
8. Assign the documented local fallback for every unavailable or unverified optional capability.
9. Continue autonomously unless a genuinely required capability is `BLOCKED_REQUIRED` because it has no safe fallback.

A skill is `SELECTED_VERIFIED` only when Antigravity discovered it, its exact name or package is known, its `SKILL.md` is readable, and its instructions are relevant to the current phase. Assign each selected skill to exactly one primary phase or one bounded specialist role, then actually invoke or follow it during that phase. Do not select overlapping skills as competing creative directors or claim a skill was used because it was merely discovered. A skill never overrides direct user instructions or `SITE.md`, `DESIGN.md`, `CONTENT.md`, or `ACCEPTANCE.md`.

An MCP capability is `SELECTED_VERIFIED` only when its server is installed and enabled, its tools are visible, and a harmless read-only health or discovery call succeeds. Never use generation, writes, project creation, deletion, publishing, or another mutation as a health check. If no safe read-only probe exists, keep the capability available but unverified and use the local fallback. For OpenDesign, the completed project policy in `DESIGN.md` authorizes only its explicitly listed non-destructive operations after verification; it does not make the health check itself mutating.

Do not hardcode machine-specific skill locations or assume a familiar product or package name exists. Use selected capabilities in their assigned phases rather than merely listing them. A concise preflight report is sufficient:

```text
Antigravity capability preflight

SELECTED_VERIFIED
- <phase: exact readable skill or safely probed MCP capability>
- <design workspace: verified OpenDesign under the DESIGN.md mode, or none>

AVAILABLE_NOT_SELECTED
- <available capability and why it is not needed>

UNAVAILABLE
- <optional capability or none>

FALLBACK_ACTIVE
- <capability: local method>

BLOCKED_REQUIRED
- none
```

Antigravity-specific discovery and configuration boundaries are defined in [`docs/system/ANTIGRAVITY.md`](docs/system/ANTIGRAVITY.md). The logical capability matrix, MCP permissions, and fallbacks are defined in [`docs/system/TOOLING.md`](docs/system/TOOLING.md).

## Execution routing and loop

In Antigravity, use `/goal` for a normal three-to-six-page showcase. Reserve `/teamwork-preview` for unusually large hero projects with genuinely independent workstreams. Its lead agent performs the capability preflight during initial scoping, records capability, permission, fallback, and local-artifact ownership per workstream, and does not assume every worker inherits every skill or MCP tool. Every teammate follows this file, the same project specifications, and the same authority hierarchy; the lead owns reconciliation and final QA.

Follow the full operational sequence in [`docs/system/RUNBOOK.md`](docs/system/RUNBOOK.md):

1. Read instructions and specifications.
2. Validate readiness and consistency.
3. Run capability preflight.
4. Read the smallest relevant design-skill bundle, then choose Direct Build or Concept Sprint.
5. Plan routes, architecture, content, assets, tests, evidence, and permitted OpenDesign operations.
6. When selected by `DESIGN.md`, apply the verified skills while using OpenDesign to create, critique, and refine one shared direction.
7. Persist the selected design decisions and permitted local artifacts before frontend implementation.
8. Implement the specified scope and complete React quality review.
9. Complete a dedicated motion implementation and polish pass.
10. Complete responsive and accessibility refinement.
11. Complete visual critique and polish.
12. Run focused checks and useful browser verification while implementation is still changing.
13. Fix discovered problems at their root.
14. Repeat until acceptance passes or a genuine blocker remains.
15. After corrective iteration, run the final aggregate `pnpm qa` once; it owns formatting, documentation, lint, typecheck, Playwright, and build validation.
16. Produce an evidence-based completion report.

Skills provide phase-specific expertise. MCP tools provide optional external capabilities. Both feed durable local implementation and evidence; neither determines scope or completion. Missing optional capabilities never block work when the fallback in `TOOLING.md` is safe.

The default phase ownership is: current user intent plus project specifications → discover and read the smallest relevant design-skill bundle → apply those skills while verified OpenDesign creates the permitted design direction → bounded critic review and OpenDesign refinement → durable `DESIGN.md` handoff → `frontend-design` implementation → React quality review → `emil-design-eng` motion direction with bounded transition specialists → responsive, accessibility, and visual QA → `verification-before-completion` → Antigravity browser verification → Playwright and axe → one final `pnpm qa`. Every name is a preferred candidate, not an installation claim. Exact ownership, OpenDesign modes, conflicts, permissions, and fallbacks live only in `TOOLING.md` and the project policy in `DESIGN.md`.

## Permanent implementation constraints

- Use Server Components by default and keep interactive or motion client boundaries small.
- Do not add backend infrastructure, APIs, authentication, a database, or a CMS unless `SITE.md` requires it.
- Do not invent features, generic marketing copy, or a visual direction that expands or replaces the project specifications.
- Do not turn the system into a universal section builder or impose a reusable visual theme.
- Preserve the specified typography, image grammar, density, responsive art direction, motion character, and signature moments.
- Make every visible control intentional and keep essential information available to keyboard and touch users.
- Do not silence TypeScript, lint, test, build, or accessibility failures. Fix root causes.
- Do not claim a test, browser inspection, screenshot review, or build ran without fresh evidence.
- Keep code and data flow understandable; remove unused code and dependencies.

## External mutation restrictions

Repository inspection and approved local implementation are allowed. A completed and approved external-design-tooling policy in `DESIGN.md` is project-scoped authorization for exactly its listed non-destructive OpenDesign creation, refinement, saving, updating, and export operations after capability verification. It does not authorize deletion, public publishing, account changes, or unrelated external mutations; those always require separate direct authorization. Do not commit, push, open or modify issues or pull requests, deploy, or mutate other external services without direct user authorization. Figma, GitHub, Vercel, image, and browser MCP access never implies mutation permission.

## Final completion gate

Do not finish merely because the application compiles. Completion requires:

- every applicable item in [`docs/project/ACCEPTANCE.md`](docs/project/ACCEPTANCE.md) to pass without expanding the owning project specifications;
- successful local formatting, documentation integrity, ESLint, TypeScript, Playwright with axe, production build, and aggregate `pnpm qa` checks;
- interactive, responsive, accessibility, motion, and visual review appropriate to the project;
- a concise final report naming routes, interactions, viewports, screenshots, commands, observed results, fallbacks used, and exact unresolved blockers.

Generated evidence belongs under [`artifacts/qa/`](artifacts/qa/README.md). Evidence—not confidence—is the completion standard.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
