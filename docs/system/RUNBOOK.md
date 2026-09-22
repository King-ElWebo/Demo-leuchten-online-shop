# Autonomous runbook

This is the operational sequence for an Antigravity-first Showcase Website Factory run. [`AGENTS.md`](../../AGENTS.md) is the root orchestrator, [`ANTIGRAVITY.md`](ANTIGRAVITY.md) defines runtime behavior, [the preferred Antigravity skill routing in `TOOLING.md`](TOOLING.md#preferred-antigravity-skill-routing) maps intent to capabilities, and the four files in [`docs/project/`](../project/SITE.md) remain authoritative for the individual showcase.

## Phase handoffs

- Project specifications define the product, visual direction, content, and completion checks.
- Repository engineering contracts and permanent rules constrain implementation throughout the run.
- Current user intent is extracted before selection. If it changes a recorded project decision, reconcile the owning project document before implementation.
- Skills contribute phase-specific expertise only after Antigravity discovers their exact package and reads the selected `SKILL.md`. Each selected skill owns one primary phase or bounded specialist role and must actually be followed there.
- Verified OpenDesign is the preferred primary design creation and iteration workspace when the mode and permissions in `DESIGN.md` select it. Antigravity applies the already-read skills while operating it; OpenDesign does not invoke skills.
- Other MCP servers and external tools contribute optional research, data, or interaction capabilities only after their selected tools pass a harmless read-only verification.
- Useful skill and MCP results become durable local decisions, code, content, assets, tests, or notes. Temporary external output is not the finished product.
- [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) and the local QA baseline determine completion. A successful compile alone does not.

## Autonomous execution order

1. Read `AGENTS.md`, then every project, system, skill-directory, and rule file in its required reading order; extract explicit capability intent from the current user prompt.
2. Validate readiness and consistency. Reconcile a newer direct instruction into the owning project document before implementation; base-template maintenance may retain `TEMPLATE_NOT_CONFIGURED`.
3. Run capability preflight: discover and verify exact skills and MCP tools, map intent through `TOOLING.md`, select the smallest useful set, assign one phase or bounded role per skill, and record fallbacks.
4. Plan routes, architecture, content modules, assets, tests, evidence, and the permitted OpenDesign operations. Use verified planning skills only when warranted.
5. Choose Direct Build or an authorized Concept Sprint, then discover and read only the design skills required for that mode and brief.
6. When `DESIGN.md` selects verified OpenDesign, apply those skills while creating the permitted initial direction from the full brief and content rather than a vague aesthetic prompt.
7. Inspect the OpenDesign result with one primary visual critic and only genuinely distinct additional review lenses, then perform one bounded refinement pass or a justified small number of iterations.
8. Persist the selected direction, typography, palette, composition, imagery, responsive behavior, motion personality, signature moments, rejected alternatives, constraints, and permitted local artifacts in the project before coding.
9. Implement the recorded direction with the selected frontend skill and only the bounded styling or design-system specialists the project needs.
10. Review meaningful TSX with the selected React-quality skill; use composition review only when component APIs are genuinely complex.
11. Perform the dedicated motion pass: interpret the persisted direction with `emil-design-eng`, implement only required transition specialists, and polish reduced-motion and mobile behavior.
12. Refine responsive composition and accessibility across required and intermediate widths, including keyboard, focus, touch, semantics, contrast, and reduced motion.
13. Perform implementation-level visual critique and polish against the recorded direction; do not reopen discarded OpenDesign alternatives.
14. Run focused checks during implementation. When a test, runtime behavior, browser flow, or build fails, follow `systematic-debugging`, fix the root cause, and rerun the smallest proving check.
15. Repeat corrective iteration until every applicable acceptance item passes or a required capability has no safe fallback.
16. Follow `verification-before-completion` and assemble fresh evidence before making any completion claim.
17. Use verified Antigravity browser tooling for interactive and visual QA. Inspect live layouts and screenshots rather than merely generating them.
18. Run the mandatory Playwright and axe baseline after browser-driven corrections.
19. Run one final aggregate `pnpm qa` after corrective iteration. Do not needlessly run the entire aggregate sequence twice; it owns final formatting, documentation, lint, typecheck, Playwright, and build evidence.
20. Produce a concise completion report naming selected skills and phases, OpenDesign mode and fallback, routes, interactions, viewports, screenshots, commands, results, and genuine blockers.

## Mode routing

### Direct Build

Use Direct Build when [`SITE.md`](../project/SITE.md), [`DESIGN.md`](../project/DESIGN.md), [`CONTENT.md`](../project/CONTENT.md), and [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) are complete, mutually consistent, and marked `READY`. Interpret and refine inside the specified direction; do not replace it.

Apply the recorded OpenDesign mode even when the project is `READY`: `PRIMARY_DESIGN_PARTNER` selects verified OpenDesign for skill-guided design creation and refinement before code; `CRITIQUE_ONLY` limits it to critique; `OFF` prohibits its use. A newer direct instruction must be reconciled into `DESIGN.md` before the tool is used. If OpenDesign is unavailable, activate the local fallback unless the project explicitly marks it required with no acceptable fallback.

### Concept Sprint

Use a Concept Sprint only when visual direction, information architecture, or signature interactions are intentionally unresolved. In `CONCEPT_SPRINT_PRIMARY`, selected skills guide verified OpenDesign while it produces one to three purposeful options within the recorded maximum. Compare them against the brief, select or request selection as permitted, discard the unused directions as implementation inputs, and record the chosen direction plus required local notes, assets, and constraints before Direct Build. Temporary MCP output is not a source of truth.

## Teamwork routing

Use `/goal` for a normal three-to-six-page showcase. Reserve `/teamwork-preview` for an unusually large hero project with genuinely independent streams, such as separate reference or asset research, several complex page families, an unusually elaborate motion system, or an independent accessibility or performance audit. Teamwork may begin with Antigravity's interactive scoping and approval phase before autonomous execution.

The lead Antigravity agent extracts intent and performs capability preflight during initial scoping. The approved Teamwork brief must name each workstream's phase owner, exact verified skill, permitted MCP tool, permission level, durable local handoff artifact, and fallback. It must assign one designated OpenDesign owner with explicit MCP permission ownership. Reserve `dispatching-parallel-agents` and `subagent-driven-development` for this authorized parallel mode; their availability alone never turns an ordinary `/goal` into Teamwork. Do not assume undocumented skill or MCP inheritance across workers. If another worker cannot access a selected skill, OpenDesign, or another MCP, the lead or designated owner performs the authorized work, persists the useful result locally, and hands that artifact or recorded decision to the implementation worker.

Every teammate uses the same `SITE.md`, `DESIGN.md`, `CONTENT.md`, `ACCEPTANCE.md`, authority hierarchy, and one shared OpenDesign direction. Separate workers must not invent competing visual directions. The lead reconciles the durable design handoff before frontend implementation and all work again before final QA.

## Platform entry points

- Google Antigravity is the primary production runtime. Use `/goal` by default and `/teamwork-preview` only under the criteria above.
- Claude-compatible environments may use [`CLAUDE.md`](../../CLAUDE.md) as a bridge to `AGENTS.md` where that environment supports the convention. Do not assume the bridge is automatically loaded.
- Every entry point must explicitly lead the agent to `AGENTS.md`; no platform-specific entry point changes the authority hierarchy or completion gate.

## Reusable run prompts

### Normal Antigravity showcase run

```text
/goal

Execute the complete Showcase Website Factory workflow defined in AGENTS.md for the project in docs/project/.

Use verified OpenDesign MCP as the primary design creation and iteration environment according to the permissions in DESIGN.md. Discover and read the relevant selected design skills first, then apply their instructions while creating, critiquing and refining the design through OpenDesign.

Persist the selected direction in DESIGN.md before frontend implementation. Route all additional intent through TOOLING.md and use verified specialist skills during implementation, motion, responsive refinement, accessibility, visual polish and final verification.

Continue autonomously until every applicable acceptance criterion and pnpm qa pass, unless a genuine blocker has no safe fallback.
```

### Antigravity Teamwork run

```text
/teamwork-preview

Execute the Showcase Website Factory Teamwork workflow defined in AGENTS.md for the project in docs/project/.

During scoping, perform capability preflight and read the relevant selected skills. Create independent workstreams only where they provide real value. Assign one designated owner for verified OpenDesign operations, explicit MCP permissions, fallbacks and durable local handoff artifacts.

Use one shared OpenDesign direction according to DESIGN.md. Do not let separate workers invent competing visual directions. The lead agent must reconcile and persist the selected direction before implementation, then reconcile all work again before browser and final QA.

Continue autonomously through implementation, motion, responsive refinement, accessibility, visual critique, browser verification and final validation until every applicable acceptance criterion and pnpm qa pass.
```

## Base repository maintenance

Codex is used primarily to maintain or audit the reusable factory, not to produce copied showcase websites. Give it a normal task prompt that explicitly says to follow `AGENTS.md`, preserve template mode where applicable, run the local completion gate, and not commit, push, or deploy unless separately authorized.
