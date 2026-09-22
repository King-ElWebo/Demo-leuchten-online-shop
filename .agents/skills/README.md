# Repository-owned skills

This directory is reserved for small, repository-owned instruction packages that encode a genuinely repeated workflow. In Antigravity, a workspace skill belongs at `.agents/skills/<skill-folder>/SKILL.md`. This directory does not automatically install or expose third-party skills.

- Discover workspace, global, user-installed, and plugin-provided skills at runtime in the current agent environment. Current Antigravity 2.0 global skills use `~/.gemini/config/skills/<skill-folder>/`; Antigravity CLI global skills use `~/.gemini/antigravity-cli/skills/<skill-folder>/`. See the [official Antigravity skills documentation](https://antigravity.google/docs/skills/).
- Antigravity discovers skill metadata automatically and selects skills by relevance. Treat a name in repository documentation as a logical or preferred capability until preflight confirms the exact package, reads its `SKILL.md`, and matches its instructions to the current phase.
- Never copy or vendor third-party skill content here merely to make a documented name appear available.
- Use the fallback in [`docs/system/TOOLING.md`](../../docs/system/TOOLING.md) when an optional skill is unavailable.
- Keep any future repository-owned skill generic and reusable across showcase projects. Project-specific brand direction, copy, routes, assets, or signature interactions belong in `docs/project/`, not in a skill.

Repository rules in [`.agents/rules/`](../rules/code-quality.md) are permanent constraints, not skills, and do not require activation.
