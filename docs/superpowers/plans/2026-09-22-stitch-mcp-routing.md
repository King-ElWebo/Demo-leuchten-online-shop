# Stitch MCP Routing Implementation Plan

> **Historical record after completion:** This plan records the repository maintenance that made Stitch the preferred optional visual-exploration MCP. Runtime authority remains [`AGENTS.md`](../../../AGENTS.md) and the current project and system documents.

**Goal:** Replace the retired design-MCP workflow with a lean, skill-guided Stitch workflow that improves fresh showcase exploration without becoming a dependency or a second source of truth.

**Architecture:** Keep `TOOLING.md` canonical for capability routing, `DESIGN.md` project-specific for Stitch intent, `concepts/` responsible for durable visual handoff records, and the existing Antigravity orchestrator, runbook, bootstrap rule, and README concise. Preserve all deterministic QA and template-mode behavior.

**Tech Stack:** Markdown, Node.js documentation checker, Prettier, ESLint, TypeScript, Playwright, Next.js, pnpm.

## Constraints

- Do not install or call Stitch, modify global Antigravity configuration, add credentials or paths, add dependencies, commit, push, deploy, or mutate external services.
- Preserve the exact skill inventory and select only the smallest relevant phase-specific set.
- Treat Stitch as preferred for qualifying fresh visual exploration, optional at runtime, and subordinate to the four project specifications.
- Keep the documentation checker small and allow the untouched `TEMPLATE_NOT_CONFIGURED` base repository to pass.

## Tasks

- [x] Update the lightweight documentation assertions first and confirm the stale documentation fails them.
- [x] Replace the retired design-MCP policy in `DESIGN.md`, `TOOLING.md`, `ANTIGRAVITY.md`, `RUNBOOK.md`, `AGENTS.md`, the bootstrap rule, and `README.md`.
- [x] Add Stitch identifiers, prompts, selection rationale, implementation deviations, responsive interpretation, and motion opportunities to the concepts handoff contract.
- [x] Remove the accidental project-local design-server configuration without adding a local Stitch server.
- [x] Remove obsolete terminology from historical routing records and the repository.
- [x] Format, run documentation checks, lint, typecheck, Playwright, build, and one final `pnpm qa`; inspect the final diff and search results.
