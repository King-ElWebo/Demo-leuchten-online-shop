# Showcase Website Factory

A lean production master for distinctive, high-end portfolio and showcase websites. Google Antigravity is the primary showcase-production runtime; Codex is used primarily to maintain and audit this reusable base. Copy it, complete four project specifications, add approved assets, and start one short Antigravity prompt. The agent then plans, implements, inspects, refines, tests, and validates the website against an explicit completion contract.

> **Reuse infrastructure and behavior. Recreate visual identity per project.**

The factory standardizes orchestration, engineering quality, responsive and accessibility review, motion discipline, browser verification, and evidence. It deliberately does not standardize hero layouts, page compositions, brand colors, typography, section designs, visual motifs, or project-specific choreography.

## System model

```mermaid
flowchart TD
    P[Project specifications<br/>SITE · DESIGN · CONTENT · ACCEPTANCE]
    A[Orchestrator<br/>AGENTS.md]
    R[Contracts and permanent rules<br/>ENGINEERING · STACK · .agents/rules]
    C[Discovered capabilities<br/>skills · optional MCP tools]
    I[Durable local implementation<br/>Next.js · content · assets · tests]
    Q[Deterministic baseline<br/>Prettier · docs · ESLint · TypeScript · Playwright + axe · build]

    P --> A
    R --> A
    C --> A
    A --> I
    I --> Q
    Q --> A
    Q --> P
```

[`AGENTS.md`](AGENTS.md) is the definitive orchestrator. [`ANTIGRAVITY.md`](docs/system/ANTIGRAVITY.md) defines the primary runtime contract. [`RUNBOOK.md`](docs/system/RUNBOOK.md) defines the autonomous phase order. [`TOOLING.md`](docs/system/TOOLING.md) routes capabilities and fallbacks.

Static Next.js showcases target Cloudflare Pages by default. [`CLOUDFLARE.md`](docs/system/CLOUDFLARE.md) defines the export, responsive-image, local-preview, hosting-exception, and publication contracts. It does not constrain a project's visual identity.

## Precise terminology

- **Project specifications** are [`SITE.md`](docs/project/SITE.md), [`DESIGN.md`](docs/project/DESIGN.md), [`CONTENT.md`](docs/project/CONTENT.md), and [`ACCEPTANCE.md`](docs/project/ACCEPTANCE.md). They define one showcase.
- **Repository rules** in [`.agents/rules/`](.agents/rules/code-quality.md) are permanent constraints. They apply throughout a run and are not optional skills.
- **Skills** are instruction packages discovered and read in the current agent environment. They provide methods and expertise, not external access.
- **MCP servers and external tools** are optional runtime capabilities for external data, applications, or interaction. They are not skills, npm packages, or final-site dependencies.
- **Local tooling** is the repository-owned deterministic QA baseline and remains available without optional MCP access.

Authority is resolved in this order: direct user instructions; the relevant project specification; repository engineering and stack contracts; repository rules; applicable skills; MCP or external recommendations; general agent defaults. Domain ownership is strict: `SITE.md` owns scope and behavior, `DESIGN.md` owns visual and motion direction, `CONTENT.md` owns copy and content, and `ACCEPTANCE.md` owns completion checks without adding scope.

## Source of truth

| Decision                                                                           | Authoritative source                                                  |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Scope, routes, sections, behavior, and non-goals                                   | [`SITE.md`](docs/project/SITE.md)                                     |
| Visual identity, typography, layout, imagery, responsive art direction, and motion | [`DESIGN.md`](docs/project/DESIGN.md)                                 |
| Approved copy, products, projects, content data, and media assignments             | [`CONTENT.md`](docs/project/CONTENT.md)                               |
| Completion and verification, without product-scope expansion                       | [`ACCEPTANCE.md`](docs/project/ACCEPTANCE.md)                         |
| Architecture, data flow, accessibility, performance, and code quality              | [`ENGINEERING.md`](docs/system/ENGINEERING.md)                        |
| Default, opt-in, and excluded technology                                           | [`STACK.md`](docs/system/STACK.md) and [`package.json`](package.json) |
| Antigravity runtime, discovery, configuration boundaries, and readiness audit      | [`ANTIGRAVITY.md`](docs/system/ANTIGRAVITY.md)                        |
| Skill discovery, MCP routing, fallbacks, commands, and evidence                    | [`TOOLING.md`](docs/system/TOOLING.md)                                |
| Autonomous phase order, execution modes, entry points, and launch prompts          | [`RUNBOOK.md`](docs/system/RUNBOOK.md)                                |
| Static Cloudflare Pages export, media, preview, and publication checks             | [`CLOUDFLARE.md`](docs/system/CLOUDFLARE.md)                          |
| Reading order, authority hierarchy, preflight, restrictions, and completion gate   | [`AGENTS.md`](AGENTS.md)                                              |
| Permanent concise constraints                                                      | [`.agents/rules/`](.agents/rules/code-quality.md)                     |
| QA output                                                                          | Local command output and [`artifacts/qa/`](artifacts/qa/README.md)    |

