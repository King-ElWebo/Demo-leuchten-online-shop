# Tooling and autonomous workflow

This document routes skills, optional external capabilities, autonomous modes, and verification. It never grants permission to mutate an external system. [`AGENTS.md`](../../AGENTS.md) remains the workflow constitution, [`DESIGN.md`](../project/DESIGN.md) remains the visual authority, and [`ACCEPTANCE.md`](../project/ACCEPTANCE.md) remains the completion contract.

## Skill registry

Skills are environment capabilities, not repository dependencies. The template does not vendor third-party skill content. Re-check availability, location, instructions, permissions, and licensing in every copied environment.

| Skill name or preferred equivalent                               | Capability                                                            | Location                   | Availability status    | Invocation phase                          | Required inputs                                  | Expected outputs                      | Conflicts                                | Fallback                             |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------- | ---------------------- | ----------------------------------------- | ------------------------------------------------ | ------------------------------------- | ---------------------------------------- | ------------------------------------ |
| UI/UX design / `design`                                          | Information architecture and interaction design                       | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | Specification review                      | `SITE.md`, `CONTENT.md`                          | Clear hierarchy and interaction model | Must not override `DESIGN.md`            | Apply project documents directly     |
| UI/UX Pro Max / `ui-ux-pro-max`                                  | Broad UI/UX pattern support                                           | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | Early architecture or critique            | Complete project specs                           | Relevant pattern guidance             | Avoid generic visual defaults            | Manual design review                 |
| Creative Direction / `brand` or `frontend-design`                | Develop or interpret a distinct visual thesis                         | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | Creative interpretation or Concept Sprint | Brand premise and references                     | Coherent direction candidates         | Project `DESIGN.md` wins                 | User-led direction in `DESIGN.md`    |
| Emil Kowalski-style motion / `emil-design-eng`                   | Interaction feel, timing, and polish                                  | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | Motion pass                               | Working interaction and motion personality       | Refined timing and behavior           | Must not invent the brand                | Motion rule plus browser review      |
| Impeccable or equivalent / `design-review`, `transitions-polish` | Final visual and interaction refinement                               | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | After coherent implementation             | Running site and screenshots                     | Prioritized polish findings           | Not an early layout generator            | Manual visual-cohesion pass          |
| Next.js / `vercel:nextjs`                                        | Current App Router architecture and conventions                       | Plugin/global if present   | VERIFY_PER_ENVIRONMENT | Architecture and implementation           | Routes and current version                       | Version-appropriate implementation    | Project scope still controls features    | Official Next.js docs                |
| React quality / `vercel:react-best-practices`                    | Component and rendering review                                        | Plugin/global if present   | VERIFY_PER_ENVIRONMENT | Implementation review                     | TSX code and data flow                           | Focused React findings                | Avoid premature abstraction              | `ENGINEERING.md` review              |
| Responsive design / `ui-ux-audit` equivalent                     | Cross-width layout critique                                           | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | Responsive pass                           | Required viewports and screenshots               | Breakpoint and composition fixes      | Mobile art direction in `DESIGN.md` wins | Manual viewport review               |
| Accessibility / `web-accessibility`                              | Semantic, keyboard, contrast, and motion review                       | Global/plugin if present   | VERIFY_PER_ENVIRONMENT | Accessibility pass                        | Running site and content meaning                 | Actionable accessibility findings     | Automated scan is not sufficient alone   | Native semantics plus Playwright/axe |
| Browser QA / `playwright-cli`                                    | Live route, interaction, console, screenshot, and viewport inspection | Global/local if present    | VERIFY_PER_ENVIRONMENT | Browser QA                                | Running app and route list                       | Reproducible browser evidence         | Cannot replace implementation            | Project Playwright suite             |
| GSAP skill suite                                                 | GSAP implementation and performance guidance                          | Global/plugin if present   | ONLY_IF_GSAP_SELECTED  | Advanced motion pass                      | Approved complex choreography                    | Focused GSAP code and QA              | Do not add GSAP for simple transitions   | CSS or Motion for React              |
| Asset curation / `imagegen` or approved search                   | Source or generate missing visual material                            | Built-in/plugin if present | ONLY_IF_ASSETS_MISSING | Asset preparation                         | Image direction, rights constraints, assignments | Stable local assets plus metadata     | Never copy protected references          | User-supplied/local licensed assets  |

When a skill is selected, read its current instructions. Do not assume the names or availability above remain unchanged.

## Skill routing

Use the smallest useful set for each phase:

1. Specification review
2. Architecture pass
3. Creative interpretation
4. Core implementation
5. Motion pass
6. Responsive pass
7. Accessibility pass
8. Visual critique and refinement
9. Browser QA
10. Final engineering validation

UI/UX skills support information architecture and interaction design. Creative-direction tools help form a unique thesis. The project [`DESIGN.md`](../project/DESIGN.md) always remains the visual authority. Motion skills improve behavior and timing without inventing the brand. Refinement skills are most useful after a coherent implementation exists. QA skills verify; they do not replace implementation. Do not activate every skill simultaneously.

