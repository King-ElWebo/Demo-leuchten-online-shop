# Code quality rules

Authority: [`docs/system/ENGINEERING.md`](../../docs/system/ENGINEERING.md) and [`docs/system/STACK.md`](../../docs/system/STACK.md).

- Server Components by default; keep client and motion boundaries small.
- No backend, API, database, authentication, or CMS without project justification.
- No unused code, exports, styles, or dependencies.
- No casual `any`, weakened TypeScript, or checks disabled merely to get green output.
- Every visible control must work as specified.
- Fix root causes rather than suppressing symptoms.
- Prefer clear composition to configuration-heavy universal components.
- Avoid premature abstraction, needless indirection, and giant responsibility boundaries.