Files under [`docs/superpowers/`](docs/superpowers/README.md) are implementation history, not current authority and not mandatory runtime reading.

## Start a new showcase

1. Copy this repository without generated folders such as `node_modules`, `.next`, or generated `artifacts/qa` output. Do not create an extra nested app directory.
2. Run `pnpm install --frozen-lockfile` and, if needed, `pnpm exec playwright install chromium`.
3. Complete these files in order:
   1. [`SITE.md`](docs/project/SITE.md)
   2. [`DESIGN.md`](docs/project/DESIGN.md)
   3. [`CONTENT.md`](docs/project/CONTENT.md)
   4. [`ACCEPTANCE.md`](docs/project/ACCEPTANCE.md)
4. Remove every `[REQUIRED: replace before production run]` marker and set all four specifications to `READY`.
5. Add stable production media under [`public/media/`](public/media/README.md), reference notes under [`references/`](references/README.md), and only deliberately bounded concept work under [`concepts/`](concepts/README.md).
6. Start the normal Antigravity `/goal` prompt below. The workspace bootstrap rule leads Antigravity to `AGENTS.md`; the agent performs capability preflight, uses the smallest useful verified capability set in its assigned phases, and continues through `pnpm qa`.

The copied project's default `pnpm build` creates a static `out/` directory and local responsive image variants for Cloudflare Pages. If its `SITE.md` requires a real server, form receiver, authentication, or request-time rendering, make an explicit hosting decision first; do not mask that requirement with a simulated feature.

`TEMPLATE_NOT_CONFIGURED` is intentional in the untouched factory and does not fail the base repository's QA. A configured production project may not retain required markers.

## Direct Build and Concept Sprint

Use **Direct Build** when all four project specifications are complete, consistent, and `READY`. For a fresh showcase whose Stitch policy permits exploration, verified Stitch normally produces two meaningful visual directions before implementation. For an already approved and sufficiently specified design, Direct Build proceeds without unnecessary concept generation. The agent may interpret and refine inside the specified brief but must not expand product scope.

Use **Concept Sprint** only when visual direction, information architecture, or signature interactions are intentionally unresolved. Selected design skills guide verified Stitch toward two purposeful directions, or three for an especially important unresolved project. The chosen decisions must become durable local updates before Direct Build; unused directions do not become competing implementation sources.

## Natural-language capability intent