## Optional MCP and external capability registry

No MCP server is installed by this repository. Discover current capabilities at run time and use a local fallback when optional access is absent.

| Capability                           | Default use                                                                                              | Permission and routing rule                                                      | Fallback                                             |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Browser automation                   | Route verification, interactions, console inspection, responsive checks, screenshots, visual QA          | Read and interact with the local site; save evidence locally                     | Project Playwright suite and manual browser          |
| Open Design or equivalent design MCP | Reference analysis, early creative direction, limited concept exploration                                | Optional; never a runtime dependency or silent override of `DESIGN.md`           | Local references and design skill                    |
| GitHub                               | Inspect reference repositories, compare changes, or perform explicitly requested version-control/PR work | Read-only by default; never push, open a PR, or mutate without authorization     | Local Git and downloaded approved reference material |
| Vercel                               | Requested preview/production deployment, deployment inspection, build/runtime logs                       | Use only on explicit deployment request                                          | Local production build and logs                      |
| Figma                                | Inspect a real supplied Figma source                                                                     | Use only when an actual source exists and access is authorized                   | Exported assets and written specifications           |
| Image search or generation           | Prepare assets when suitable visuals are missing                                                         | Confirm rights and stable assignments; move final approved assets to local paths | User-supplied or licensed local assets               |
| Documentation provider               | Resolve current, version-sensitive API behavior                                                          | Prefer primary official documentation                                            | Installed package types and local docs               |

### MCP principles

- MCP servers are optional production tools, never website runtime dependencies.
- Prefer existing local or built-in capabilities before adding an external integration.
- Use granular permissions and read-only access where sufficient.
- External mutations require explicit authorization.
- Record durable decisions, assets, and findings in local specifications.
- Every optional capability needs a fallback.
- Failure of an optional capability does not automatically block the project.

## Autonomous modes

### Direct Build

Use when `SITE.md`, `DESIGN.md`, `CONTENT.md`, and `ACCEPTANCE.md` are complete, set to `READY`, mutually consistent, and visually locked. Implement the full scope through the [`AGENTS.md`](../../AGENTS.md) loop and stop only at acceptance or a genuine external blocker.

### Concept Sprint

Use when visual direction remains uncertain. Create only two or three limited directions, each containing:

- hero
- navigation
- one representative content section
- one product/project treatment
- rough motion concept

A Concept Sprint does not silently become a full website. After selection, transfer decisions into [`DESIGN.md`](../project/DESIGN.md), discard accidental prototype dependencies, set the project documents to `READY`, and start Direct Build.

## Reusable production `/goal`

```text
/goal

Build and complete the showcase website defined by AGENTS.md and the
documents in docs/project.

Follow the stable engineering and tooling contracts in docs/system.
Work autonomously through specification review, implementation, browser
verification, responsive QA, accessibility checks, motion refinement,
visual polishing and final validation.

Treat docs/project/ACCEPTANCE.md as the completion contract. Do not stop
when the site merely compiles. Inspect all required routes and viewports,
test the documented interactions, resolve browser and console errors,
and run typecheck, lint, browser tests and the production build.

Use only the skills and MCP tools relevant to the current phase. The
project-specific DESIGN.md remains the visual authority.

Continue iterating until the acceptance criteria are satisfied or a
genuine external blocker prevents completion. End with a concise,
evidence-based completion report.
```

## When Teamwork is justified

Normal 3–6 page showcases default to `/goal`. Use `/teamwork-preview` only when independent workstreams genuinely benefit from parallel ownership, such as:

- extensive independent asset research
- advanced 3D or complex motion
- an unusually large route count
- an important hero portfolio piece needing separate deep exploration
- separate, substantial QA workstreams

Parallel work must still converge through the same project documents and acceptance contract.

## Local commands and evidence

| Command            | Purpose                                                                           |
| ------------------ | --------------------------------------------------------------------------------- |
| `pnpm dev`         | Run the local Next.js development server.                                         |
| `pnpm lint`        | Run ESLint directly.                                                              |
| `pnpm typecheck`   | Run strict TypeScript checks without output.                                      |
| `pnpm docs:check`  | Check required documentation, local links, and template/ready status consistency. |
| `pnpm test:e2e`    | Run mobile, desktop, accessibility, console, overflow, and screenshot checks.     |
| `pnpm test:e2e:ui` | Open Playwright’s local UI for focused debugging.                                 |
| `pnpm build`       | Create the production build.                                                      |
| `pnpm qa`          | Run the complete local validation sequence.                                       |

Generated Playwright reports, test results, and screenshots live under [`artifacts/qa/`](../../artifacts/qa/README.md) and are ignored except for the explanatory README. Update `tests/e2e/routes.ts` whenever public routes change.
