# Google Antigravity runtime contract

Google Antigravity is the primary production runtime for copied Showcase Website Factory projects. Codex is used primarily to maintain, audit, and improve the reusable base repository.

[`AGENTS.md`](../../AGENTS.md) remains the root orchestrator. This document defines only Antigravity-specific entry points, discovery behavior, configuration locations, and capability verification.

## Runtime entry points

- Use `/goal` for normal three-to-six-page showcase builds. It runs autonomously until the objective is achieved; it does not install or enable missing skills or MCP servers.
- Reserve `/teamwork-preview` for unusually large hero projects with genuinely independent workstreams. Antigravity Teamwork may begin with an interactive scoping interview and approval of a prompt artifact before autonomous execution.
- Both entry points must read `AGENTS.md`, extract capability intent from the current prompt, run the capability preflight, and follow the same project specifications, authority hierarchy, acceptance contract, and local QA baseline.

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

When workspace-rule activation is managed through the Antigravity application, configure [the showcase orchestration bootstrap](../../.agents/rules/00-showcase-orchestration.md) as **Always on**. The rule is deliberately small: it routes the agent to `AGENTS.md` and canonical skill routing instead of duplicating runtime policy.

## Discovery and selection

Antigravity may discover skills from the workspace, supported global locations, or installed providers. Natural-language capability intent in the user prompt maps through the [preferred Antigravity skill routing in `TOOLING.md`](TOOLING.md#preferred-antigravity-skill-routing); an exact skill name is a strong selection signal. The current inventory documented there is an expected preferred profile, not a guaranteed runtime fact.

Antigravity discovers skill names and descriptions automatically, then reads the full `SKILL.md` only when the skill is relevant or explicitly invoked. Discovery alone is not verification. A selected skill is usable only after the preflight confirms its exact name, readable instructions, and phase relevance, and the agent must actually follow those instructions in the assigned phase. `/goal` and `/teamwork-preview` do not install missing skills.

MCP tools become available after a server is installed, enabled, connected, and exposes them to the model. Availability does not force invocation; the model still selects tools according to the project phase, permissions, and `TOOLING.md`. OpenDesign remains a separately discovered and verified MCP capability, never a skill. When `DESIGN.md` selects `PRIMARY_DESIGN_PARTNER` or `CONCEPT_SPRINT_PRIMARY`, verified OpenDesign is the preferred design workspace; selected skills must be read first and guide how Antigravity uses it.

The preflight reports every relevant capability as one of:

- `SELECTED_VERIFIED`
- `AVAILABLE_NOT_SELECTED`
- `UNAVAILABLE`
- `FALLBACK_ACTIVE`
- `BLOCKED_REQUIRED`

An MCP reaches `SELECTED_VERIFIED` only after a harmless read-only health or discovery call succeeds. If no safe probe exists, keep it available but unverified, activate the local fallback, and wait for a real authorized use. Never generate, write, create, save, update, delete, publish, or deploy merely to test availability.

## OpenDesign policy

OpenDesign is the preferred primary design creation and iteration environment when its [official upstream Antigravity integration](https://github.com/nexu-io/open-design) is installed globally, verified by a harmless read-only probe, permitted by `DESIGN.md`, and not disabled by the user. It remains technically optional so copied repositories can finish through a local fallback.

- `OFF`: do not use OpenDesign.
- `CRITIQUE_ONLY`: use it only for permitted focused critique or validation; do not create a new direction.
- `PRIMARY_DESIGN_PARTNER`: the recommended normal portfolio-showcase mode. Read the selected design skills first, apply them while OpenDesign creates and iterates the direction, then persist the result before code.
- `CONCEPT_SPRINT_PRIMARY`: use OpenDesign for one to three skill-guided directions when art direction is intentionally unresolved; keep only the selected direction as implementation authority.

A health check never authorizes creation or writes. A completed and approved `DESIGN.md` policy authorizes exactly its listed non-destructive OpenDesign operations for that project. Deletion, public publishing, account changes, and unrelated external mutations still require separate direct authorization. Persist selected decisions in `DESIGN.md`, local reference notes, permitted local assets, and implementation requirements; temporary MCP output is not a source of truth.

If OpenDesign cannot be verified, report the fallback and continue with project specifications, supplied references, selected verified design skills, local implementation, browser critique, and deterministic QA. Block only when `DESIGN.md` explicitly makes OpenDesign required and rejects fallback.

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
