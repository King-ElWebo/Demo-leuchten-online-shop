# Showcase Website Factory Design

## Purpose

Build a small, reusable master repository for autonomous production of premium 3–6 page showcase websites. The repository standardizes specifications, engineering constraints, agent workflow, accessibility, motion quality, browser QA, and completion evidence while leaving every project’s visible identity open.

## Architecture

The system has four layers:

1. `docs/project/` is replaced or completed for each showcase and owns scope, creative direction, content, and acceptance.
2. `docs/system/` and `.agents/rules/` define the stable engineering, stack, tooling, and quality contracts.
3. Root `AGENTS.md` coordinates autonomous execution and conflict resolution.
4. A deliberately neutral Next.js application plus Playwright checks proves the master template remains runnable without imposing a reusable aesthetic.

The runtime uses Next.js 16 App Router with Server Components by default, strict TypeScript, Tailwind CSS, and local typed data. Motion for React is available for future projects but the untouched status screen remains static. There is no backend, global store, CMS, database, remote image dependency, or universal section system.

## QA Design

`tests/e2e/routes.ts` is the single editable route registry. Playwright smoke checks cover each registered route, browser console and uncaught page errors, horizontal overflow, and a lightweight axe scan. Separate screenshot coverage records five review viewports while default projects keep routine execution practical.

A small Node script checks only repository-document integrity: required files, local Markdown links, template status markers, and the intentional acceptance-language distinction between unresolved project placeholders and base-template QA. It is not a schema or documentation framework.

## Operational Constraints

- Use pnpm and exact package versions.
- Scaffold directly in the current directory.
- Do not commit, push, deploy, or create external resources.
- Keep `TEMPLATE_NOT_CONFIGURED` intentional and allow base-template QA to pass.
- Do not create preset showcase sections or a visual theme.
- Use objective command output and browser evidence for completion claims.

## Verification Contract

Run formatting checks, documentation integrity, lint, strict typecheck, Playwright tests, and a production build. Start the application, inspect browser state and console output, capture the requested viewport screenshots, and visually review them before reporting completion.
