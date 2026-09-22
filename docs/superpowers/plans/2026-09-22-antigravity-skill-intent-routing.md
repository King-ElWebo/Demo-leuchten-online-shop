# Antigravity Skill Intent Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the known Antigravity/Gemini skill profile into the factory's existing Markdown orchestration so natural-language intent selects the smallest verified phase-specific skill set.

**Architecture:** Keep `TOOLING.md` canonical for exact intent and skill routing. Let `AGENTS.md` enforce selection behavior, `ANTIGRAVITY.md` define runtime discovery, `RUNBOOK.md` define chronological handoffs, the bootstrap rule point into those documents, and `README.md` provide concise launch examples. Extend the existing documentation checker with only direct wiring assertions.

**Tech Stack:** Markdown, Node.js documentation checker, Prettier, ESLint, TypeScript, Playwright, Next.js build, pnpm.

**Spec:** Current user request in this task; authority remains `AGENTS.md` and the existing system documents.

## Global Constraints

- Do not install or vendor skills, configure credentials, add dependencies, redesign the template application, commit, push, deploy, or mutate external services.
- Preserve template mode and the existing authority hierarchy.
- Keep `docs/system/TOOLING.md` the only complete skill-routing inventory.
- External design-generation surfaces remain optional MCP capabilities, never skills.
- Prefer one primary skill per phase and one distinct critic where useful.

---

### Task 1: Define checker expectations first

**Files:**

- Modify: `scripts/check-docs.mjs`
- Test: `pnpm docs:check`

**Interfaces:**

- Consumes: the existing required-file, readiness-marker, and Markdown-link checks.
- Produces: lightweight assertions that the orchestrator, runbook, Antigravity contract, bootstrap rule, and README point to the new routing behavior.

- [x] **Step 1: Add minimal wiring assertions to the checker.**
- [x] **Step 2: Run `pnpm docs:check` and confirm it fails because the documents do not yet contain the required wiring.**

### Task 2: Make TOOLING.md canonical for skill intent routing

**Files:**

- Modify: `docs/system/TOOLING.md`

**Interfaces:**

- Consumes: the supplied inventory, current authority hierarchy, stack rules, and existing MCP policy.
- Produces: one exact skill-routing matrix, deterministic intent examples, phase ownership, conflicts, authority limits, and fallbacks.

- [x] **Step 1: Replace the partial preferred profile with the complete supplied inventory and exact ownership rules.**
- [x] **Step 2: Add deterministic natural-language intent mapping and motion signals without authorizing GSAP installation.**
- [x] **Step 3: Preserve external design tooling as a separately verified optional MCP capability.**

### Task 3: Wire routing into orchestration and runtime documents

**Files:**

- Modify: `AGENTS.md`
- Modify: `docs/system/ANTIGRAVITY.md`
- Modify: `docs/system/RUNBOOK.md`
- Modify: `.agents/rules/00-showcase-orchestration.md`

**Interfaces:**

- Consumes: canonical routing from `TOOLING.md`.
- Produces: prompt-intent extraction, durable project-spec reconciliation, verified phase assignment, runtime discovery rules, chronological handoffs, and concise bootstrap behavior.

- [x] **Step 1: Add concise mandatory intent extraction and phase-assignment rules to `AGENTS.md`.**
- [x] **Step 2: Add Antigravity discovery and Always-on guidance without copying the matrix.**
- [x] **Step 3: Update the runbook sequence and Teamwork handoffs.**
- [x] **Step 4: Strengthen the bootstrap with `@AGENTS.md`, intent extraction, and canonical routing.**

### Task 4: Add human-facing launch examples

**Files:**

- Modify: `README.md`

**Interfaces:**

- Consumes: the orchestration behavior and exact prompts supplied by the user.
- Produces: concise natural-language guidance plus normal scroll-animation and hero Teamwork launch examples.

- [x] **Step 1: Explain that users state outcomes rather than enumerate skills.**
- [x] **Step 2: Add the two exact intent-routing prompt examples.**

### Task 5: Verify the complete change

**Files:**

- Verify: all changed files and generated QA evidence.

**Interfaces:**

- Consumes: final repository state.
- Produces: fresh local evidence without commits or external mutation.

- [x] **Step 1: Run formatting and confirm `pnpm docs:check` is green.**
- [x] **Step 2: Run ESLint, TypeScript, Playwright, and the production build.**
- [x] **Step 3: Inspect generated screenshots and the final diff.**
- [x] **Step 4: Run one final aggregate `pnpm qa` after corrective iteration.**
- [x] **Step 5: Confirm no dependency, skill, credential, MCP, commit, push, deployment, or external-service change occurred.**
