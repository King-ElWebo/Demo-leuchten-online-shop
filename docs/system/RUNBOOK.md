# Autonomous runbook

This is the operational sequence for a Showcase Website Factory run. [`AGENTS.md`](../../AGENTS.md) is the root orchestrator, [`TOOLING.md`](TOOLING.md) routes optional capabilities, and the four files in [`docs/project/`](../project/SITE.md) remain authoritative for the individual showcase.

## Phase handoffs

- Project specifications define the product, visual direction, content, and completion checks.
- Repository engineering contracts and permanent rules constrain implementation throughout the run.
- Skills contribute phase-specific expertise only after they are discovered and read in the current environment.
- MCP servers and other external tools contribute optional research, data, or interaction capabilities only after they are discovered.
- Useful skill and MCP results become durable local decisions, code, content, assets, tests, or notes. Temporary external output is not the finished product.
- [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) and the local QA baseline determine completion. A successful compile alone does not.

## Autonomous execution order

1. Read `AGENTS.md`, then every project, system, skill-directory, and rule file in its required reading order.
2. Validate specification readiness and cross-document consistency. Direct Build requires all four project documents to be complete, consistent, and marked `READY`; base-template maintenance may retain `TEMPLATE_NOT_CONFIGURED`.
3. Run the capability preflight from `AGENTS.md`: discover current skills, MCP servers, and tools; select the smallest useful set; record local fallbacks for unavailable optional capabilities.
4. Choose Direct Build or Concept Sprint using the routing below.
5. Plan routes, architecture, content modules, production assets, tests, and evidence from the project specifications.
6. Implement the complete specified scope with small client boundaries and no unrequested product expansion.
7. Perform a dedicated motion pass consistent with `DESIGN.md`, including reduced-motion behavior.
8. Refine responsive composition, art direction, crops, density, navigation, and touch behavior across required and intermediate widths.
9. Perform accessibility review: semantics, keyboard order, visible focus, labels, contrast, touch targets, hover alternatives, and automated axe results.
10. Perform visual critique and polish for hierarchy, typography, spacing, imagery, consistency, and the required signature moments.
11. Run the Playwright baseline and, when available and useful, additional interactive browser verification. Inspect screenshots rather than merely generating them.
12. Diagnose and fix every discovered functional, runtime, responsive, accessibility, motion, and visual problem at its root.
13. Repeat implementation and verification until every applicable item in `ACCEPTANCE.md` passes or a genuine external blocker has no safe fallback.
14. Run formatting, the documentation check, ESLint, TypeScript, Playwright, and the production build, followed by the aggregate `pnpm qa` gate.
15. Produce a concise completion report naming commands, routes, interactions, viewports, screenshots, results, fallbacks used, and any genuine unresolved blocker.

## Mode routing

### Direct Build

Use Direct Build when [`SITE.md`](../project/SITE.md), [`DESIGN.md`](../project/DESIGN.md), [`CONTENT.md`](../project/CONTENT.md), and [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) are complete, mutually consistent, and marked `READY`. Interpret and refine inside the specified direction; do not replace it.

### Concept Sprint

Use a Concept Sprint only when visual direction, information architecture, or signature interactions are intentionally unresolved. A sprint may use discovered design skills and optional design MCP tools to produce a small number of bounded options. Record the selected direction by updating, or proposing explicit updates to, the owning project documents before Direct Build begins. A normal build request must not become an uncontrolled redesign.

## Teamwork routing

Use `/goal` for a normal three-to-six-page showcase. Use `/teamwork-preview` only when the work contains genuinely independent streams, such as separate reference or asset research, several complex page families, an unusually elaborate motion system, an independent accessibility or performance audit, or a major hero portfolio piece.

Every teammate receives the same project specifications, authority hierarchy, and design direction. Give each stream a clear owner, prevent parallel invention of competing visual directions, and reconcile all results through the lead agent before the final QA loop.

## Platform entry points

- Antigravity may support `/goal` and `/teamwork-preview`; use the prompts below where those commands are available.
- Codex and agents without those slash commands receive the equivalent text as a normal task prompt.
- Claude-compatible environments may use [`CLAUDE.md`](../../CLAUDE.md) as a bridge to `AGENTS.md` where that environment supports the convention. Do not assume the bridge is automatically loaded.
- Every entry point must explicitly lead the agent to `AGENTS.md`; no platform-specific entry point changes the authority hierarchy or completion gate.

## Reusable run prompts

### Normal Antigravity showcase run

```text
/goal

Execute the complete Showcase Website Factory Direct Build defined in AGENTS.md.

Read and follow all referenced project and system documents. Perform the capability preflight, then continue autonomously through planning, implementation, motion, responsive refinement, accessibility, browser and visual QA, bug fixing and final validation.

Do not stop until the project acceptance criteria pass and pnpm qa succeeds, unless a genuine blocker requires user input.
```

### Antigravity Teamwork run

```text
/teamwork-preview

Execute the complete Showcase Website Factory workflow defined in AGENTS.md.

Use teamwork only for genuinely independent workstreams. Ensure every agent follows the same project specifications, authority hierarchy and design direction. Reconcile all work through the lead agent.

Continue through implementation, motion, responsive refinement, accessibility, browser and visual QA, bug fixing and final validation. Do not stop until the project acceptance criteria pass and pnpm qa succeeds, unless a genuine blocker requires user input.
```

### Codex or another agent without slash commands

```text
Execute the complete Showcase Website Factory Direct Build defined in AGENTS.md for the project in docs/project/.

Perform the capability preflight and continue autonomously until all acceptance criteria pass and pnpm qa succeeds. Do not commit, push or deploy.
```