Users normally describe the desired outcome rather than list every skill. The agent extracts that intent, discovers and verifies exact capabilities, selects the smallest useful set, reads each selected `SKILL.md`, and applies those instructions while using Stitch only when the routing rules call for visual exploration. Skills provide methods and judgment; Stitch provides an external visual-generation surface. Discovery alone is never reported as skill use. If Stitch is unavailable, the fallback in [`TOOLING.md`](docs/system/TOOLING.md#preferred-antigravity-skill-routing) continues locally without blocking the run.

The generic launch prompts remain in [`RUNBOOK.md`](docs/system/RUNBOOK.md). These examples show how natural-language intent can guide routing without turning the launch prompt into a skill manifest.

### Normal fresh showcase

```text
/goal

Execute the complete Showcase Website Factory workflow defined in AGENTS.md for the project in docs/project/.

Use verified Stitch MCP when the routing rules require visual exploration and DESIGN.md permits it. Discover and read the smallest relevant design-skill set first, establish a short design hypothesis, then apply those instructions while creating two meaningful visual directions for a fresh showcase.

Evaluate and select or synthesize one coherent direction, then persist it in DESIGN.md and the concepts handoff before frontend implementation. Route all additional intent through TOOLING.md and use verified specialist skills during implementation, motion, responsive refinement, accessibility, visual polish and final verification.

Continue autonomously until every applicable acceptance criterion and pnpm qa pass, unless a genuine blocker has no safe fallback.
```

### Hero Teamwork showcase

```text
/teamwork-preview

Execute the Showcase Website Factory Teamwork workflow defined in AGENTS.md for the project in docs/project/.

Project intent: create a hero portfolio piece with an editorial visual direction, advanced but purposeful scroll choreography, refined responsive transformations and an independent final quality review.

During scoping, perform capability preflight and read the relevant selected skills. Create independent workstreams only where useful. One design-focused workstream may use verified Stitch; assign one designated owner, explicit MCP permissions, fallbacks and durable local handoff artifacts.

Converge generated directions into one coherent visual system according to DESIGN.md. Do not let separate workers carry competing visual directions into implementation. Reconcile and persist the selected direction through the lead before implementation, then reconcile all work again before browser and final QA.

Continue until every applicable acceptance criterion and pnpm qa pass.
```

## Base repository maintenance

Codex is used to maintain or audit the reusable factory, not normally to produce copied showcase websites. A Codex maintenance prompt should explicitly require following `AGENTS.md`, preserving template-mode behavior where applicable, running the local completion gate, and avoiding commits, pushes, or deployments unless separately authorized. Claude-compatible environments may use [`CLAUDE.md`](CLAUDE.md) as a bridge where that convention is supported; do not assume automatic loading. Every entry point must ultimately instruct the agent to follow `AGENTS.md`.

## When Teamwork is appropriate

Use `/goal` for a normal three-to-six-page showcase. Reserve `/teamwork-preview` for an unusually large hero project with genuinely independent workstreams such as separate reference and asset research, several complex page families, unusually elaborate motion, or an independent accessibility or performance audit. Antigravity Teamwork may begin with interactive scoping and approval before autonomous execution.

The lead performs capability preflight during scoping. The approved brief assigns each stream a phase, skill, MCP permission, local artifact, and fallback; it must not assume every worker inherits every capability. Every teammate shares the same project specifications, authority hierarchy, and design direction. Reconcile all work through the lead agent before final QA; teammates must not invent competing visual directions independently.

When the project owner wants autonomous Stitch use without repeated MCP approval prompts, Antigravity may be granted the narrow one-time project permission `mcp(stitch/*)`. Do not grant `mcp(*)`, add a duplicate project-local Stitch server, or modify global configuration on the user's behalf.

## Assets and references

- Store final production media locally under [`public/media/`](public/media/README.md) and record assignment, source, rights, alt text, focal point, and responsive crop in `CONTENT.md`.
- Store references and their decision notes under [`references/`](references/README.md). References are inspiration, not production assets to copy.
- Use search or generation only when the project specifications permit it. Do not leave a finished site dependent on temporary MCP output URLs.
- Keep rejected or exploratory directions under [`concepts/`](concepts/README.md) only while they remain useful.

## Development and deterministic QA

```bash
pnpm dev
pnpm qa
```

Focused commands:

```bash
pnpm format:check
pnpm docs:check
pnpm lint
pnpm typecheck
pnpm test:e2e
pnpm test:e2e:ui
pnpm build
pnpm test:static # after pnpm build; checks out/ through wrangler pages dev out
```

Playwright plus axe is mandatory deterministic baseline QA, not merely an MCP fallback. It uses an isolated local server on port 3100, reads routes from [`tests/e2e/routes.ts`](tests/e2e/routes.ts), checks browser/runtime health, overflow, and serious or critical axe findings, and records screenshots at 320×568, 390×844, 768×1024, 1440×1000, and 1920×1080. Axe does not replace keyboard, focus, contrast, touch, or interaction reasoning. Verified Antigravity browser tooling is the preferred additional interactive and visual layer; documented manual inspection is the final fallback.

Generated evidence is described in [`artifacts/qa/README.md`](artifacts/qa/README.md). Screenshot generation alone is not visual review.

## Cloudflare Pages handoff

For a concrete **static** demo, choose the “Next.js (Static HTML Export)” Pages preset, use build command `pnpm build`, and set output directory `out`. Read its own [`package.json`](package.json) for the compatible Node range (`engines.node`) and exact pnpm version (`packageManager`); set Pages' `NODE_VERSION` and `PNPM_VERSION` only if its defaults differ. Before publishing a fictional demo, verify the concept label, image/font rights, truthful operator details, non-misleading demo forms, and the live preview. The [full concise checklist](docs/system/CLOUDFLARE.md#pages-settings-when-publishing-a-specific-demo) is the handoff; this repository never deploys automatically.

## Maintain the master template

Move an improvement back into the master only when it improves reusable infrastructure or behavior without importing a project's visible identity. Good candidates include a clearer acceptance check, safer accessibility behavior, a leaner test, or a current framework convention. Do not backport a hero, section composition, palette, type pairing, motion signature, copy model, or one-project dependency.

Keep the master small enough to understand in a short review. Do not add a component generator, custom CLI, schema-driven page builder, universal section registry, plugin framework, custom design DSL, CMS/database abstraction, large token framework, or preset theme.

## Upgrade dependencies safely

1. Check current official release, migration, peer-compatibility, and security notes.
2. Update exact versions in [`package.json`](package.json); avoid ranges.
3. Run `pnpm install` and review lockfile and configuration changes.
4. Run `pnpm qa` and inspect browser screenshots.
5. Update [`STACK.md`](docs/system/STACK.md) only when roles, constraints, or important conventions changed.

Do not assume a previous Next.js, React, Tailwind, ESLint, TypeScript, Motion, or Playwright convention remains current.
