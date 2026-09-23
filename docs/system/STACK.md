# Stack decisions

This document explains package roles and selection rules. Exact installed versions live in [`package.json`](../../package.json) and the resolved graph lives in `pnpm-lock.yaml`. At master-template creation, the pinned compatible set is Next.js 16.3.5, React 19.3.0, TypeScript 6.0.3, Tailwind CSS 4.3.3, Motion 13.4.0, Playwright 1.63.0, ESLint 9.39.5, Prettier 3.9.8, and pnpm 11.19.0.

## Default stack

| Tool                            | Default role                                                                       | Decision note                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Next.js App Router              | Routing, Server Components, metadata, static export to Cloudflare Pages by default | Use `generateStaticParams()` for finite dynamic routes; do not use removed `next lint`. |
| React                           | Component composition and narrowly scoped client interaction                       | Keep pages server-rendered unless interaction requires a client boundary.               |
| TypeScript                      | Strict domain and prop contracts                                                   | Keep strict checks enabled.                                                             |
| Tailwind CSS                    | Utility styling where it improves local clarity                                    | It is infrastructure, not a supplied visual theme. Plain CSS remains valid.             |
| Motion for React (`motion`)     | Presence, gestures, dynamic interaction, and layout transitions                    | Import only in client boundaries that need it.                                          |
| Playwright                      | Route, interaction, responsive, console, screenshot, and browser QA                | Maintain the central route registry.                                                    |
| axe-core Playwright integration | Lightweight automated accessibility scan                                           | It supplements keyboard and visual review; it does not replace them.                    |
| ESLint                          | Direct CLI linting with Next.js Core Web Vitals and TypeScript rules               | `next lint` was removed in Next.js 16.                                                  |
| Prettier                        | Deterministic formatting                                                           | Keep configuration small.                                                               |
| `next/image` + Sharp            | Local build-time WebP variants and responsive `srcset` for static export           | Provide dimensions and accurate `sizes`; no runtime image optimizer required.           |
| `next/font`                     | Self-hosted, optimized project fonts                                               | Select fonts only after creative direction is defined.                                  |
| pnpm                            | Dependency installation and script execution                                       | Keep exact versions and the lockfile.                                                   |
| Wrangler Pages                  | Local inspection of the exported `out/` directory                                  | Project-local dev tool; no deployment is part of normal QA.                             |

Lucide may be added when a project genuinely needs a coherent icon set. Do not install it pre-emptively or let its default icon choices determine the identity.

## Opt-in stack

Add only when a completed project specification justifies the cost.

| Tool                              | Add when                                                                                                       | Guardrail                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| GSAP and ScrollTrigger            | Complex timelines, pinning, advanced scroll choreography, or sequencing that Motion/CSS cannot express cleanly | Do not run two motion systems for the same responsibility.                  |
| Smooth scrolling                  | The creative direction depends on it and native scrolling cannot produce the experience                        | Must pass mobile, keyboard, anchor, history, and reduced-motion QA.         |
| Radix or another headless library | A complex accessible behavior would otherwise be reimplemented poorly                                          | Use behavior only; default styling must not set the visual identity.        |
| Zod                               | Runtime validation exists at a real untrusted boundary                                                         | Do not validate static authored data at runtime without a reason.           |
| React Hook Form                   | A non-trivial form has validation and state complexity                                                         | Native form behavior is preferred for simple forms.                         |
| Vitest                            | Pure functions or client behavior need unit coverage beyond browser tests                                      | Do not add a second test layer for trivial rendering.                       |
| Embla or Swiper                   | A specified carousel has gesture, focus, and pagination requirements                                           | Verify keyboard, touch, reduced motion, and no-JS fallback expectations.    |
| Three.js or React Three Fiber     | A signature moment requires real-time 3D                                                                       | Budget for loading, mobile fallback, reduced motion, GPU cost, and deep QA. |
| Dynamic OG image tooling          | Route-specific social images cannot be supplied as stable assets                                               | Prefer static files for simple cases.                                       |
| Analytics                         | The user specifies a provider, consent approach, and measurement plan                                          | No silent tracking in the master template.                                  |
| CMS                               | Editors need remote publishing and the user chooses the system                                                 | Keep CMS access at server/data boundaries; avoid visual coupling.           |
| Local client state library        | State genuinely spans distant interactive boundaries                                                           | React state/context is sufficient for most showcases.                       |

## Excluded by default

- Prisma or another database abstraction
- Databases
- Authentication
- CMS integration
- Docker
- Redux
- Large styled UI libraries
- Checkout systems
- Payment processing
- Multiple overlapping motion systems
- Backend APIs

These are not forbidden forever; they require explicit project justification and an updated [`SITE.md`](../project/SITE.md), architecture review, and acceptance coverage.

Static export is the default, not a way to disguise server requirements. A project needing request-time rendering, real form handling, authentication, or another server feature needs a separate hosting decision before its Next configuration changes. See [`CLOUDFLARE.md`](CLOUDFLARE.md).

## Selection rules

- Do not add a dependency for trivial functionality.
- Prefer CSS for simple predetermined visual transitions.
- Use Motion for React for dynamic interaction, presence, gestures, and layout transitions.
- Use GSAP only for complex timelines, pinning, or advanced scroll choreography.
- Native scrolling is the default.
- Smooth scrolling is opt-in and must pass mobile and accessibility QA.
- Headless libraries may supply behavior, but their styling must not determine the project’s visual identity.
- Prefer stable local assets over runtime remote dependencies.
- Verify current official documentation and peer compatibility before upgrades.
- Change versions deliberately, review release and security notes, regenerate the lockfile, and run the complete QA sequence.

Implementation boundaries are defined in [`ENGINEERING.md`](ENGINEERING.md); tool routing is defined in [`TOOLING.md`](TOOLING.md).
