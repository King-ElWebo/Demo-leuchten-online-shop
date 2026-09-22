# Repository-owned skills

This directory is reserved for small, repository-owned instruction packages that encode a genuinely repeated workflow. It does not automatically install or expose third-party skills.

- Discover globally installed, user-installed, or plugin-provided skills at runtime in the current agent environment.
- Treat names in repository documentation as logical capabilities unless the preflight confirms an exact package and the agent can read its instructions.
- Never copy or vendor third-party skill content here merely to make a documented name appear available.
- Use the fallback in [`docs/system/TOOLING.md`](../../docs/system/TOOLING.md) when an optional skill is unavailable.
- Keep any future repository-owned skill generic and reusable across showcase projects. Project-specific brand direction, copy, routes, assets, or signature interactions belong in `docs/project/`, not in a skill.

Repository rules in [`.agents/rules/`](../rules/code-quality.md) are permanent constraints, not skills, and do not require activation.
