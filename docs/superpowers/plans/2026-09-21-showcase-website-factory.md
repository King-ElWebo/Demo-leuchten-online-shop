# Showcase Website Factory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and verify a lean production master repository for autonomous, visually distinctive showcase websites.

**Architecture:** Project documents own replaceable showcase decisions, system documents and short rules own reusable quality constraints, and `AGENTS.md` orchestrates the workflow. A neutral Next.js App Router application and a small Playwright suite prove the template remains runnable and testable without imposing a visual identity.

**Tech Stack:** Next.js 16 App Router, React, strict TypeScript, Tailwind CSS, Motion for React, ESLint, Prettier, Playwright, axe-core, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-21-showcase-website-factory-design.md`

## Global Constraints

- Pin every package to an exact current compatible stable version.
- Use pnpm and scaffold directly in the current directory.
- Do not add backend infrastructure, a CMS, a database, authentication, global state, or a universal section framework.
- Keep the base interface neutral and removable.
- Treat `TEMPLATE_NOT_CONFIGURED` and required project placeholders as intentional in the untouched master template.
- Do not commit, push, deploy, or create external resources.
- Verify every completion claim with fresh command or browser evidence.

---

### Task 1: Project toolchain and executable contract

**Files:**

- Create: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`
- Create: `postcss.config.mjs`, `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`, `.gitignore`
- Create: `tests/e2e/routes.ts`, `tests/e2e/template.spec.ts`, `playwright.config.ts`

**Interfaces:**

- Produces the package scripts, TypeScript alias, Next.js configuration, route registry, and browser-test contract used by all later tasks.

- [x] Query the package registry and record exact stable versions.
- [x] Add a failing Playwright specification that expects the root template status page, semantic landmarks, no horizontal overflow, no browser errors, and no serious axe violations.
- [x] Run the specification and confirm it fails because the application does not yet exist.
- [x] Add the minimum pinned configuration required to install, lint, typecheck, build, and run Playwright.
- [x] Install dependencies with pnpm and retain the generated lockfile.

### Task 2: Neutral application shell

**Files:**

- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/data/README.md`, `src/components/project/README.md`, `src/components/ui/README.md`
- Create: `src/lib/motion/README.md`, `src/styles/README.md`, `public/media/README.md`

**Interfaces:**

- Consumes the root-route expectations from `tests/e2e/template.spec.ts`.
- Produces a semantic, metadata-bearing, server-rendered status screen and documented extension points.

- [x] Implement the minimum semantic status screen required by the failing test.
- [x] Add a minimal reset, visible focus styling, responsive type behavior, and reduced-motion safeguards without creating a brand theme.
- [x] Run the focused Playwright specification and confirm it passes.
- [x] Keep extension-point README files short and purpose-specific.

### Task 3: Agent constitution and project specification templates

**Files:**

- Create: `AGENTS.md`
- Create: `docs/project/SITE.md`, `docs/project/DESIGN.md`, `docs/project/CONTENT.md`, `docs/project/ACCEPTANCE.md`

**Interfaces:**

- Produces the required reading order, authority hierarchy, autonomous execution loop, configurable showcase inputs, and testable completion contract.

- [x] Write the root constitution with the exact orchestration, stopping, honesty, and scope rules.
- [x] Write `SITE.md` with explicit required markers and `Specification status: TEMPLATE_NOT_CONFIGURED`.
- [x] Write purely project-specific creative-direction fields in `DESIGN.md`, including two required signature moments and the specified anti-patterns.
- [x] Write `CONTENT.md` as the single content authority without Lorem Ipsum.
- [x] Write an objective checkbox-based `ACCEPTANCE.md` that distinguishes a configured production run from the untouched base-template QA.

### Task 4: Stable system contracts and concise repository rules

**Files:**

- Create: `docs/system/ENGINEERING.md`, `docs/system/STACK.md`, `docs/system/TOOLING.md`
- Create: `.agents/rules/code-quality.md`, `.agents/rules/design-quality.md`
- Create: `.agents/rules/responsive-accessibility.md`, `.agents/rules/motion-quality.md`, `.agents/rules/qa-completion.md`
- Create: `.agents/skills/README.md`

**Interfaces:**

- Consumes project authority from `AGENTS.md`.
- Produces reusable architecture, dependency, skill/MCP routing, and non-negotiable quality rules.

- [x] Document stable application architecture, data flow, component boundaries, TypeScript, styling, accessibility, performance, states, and clean-code expectations.
- [x] Document default, opt-in, and excluded dependencies with decision rules and current-version notes.
- [x] Add a truthful skill and MCP registry template, routing sequence, Direct Build and Concept Sprint modes, reusable `/goal`, and Teamwork criteria.
- [x] Keep rule files short and link them to authoritative documents rather than repeating full guidance.

### Task 5: Human workflow, references, concepts, and QA evidence locations

**Files:**

- Create: `README.md`, `references/README.md`, `concepts/README.md`
- Create: `artifacts/qa/README.md`, `scripts/check-docs.mjs`

**Interfaces:**

- Produces the human entry point, source-of-truth table, responsibility matrix, Mermaid workflow, asset guidance, and small documentation integrity check.

- [x] Write the root README around the principle “Reuse infrastructure and behavior. Recreate visual identity per project.”
- [x] Cross-link the repository documentation and explain copying, configuration, Direct Build, Concept Sprint, QA, maintenance, and safe upgrades.
- [x] Document reference and asset metadata, licensing, focal points, mobile crops, and concept lifecycle.
- [x] Add a small documentation checker for required files, relative Markdown links, and intentional template-status markers.
- [x] Add `docs:check` to the QA sequence without treating project placeholders as base-template failures.

### Task 6: Browser coverage and final validation

**Files:**

- Modify: `tests/e2e/template.spec.ts`, `playwright.config.ts`, `.gitignore`
- Generate but ignore: `artifacts/qa/screenshots/`, `artifacts/qa/playwright-report/`, `artifacts/qa/test-results/`

**Interfaces:**

- Consumes the route registry and running application.
- Produces automated route, interaction, console, overflow, accessibility, and viewport screenshot evidence.

- [x] Configure mobile and desktop Playwright projects plus deliberate five-viewport screenshot capture without unnecessary duplicate suites.
- [x] Install the scoped Chromium browser if missing.
- [x] Run formatting, documentation checks, lint, and typecheck; correct root causes.
- [x] Run the complete Playwright suite and inspect generated screenshots visually.
- [x] Run the production build and confirm the root route is generated successfully.
- [x] Inspect the final tree, ignored artifacts, template markers, and all local Markdown links.
- [x] Compare the repository line by line with the user acceptance brief and report only verified results.
