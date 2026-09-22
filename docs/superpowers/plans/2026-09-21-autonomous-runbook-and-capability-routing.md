# Autonomous Runbook and Capability Routing Implementation Plan

> **Historical record:** This plan records the repository improvement that introduced runtime capability routing and the autonomous runbook. It is not current runtime authority; follow [`AGENTS.md`](../../../AGENTS.md).

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing Showcase Website Factory a self-contained autonomous production system with precise authority, runtime capability discovery, explicit fallbacks, and one-prompt execution.

**Architecture:** Keep the existing Next.js application, project specifications, repository rules, and deterministic QA intact. Add one concise runbook, make `AGENTS.md` the definitive orchestrator, turn `TOOLING.md` into capability-routing guidance, and extend the existing small documentation checker only enough to protect the new contract.

**Tech Stack:** Markdown, Node.js documentation checker, pnpm, Prettier, ESLint, TypeScript, Playwright, axe, Next.js production build.

**Spec:** `docs/superpowers/specs/2026-09-21-showcase-website-factory-design.md`, extended by the approved 2026-09-21 autonomous capability-routing task brief.

## Global Constraints

- Improve the existing repository; do not replace its framework or redesign the template-status UI.
- Project specifications outrank repository contracts, rules, skills, MCP suggestions, and agent defaults within their owned domains.
- Optional skills and MCP servers must be detected at runtime and must have local fallbacks.
- Playwright, axe, ESLint, TypeScript, Prettier, documentation checks, and the production build remain the local deterministic baseline.
- Keep the documentation checker deliberately small; template markers must remain valid in the untouched base repository.
- Do not commit, push, deploy, or mutate external services.

---

### Task 1: Protect the runbook contract with the existing checker

**Files:**

- Modify: `scripts/check-docs.mjs`
- Create: `docs/system/RUNBOOK.md`
- Modify: `AGENTS.md`

**Interfaces:**

- Consumes: the existing required-file and Markdown-link checks.
- Produces: a failure when the runbook is missing or not referenced by the root orchestrator, while preserving template-status behavior.

- [x] **Step 1: Extend the checker before creating the runbook**

  Add `docs/system/RUNBOOK.md` to `requiredFiles` and add one direct check that `AGENTS.md` contains `docs/system/RUNBOOK.md`.

- [x] **Step 2: Verify the new contract fails for the intended reasons**

  Run `pnpm docs:check` and confirm it reports the missing runbook and missing `AGENTS.md` reference while continuing to accept all four `TEMPLATE_NOT_CONFIGURED` project documents.

- [x] **Step 3: Add the minimal runbook and orchestrator reference**

  Create the operational runbook with the required 15-phase order, mode routing, phase handoffs, platform entry points, and exact reusable prompts. Rewrite `AGENTS.md` around the required reading order, authority hierarchy, preflight, autonomous loop, fallbacks, restrictions, and completion gate.

- [x] **Step 4: Verify the checker returns green**

  Run `pnpm docs:check` and confirm all required files, readiness markers, and internal links pass.

### Task 2: Make capability routing and terminology authoritative

**Files:**

- Modify: `docs/system/TOOLING.md`
- Modify: `docs/system/ENGINEERING.md`
- Modify: `docs/project/SITE.md`
- Modify: `docs/project/DESIGN.md`
- Modify: `docs/project/CONTENT.md`
- Modify: `docs/project/ACCEPTANCE.md`
- Modify: `.agents/skills/README.md`

**Interfaces:**

- Consumes: the exact authority and domain-ownership requirements from the task brief.
- Produces: one consistent vocabulary, skill-routing matrix, MCP-routing matrix, local baseline, discovery rules, and fallback behavior.

- [x] **Step 1: Rewrite `TOOLING.md` as runtime routing guidance**

  Document purpose, phase, use, non-use, authority limit, fallback, and discovery for every required logical skill capability. Separately document phase, permission, durable local output, and fallback for each required MCP capability.

- [x] **Step 2: Align specifications and engineering language**

  State domain ownership in the four project documents and state explicitly that `ACCEPTANCE.md` verifies completion without expanding or contradicting scope.

- [x] **Step 3: Clarify repository-owned and discovered skills**

  Update `.agents/skills/README.md` so local skills are generic repository-owned packages and globally or plugin-provided skills are never assumed installed.

### Task 3: Expose the one-prompt workflow and classify history

**Files:**

- Modify: `README.md`
- Create: `docs/superpowers/README.md`
- Modify: `docs/superpowers/specs/2026-09-21-showcase-website-factory-design.md`
- Modify: `docs/superpowers/plans/2026-09-21-showcase-website-factory.md`

**Interfaces:**

- Consumes: the runbook prompts and runtime mode definitions.
- Produces: a clear human entry point for Antigravity, Teamwork, Codex, Claude-compatible environments, and historical planning records.

- [x] **Step 1: Update the root README**

  Link the runbook, define the five system concepts, expose all three exact prompts, explain Direct Build versus Concept Sprint, and reserve Teamwork for independent workstreams.

- [x] **Step 2: Mark planning records as historical**

  Add a short `docs/superpowers/README.md` and a historical notice to the existing design and plan so they cannot be mistaken for runtime authority.

### Task 4: Format and verify the complete repository contract

**Files:**

- Inspect: all changed files and the generated QA evidence.

**Interfaces:**

- Consumes: the completed documentation and checker changes.
- Produces: fresh evidence for every required local gate and a contradiction-free diff.

- [x] **Step 1: Format the repository**

  Run `pnpm format`.

- [x] **Step 2: Run each required gate independently**

  Run `pnpm docs:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test:e2e`, and `pnpm build` and fix root causes of any failures.

- [x] **Step 3: Inspect browser evidence**

  Inspect the generated desktop and mobile screenshots and confirm the template-status UI has no visible regression.

- [x] **Step 4: Run the aggregate gate**

  Run `pnpm qa` and require a clean exit.

- [x] **Step 5: Audit the final diff**

  Run `git diff --check`, inspect changed files for conflicting authority or broken links, preserve the pre-existing generated `next-env.d.ts` change, and confirm no commit, push, deployment, or external mutation occurred.
