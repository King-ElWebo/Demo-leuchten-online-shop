# Autonomous runbook

This is the operational sequence for an Antigravity-first Showcase Website Factory run. [`AGENTS.md`](../../AGENTS.md) is the root orchestrator, [`ANTIGRAVITY.md`](ANTIGRAVITY.md) defines runtime behavior, [`TOOLING.md`](TOOLING.md) routes optional capabilities, and the four files in [`docs/project/`](../project/SITE.md) remain authoritative for the individual showcase.

## Phase handoffs

- Project specifications define the product, visual direction, content, and completion checks.
- Repository engineering contracts and permanent rules constrain implementation throughout the run.
- Skills contribute phase-specific expertise only after Antigravity discovers their exact package and reads the selected `SKILL.md`.
- MCP servers and other external tools contribute optional research, data, or interaction capabilities only after their selected tools pass a harmless read-only verification.
- Useful skill and MCP results become durable local decisions, code, content, assets, tests, or notes. Temporary external output is not the finished product.
- [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) and the local QA baseline determine completion. A successful compile alone does not.

## Autonomous execution order

1. Read `AGENTS.md`, then every project, system, skill-directory, and rule file in its required reading order.
2. Validate specification readiness and cross-document consistency. Direct Build requires all four project documents to be complete, consistent, and marked `READY`; base-template maintenance may retain `TEMPLATE_NOT_CONFIGURED`.
3. Run the capability preflight from `AGENTS.md`: discover current skills, MCP servers, and tools; classify them as `SELECTED_VERIFIED`, `AVAILABLE_NOT_SELECTED`, `UNAVAILABLE`, `FALLBACK_ACTIVE`, or `BLOCKED_REQUIRED`; select the smallest useful set; and record local fallbacks for unavailable or unverified optional capabilities.
4. Choose Direct Build or Concept Sprint using the routing below.
5. Plan routes, architecture, content modules, production assets, tests, and evidence from the project specifications.
6. Implement the complete specified scope with small client boundaries and no unrequested product expansion, using selected design intelligence and framework skills in their assigned phases.
7. Perform a dedicated motion pass consistent with `DESIGN.md`, including reduced-motion behavior, using the selected motion skill when verified.
8. Refine responsive composition, art direction, crops, density, navigation, and touch behavior across required and intermediate widths.
9. Perform accessibility review: semantics, keyboard order, visible focus, labels, contrast, touch targets, hover alternatives, and automated axe results.
10. Perform visual critique and polish for hierarchy, typography, spacing, imagery, consistency, and the required signature moments, using the selected final-critic skill when verified.
11. Use Antigravity browser tooling for interactive and visual inspection when verified, then run the mandatory Playwright and axe baseline. Inspect live layouts and screenshots rather than merely generating them.
12. Diagnose and fix every discovered functional, runtime, responsive, accessibility, motion, and visual problem at its root.
13. Repeat implementation and verification until every applicable item in `ACCEPTANCE.md` passes or a genuine external blocker has no safe fallback.
14. Run formatting, the documentation check, ESLint, TypeScript, Playwright, and the production build, followed by the aggregate `pnpm qa` gate.
15. Produce a concise completion report naming commands, routes, interactions, viewports, screenshots, results, fallbacks used, and any genuine unresolved blocker.

## Mode routing

### Direct Build

Use Direct Build when [`SITE.md`](../project/SITE.md), [`DESIGN.md`](../project/DESIGN.md), [`CONTENT.md`](../project/CONTENT.md), and [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) are complete, mutually consistent, and marked `READY`. Interpret and refine inside the specified direction; do not replace it.

For a normal Direct Build, OpenDesign defaults to `AVAILABLE_NOT_SELECTED`. It may support a bounded implementation question or focused critique only within the mode recorded in `DESIGN.md`.

### Concept Sprint

Use a Concept Sprint only when visual direction, information architecture, or signature interactions are intentionally unresolved. When `DESIGN.md` permits it, a sprint may select a verified OpenDesign MCP and design skill to produce one to three purposeful options. Record the selected direction in `DESIGN.md` and any required local notes, assets, and implementation requirements before Direct Build begins. Temporary MCP output is not a source of truth, and a normal build request must not become an uncontrolled redesign.

## Teamwork routing

Use `/goal` for a normal three-to-six-page showcase. Reserve `/teamwork-preview` for an unusually large hero project with genuinely independent streams, such as separate reference or asset research, several complex page families, an unusually elaborate motion system, or an independent accessibility or performance audit. Teamwork may begin with Antigravity's interactive scoping and approval phase before autonomous execution.

The lead Antigravity agent performs capability preflight during initial scoping. The approved Teamwork brief must name each workstream's phase owner, selected skill, permitted MCP tool, permission level, durable local handoff artifact, and fallback. Do not assume undocumented skill or MCP inheritance across workers. If a worker cannot access OpenDesign or another selected MCP, the lead or a designated research agent performs the authorized interaction, saves the useful result locally, and hands that artifact or recorded decision to the implementation worker.

Every teammate uses the same `SITE.md`, `DESIGN.md`, `CONTENT.md`, `ACCEPTANCE.md`, authority hierarchy, and visual direction. Prevent parallel invention of competing directions, and reconcile all results through the lead agent before the final QA loop.

## Platform entry points

- Google Antigravity is the primary production runtime. Use `/goal` by default and `/teamwork-preview` only under the criteria above.
- Claude-compatible environments may use [`CLAUDE.md`](../../CLAUDE.md) as a bridge to `AGENTS.md` where that environment supports the convention. Do not assume the bridge is automatically loaded.
- Every entry point must explicitly lead the agent to `AGENTS.md`; no platform-specific entry point changes the authority hierarchy or completion gate.

## Reusable run prompts

### Normal Antigravity showcase run

```text
/goal

Execute the complete Antigravity-first Showcase Website Factory Direct Build defined in AGENTS.md for the project in docs/project/.

Perform the mandatory capability preflight. Use the selected verified skills and MCP tools in their assigned phases; do not merely list them. Continue autonomously through implementation, motion, responsive refinement, accessibility, visual critique, browser verification, corrective iteration and final validation.

Do not stop until every applicable acceptance criterion passes and pnpm qa succeeds, unless a genuine blocker has no safe fallback.
```

### Antigravity Teamwork run

```text
/teamwork-preview

Execute the Antigravity-first Showcase Website Factory workflow defined in AGENTS.md.

During scoping, read the complete project specification and perform the capability preflight. Create independent workstreams only where they provide real value. Assign clear skill, MCP, permission, fallback and artifact ownership to each workstream.

Keep one shared visual direction and reconcile all results through the lead agent. Continue through implementation, motion, responsive refinement, accessibility, visual critique, browser verification and final validation until every applicable acceptance criterion and pnpm qa pass.
```

## Base repository maintenance

Codex is used primarily to maintain or audit the reusable factory, not to produce copied showcase websites. Give it a normal task prompt that explicitly says to follow `AGENTS.md`, preserve template mode where applicable, run the local completion gate, and not commit, push, or deploy unless separately authorized.
