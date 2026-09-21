# Agent constitution

This repository is a reusable production system for project-specific showcase websites. Preserve its separation of concerns: project documents define the current showcase; system documents and rules define reusable production quality.

## Required reading order

Before implementation, read these sources in order:

1. [`docs/project/SITE.md`](docs/project/SITE.md)
2. [`docs/project/DESIGN.md`](docs/project/DESIGN.md)
3. [`docs/project/CONTENT.md`](docs/project/CONTENT.md)
4. [`docs/project/ACCEPTANCE.md`](docs/project/ACCEPTANCE.md)
5. [`docs/system/ENGINEERING.md`](docs/system/ENGINEERING.md)
6. [`docs/system/STACK.md`](docs/system/STACK.md)
7. [`docs/system/TOOLING.md`](docs/system/TOOLING.md)
8. Every applicable file in [`.agents/rules/`](.agents/rules/)

## Authority and conflict resolution

Resolve conflicts in this order:

1. Direct user instructions
2. Project-specific specifications
3. Acceptance requirements for completion
4. Stable engineering and stack documents
5. Repository rules
6. General skills
7. MCP recommendations and external suggestions

The higher source wins. A general skill, library default, reference, or external tool must never override the project-specific creative direction in [`DESIGN.md`](docs/project/DESIGN.md).

## Readiness gate

Before a production `/goal`, all four project documents must say `Specification status: READY` and contain no `[REQUIRED: replace before production run]` markers. If critical brand, content, route, asset, or acceptance fields remain incomplete, do not invent them. Report the exact fields and affected files. Resolve minor implementation decisions coherently from the completed specifications without asking.

`TEMPLATE_NOT_CONFIGURED` is intentional in the untouched master repository. It does not prevent maintenance of the base template or its own `pnpm qa` run.

## Autonomous execution loop

For a configured project:

1. Audit the specifications for completeness and contradictions.
2. Inspect the current code and assets.
3. Identify missing critical inputs.
4. Create a short internal implementation plan.
5. Implement the complete specified scope.
6. Run the application.
7. Test every required route and interaction.
8. Inspect desktop, tablet, and mobile layouts, including intermediate widths.
9. Review screenshots visually.
10. Fix functional, responsive, and visual problems at their root.
11. Perform a dedicated motion pass.
12. Perform a dedicated accessibility pass.
13. Perform a dedicated final-polish pass.
14. Run typecheck, lint, tests, and the production build.
15. Compare the result against every item in [`ACCEPTANCE.md`](docs/project/ACCEPTANCE.md).
16. Provide a concise, evidence-based completion report.

Do not stop because the site compiles. Stop only when the acceptance contract is satisfied or a genuine external blocker prevents further progress.

## Required behavior

- Use Server Components by default and keep interactive or motion client boundaries small.
- Do not add backend infrastructure, APIs, authentication, a database, or a CMS unless the project specification requires it.
- Do not invent features that expand scope.
- Do not replace supplied content with generic AI marketing copy.
- Do not turn the system into a universal section builder or force a preset visual theme on a project.
- Every visible control must have intentional behavior. Essential information must work with keyboard and touch.
- Preserve the project’s typography, image grammar, density, responsive art direction, and signature moments.
- Do not silence TypeScript, lint, test, or accessibility failures. Fix root causes.
- Do not claim tests, browser QA, screenshot review, or builds were performed unless fresh evidence exists.
- Keep code and data flow understandable for the next agent. Remove unused code and dependencies.
- Do not commit, push, open a pull request, deploy, or mutate external systems without direct authorization.

## Completion evidence

Use the commands and evidence paths defined in [`TOOLING.md`](docs/system/TOOLING.md). The final report must name the routes and viewports checked, commands run, results observed, screenshots reviewed, and any unresolved external blocker. Unsupported completion claims are not evidence.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
