# Google Antigravity runtime contract

Google Antigravity is the primary production runtime for copied Showcase Website Factory projects. Codex is used primarily to maintain, audit, and improve the reusable base repository.

[`AGENTS.md`](../../AGENTS.md) remains the root orchestrator. This document defines only Antigravity-specific entry points, discovery behavior, configuration locations, and capability verification.

## Runtime entry points

- Use `/goal` for normal three-to-six-page showcase builds. It runs autonomously until the objective is achieved; it does not install or enable missing skills or MCP servers.
- Reserve `/teamwork-preview` for unusually large hero projects with genuinely independent workstreams. Antigravity Teamwork may begin with an interactive scoping interview and approval of a prompt artifact before autonomous execution.
- Both entry points must read `AGENTS.md`, run the capability preflight, and follow the same project specifications, authority hierarchy, acceptance contract, and local QA baseline.

See Google's official [slash-command overview](https://antigravity.google/docs/slash-commands/) and [Teamwork guide](https://antigravity.google/docs/teamwork/).

## Official workspace conventions

| Capability                    | Antigravity location                                       | Repository policy                                                                                                         |
| ----------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Workspace rules               | `.agents/rules/*.md`                                       | Permanent repository constraints; the bootstrap rule directs showcase work to `AGENTS.md`.                                |
| Workspace skills              | `.agents/skills/<skill-folder>/SKILL.md`                   | Commit only small, generic, repository-owned skills. This repository currently installs no third-party workspace skill.   |
| Antigravity 2.0 global skills | `~/.gemini/config/skills/<skill-folder>/SKILL.md`          | Discover at runtime; never hardcode or copy a workstation installation into the repository.                               |
| Antigravity CLI global skills | `~/.gemini/antigravity-cli/skills/<skill-folder>/SKILL.md` | Surface-specific alternative when the CLI is used.                                                                        |
| Workspace MCP configuration   | `.agents/mcp_config.json`                                  | Create only for a deliberate project-local integration. Do not commit credentials or machine-specific executable paths.   |
| Global MCP configuration      | `~/.gemini/config/mcp_config.json`                         | Preferred location for reusable OpenDesign setup across copied showcase repositories. It remains outside this repository. |

These paths follow Google's official [Rules](https://antigravity.google/docs/rules-workflows/), [Agent Skills](https://antigravity.google/docs/skills/), and [MCP](https://antigravity.google/docs/mcp/) documentation.

## Discovery and selection

Antigravity discovers skill names and descriptions automatically, then reads the full `SKILL.md` only when the skill is relevant or explicitly invoked. Discovery does not mean selection. A skill is usable only after the preflight confirms its exact name, readable instructions, and phase relevance.

MCP tools become available after a server is installed, enabled, connected, and exposes them to the model. Availability does not force invocation; the model still selects tools according to the project phase, permissions, and [`TOOLING.md`](TOOLING.md).

The preflight reports every relevant capability as one of:

- `SELECTED_VERIFIED`
- `AVAILABLE_NOT_SELECTED`
- `UNAVAILABLE`
- `FALLBACK_ACTIVE`
- `BLOCKED_REQUIRED`

An MCP reaches `SELECTED_VERIFIED` only after a harmless read-only health or discovery call succeeds. If no safe probe exists, keep it available but unverified, activate the local fallback, and wait for a real authorized use. Never generate, write, create, save, update, delete, publish, or deploy merely to test availability.

## OpenDesign policy

OpenDesign is the preferred optional design MCP when its [official upstream Antigravity integration](https://github.com/nexu-io/open-design) is installed globally and verified. It is never a factory dependency.

- **Direct Build:** default to `AVAILABLE_NOT_SELECTED` when `DESIGN.md` is `READY`. Use it only for bounded implementation support, focused critique, or validation of a difficult visual decision.
- **Concept Sprint:** it may become `SELECTED_VERIFIED` only when `DESIGN.md` permits `CONCEPT_SPRINT_ALLOWED`, the direction is intentionally unresolved, and bounded alternatives are requested.
- Translate useful results into `DESIGN.md`, local reference notes, permitted local assets, or implementation requirements. Temporary MCP output is not a source of truth.
- Read-only reachability never authorizes project creation, generation, artifact saving, updates, deletion, or publishing.

## Browser and deterministic QA

Antigravity browser tooling is the preferred interactive and visual inspection layer. The agent must inspect live layouts and the screenshots it captures; generation without review is not visual QA.

```text
Playwright + axe = mandatory deterministic baseline
Antigravity browser tooling = interactive and visual verification
Manual inspection = final fallback
```

Google documents browser screenshots as reviewable artifacts in its [Screenshots guide](https://antigravity.google/docs/screenshots/). Browser observations guide fixes; they do not become design authority.

## One-time runtime-readiness audit

This diagnostic discovers capabilities without building or modifying a showcase:

```text
/goal

Perform an Antigravity runtime-readiness audit for this Showcase Website Factory. Do not implement or modify the website.

Read AGENTS.md and the referenced system files. Discover all available workspace, global and plugin-provided skills. Confirm the exact readable skill packages relevant to design, motion, visual refinement, accessibility, responsive design, Next.js, React and browser QA.

Discover installed and enabled MCP servers. Perform only harmless read-only probes for selected servers. In particular, report whether the official OpenDesign MCP is visible and reachable without generating, saving, updating or deleting anything.

Report capabilities as SELECTED_VERIFIED, AVAILABLE_NOT_SELECTED, UNAVAILABLE, FALLBACK_ACTIVE or BLOCKED_REQUIRED. End with the exact recommended capability set for normal /goal showcase runs and for a Concept Sprint. Do not install, configure or mutate anything.
```
