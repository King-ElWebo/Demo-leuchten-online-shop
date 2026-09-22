# OpenDesign Primary Design Partner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconcile the factory so verified OpenDesign is the preferred primary design creation and iteration workspace when `DESIGN.md` authorizes it, while skills guide its use and durable local state remains authoritative.

**Architecture:** Keep exact capability, skill, MCP, permission, and fallback routing canonical in `docs/system/TOOLING.md`. Let `docs/project/DESIGN.md` own the project-scoped OpenDesign mode and permissions; let `AGENTS.md`, `RUNBOOK.md`, `ANTIGRAVITY.md`, the bootstrap rule, and `README.md` reference that contract without duplicating the full routing matrix.

**Tech Stack:** Markdown, Node.js documentation checker, Prettier, ESLint, TypeScript, Playwright, Next.js, pnpm.

**Spec:** Current user request in this task, with existing repository authority defined by `AGENTS.md`.

## Global Constraints

- Preserve the previous natural-language skill inventory and routing work.
- Do not install skills, connect MCP servers, add dependencies, create credentials, commit, push, deploy, or mutate external services.
- OpenDesign availability is verified only by a harmless read-only probe; project policy authorizes only its explicitly listed non-destructive operations.
- `DESIGN.md` is the durable source of truth; temporary OpenDesign artifacts never replace it.
- Keep the documentation checker small and template mode valid.

---

### Task 1: Define the corrected documentation contract test first

**Files:**

- Modify: `scripts/check-docs.mjs`
- Test: `pnpm docs:check`

**Interfaces:**

- Consumes: the existing required-document and local-link checks.
- Produces: small wiring assertions for the four OpenDesign modes, canonical skill-guided workflow, and primary launch prompt.

- [x] **Step 1: Add minimal phrase assertions for the corrected OpenDesign contract.**
- [x] **Step 2: Run `pnpm docs:check` and confirm the assertions fail against the stale documentation.**

### Task 2: Make DESIGN.md own complete project-scoped OpenDesign permissions

**Files:**

- Modify: `docs/project/DESIGN.md`

**Interfaces:**

- Consumes: the four required modes and non-destructive authorization model.
- Produces: explicit fields for creation, direction count, refinement, saving, local export, publication, deletion, required status, and durable output.

- [x] **Step 1: Replace obsolete modes with `OFF`, `CRITIQUE_ONLY`, `PRIMARY_DESIGN_PARTNER`, and `CONCEPT_SPRINT_PRIMARY`.**
- [x] **Step 2: Make `PRIMARY_DESIGN_PARTNER` the documented recommended portfolio default without forcing it.**

### Task 3: Reconcile canonical routing and execution order

**Files:**

- Modify: `docs/system/TOOLING.md`
- Modify: `AGENTS.md`
- Modify: `docs/system/RUNBOOK.md`
- Modify: `docs/system/ANTIGRAVITY.md`
- Modify: `.agents/rules/00-showcase-orchestration.md`

**Interfaces:**

- Consumes: existing exact skill inventory and intent router.
- Produces: skill-guided OpenDesign creation, bounded critique and refinement, durable handoff, motion routing, fallback, and Teamwork ownership.

- [x] **Step 1: Add the canonical skill-guided OpenDesign workflow and intent examples to `TOOLING.md`.**
- [x] **Step 2: Update orchestration, runtime, and chronological handoffs without duplicating the full matrix.**
- [x] **Step 3: Remove every blanket normal-Direct-Build `AVAILABLE_NOT_SELECTED` statement.**

### Task 4: Expose the proven workflow to users

**Files:**

- Modify: `README.md`
- Modify: `docs/system/RUNBOOK.md`

**Interfaces:**

- Consumes: project policy, canonical routing, and runtime workflow.
- Produces: updated `/goal` and `/teamwork-preview` prompts with one shared OpenDesign direction and durable handoffs.

- [x] **Step 1: Update the normal launch prompt to select verified OpenDesign according to `DESIGN.md`.**
- [x] **Step 2: Update Teamwork ownership and permission language.**

### Task 5: Verify the combined uncommitted change

**Files:**

- Verify: all current and previously changed documentation and generated QA evidence.

**Interfaces:**

- Consumes: the combined working-tree diff.
- Produces: fresh evidence without Git or external mutation.

- [x] **Step 1: Search for stale default-not-selected language and obsolete mode names.**
- [x] **Step 2: Run formatting, documentation, lint, typecheck, Playwright, and production build checks.**
- [x] **Step 3: Inspect all five screenshots and the final combined diff.**
- [x] **Step 4: Run one final aggregate `pnpm qa` after corrections.**
- [x] **Step 5: Confirm no dependency, skill, credential, MCP, commit, push, deployment, or external-service change occurred.**
