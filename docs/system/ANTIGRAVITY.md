# Google Antigravity runtime contract

Google Antigravity is the primary production runtime for copied Showcase Website Factory projects. Codex is used primarily to maintain, audit, and improve the reusable base repository.

[`AGENTS.md`](../../AGENTS.md) remains the root orchestrator. This document defines only Antigravity-specific entry points, discovery behavior, configuration locations, and capability verification.

## Runtime entry points

- Use `/goal` for normal three-to-six-page showcase builds. It runs autonomously until the objective is achieved; it does not install or enable missing skills or MCP servers.
- Reserve `/teamwork-preview` for unusually large hero projects with genuinely independent workstreams. Antigravity Teamwork may begin with an interactive scoping interview and approval of a prompt artifact before autonomous execution.
- Both entry points must read `AGENTS.md`, extract capability intent from the current prompt, run the capability preflight, and follow the same project specifications, authority hierarchy, acceptance contract, and local QA baseline.

See Google's official [slash-command overview](https://antigravity.google/docs/slash-commands/) and [Teamwork guide](https://antigravity.google/docs/teamwork/).

## Official workspace conventions

| Capability                    | Antigravity location                                       | Repository policy                                                                                                          |
| ----------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Workspace rules               | `.agents/rules/*.md`                                       | Permanent repository constraints; the bootstrap rule directs showcase work to `AGENTS.md`.                                 |
| Workspace skills              | `.agents/skills/<skill-folder>/SKILL.md`                   | Commit only small, generic, repository-owned skills. This repository currently installs no third-party workspace skill.    |
| Antigravity 2.0 global skills | `~/.gemini/config/skills/<skill-folder>/SKILL.md`          | Discover at runtime; never hardcode or copy a workstation installation into the repository.                                |
| Antigravity CLI global skills | `~/.gemini/antigravity-cli/skills/<skill-folder>/SKILL.md` | Surface-specific alternative when the CLI is used.                                                                         |
| Workspace MCP configuration   | `.agents/mcp_config.json`                                  | Create only for a deliberate project-local integration. Do not commit credentials or machine-specific executable paths.    |
| Global MCP configuration      | `~/.gemini/config/mcp_config.json`                         | Preferred location for reusable Stitch connection across copied showcase repositories. It remains outside this repository. |

These paths follow Google's official [Rules](https://antigravity.google/docs/rules-workflows/), [Agent Skills](https://antigravity.google/docs/skills/), and [MCP](https://antigravity.google/docs/mcp/) documentation.

When workspace-rule activation is managed through the Antigravity application, configure [the showcase orchestration bootstrap](../../.agents/rules/00-showcase-orchestration.md) as **Always on**. The rule is deliberately small: it routes the agent to `AGENTS.md` and canonical skill routing instead of duplicating runtime policy.

## Discovery and selection

Antigravity may discover skills from the workspace, supported global locations, or installed providers. Natural-language capability intent in the user prompt maps through the [preferred Antigravity skill routing in `TOOLING.md`](TOOLING.md#preferred-antigravity-skill-routing); an exact skill name is a strong selection signal. The current inventory documented there is an expected preferred profile, not a guaranteed runtime fact.

Antigravity discovers skill names and descriptions automatically, then reads the full `SKILL.md` only when the skill is relevant or explicitly invoked. Discovery alone is not verification. A selected skill is usable only after the preflight confirms its exact name, readable instructions, and phase relevance, and the agent must actually follow those instructions in the assigned phase. `/goal` and `/teamwork-preview` do not install missing skills.

MCP tools become available after a server is installed, enabled, connected, and exposes them to the model. Availability does not force invocation; the model still selects tools according to the project phase, permissions, and `TOOLING.md`. Stitch remains a separately discovered and verified MCP capability, never a skill. The intended Antigravity environment names the global server `stitch`, but every run must still verify the tools it can actually see. Selected skills must be read first and guide how Antigravity uses Stitch.

The preflight reports every relevant capability as one of:

- `SELECTED_VERIFIED`
- `AVAILABLE_NOT_SELECTED`
- `UNAVAILABLE`
- `FALLBACK_ACTIVE`
- `BLOCKED_REQUIRED`

An MCP reaches `SELECTED_VERIFIED` only after a harmless read-only health or discovery call succeeds. If no safe probe exists, keep it available but unverified, activate the local fallback, and wait for a real authorized use. Never generate, write, create, save, update, delete, publish, or deploy merely to test availability.

## Stitch runtime policy

Stitch is the preferred optional visual exploration and UI concept tool for a fresh showcase when runtime verification succeeds, `DESIGN.md` permits exploration, the routing in `TOOLING.md` calls for it, and the user has not disabled it. It can generate initial screens, meaningful visual variants, layout directions, and handoff material. It does not decide product scope, application architecture, final production code, accessibility, responsive behavior, or completion.

The optional one-time Antigravity project permission is:

```text
mcp(stitch/*)
```

Granting this through Antigravity permits autonomous calls to the `stitch` server without repeated MCP approval prompts. Never broaden it to `mcp(*)`, grant unrelated servers, write it into a global configuration on the user's behalf, or place credentials in this repository. A project-local Stitch entry is unnecessary when the global server is already connected.

If Stitch is unavailable, unauthenticated, or returns an error, record the limitation once, do not repeatedly retry the same failing call, and continue through project specifications, supplied references, selected verified design skills, local frontend implementation, browser critique, and deterministic QA. Stitch is never `BLOCKED_REQUIRED` in this factory.

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

Discover installed and enabled MCP servers. Perform only harmless read-only probes for selected servers. In particular, report whether the global server named stitch exposes reachable tools without generating, saving, updating or deleting anything.

Report capabilities as SELECTED_VERIFIED, AVAILABLE_NOT_SELECTED, UNAVAILABLE, FALLBACK_ACTIVE or BLOCKED_REQUIRED. End with the exact recommended capability set for normal /goal showcase runs and for a Concept Sprint. Do not install, configure or mutate anything.
```
