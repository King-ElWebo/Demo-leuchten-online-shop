# QA and completion rules

Authority: [`ACCEPTANCE.md`](../../docs/project/ACCEPTANCE.md) and [`TOOLING.md`](../../docs/system/TOOLING.md).

- Test every required route, direct load, navigation path, and visible interaction.
- Check browser console and uncaught page errors.
- Review screenshots at every required viewport for overflow, clipping, crop, density, and cohesion.
- Run keyboard, touch, reduced-motion, contrast, and automated accessibility checks.
- Run `pnpm docs:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test:e2e`, and `pnpm build`.
- Perform a final motion, accessibility, and visual-polish pass.
- Never claim QA, screenshots, tests, or builds that were not actually performed.
