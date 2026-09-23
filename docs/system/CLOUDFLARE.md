# Static demos on Cloudflare Pages

Cloudflare Pages is the default hosting target for **static** showcase projects copied from this repository. The checked-in Next.js configuration uses `output: 'export'`; `pnpm build` creates `out/`. This is a deployment target, not permission to deploy. Project scope and visual direction remain in the four project specifications.

## Static contract

- Keep content and route data available at build time. Every App Router dynamic segment must return its finite paths from `generateStaticParams()`; test each path by direct URL and reload.
- Request-time rendering, Server Actions, cookies, request-dependent route handlers, authentication, a real form receiver, and other server behavior are **not** silently emulated. If `SITE.md` requires one, stop the static assumption, record the requirement and a separate hosting/architecture decision, then update implementation and acceptance. A fake success state must never imply data was transmitted.
- Client-side interactions are fine. A demo-only form must say clearly that it does not send or store data and offer a real contact method if one is required.

## Responsive local media

Place original raster files under [`public/media/`](../../public/media/README.md). `pnpm build` first runs `scripts/build-images.mjs` using pinned Sharp and the widths in `src/lib/image-widths.json`, then exports the site. Generated WebP variants live under ignored `public/media/responsive/`; the custom `next/image` loader selects those files for its width-specific `srcset`. The script logs each source and variant count and refuses to replace an unmarked directory. Supply appropriately large originals; inspect generated mobile and desktop bytes/crops before publishing. SVGs are served directly.

Set an accurate `sizes` on every responsive image. Only visible lead/hero imagery should use eager loading or priority; below-the-fold media remains lazy. Do not rely on `images.unoptimized: true`, Cloudflare Polish, or a paid image service.

## Local export check

```bash
pnpm build
pnpm preview:pages # runs wrangler pages dev out on 127.0.0.1:3101
pnpm test:static   # after a successful build; starts the same local Pages server
```

Inspect direct route loads **and reloads**, navigation and key interactions, generated image URLs and `srcset`, mobile/desktop layout, console errors, and accessibility. `pnpm qa` runs the existing Playwright/axe suite, builds once, then runs exported-site checks. `next dev` alone is not release evidence.

## Pages settings when publishing a specific demo

Choose the **Next.js (Static HTML Export)** preset, set build command to `pnpm build`, and output directory to `out`. Use the copied project's [`package.json`](../../package.json) as the version source: its `engines.node` sets the compatible Node range and its `packageManager` sets the exact pnpm version. If Pages' defaults differ, configure `NODE_VERSION` and `PNPM_VERSION` for that Pages project accordingly; do not copy machine-specific paths or credentials into the repository. Confirm the build environment installs dev dependencies because Sharp is a build dependency.

Before making a fictional demo public:

- [ ] Mark it visibly as a concept/demo, without implying a real business or completed client work.
- [ ] Confirm rights and permitted public use for every image and font.
- [ ] Replace placeholder contact, legal and operator details with truthful information appropriate to the actual publisher and jurisdiction.
- [ ] Ensure demo forms cannot claim a message was sent when nothing was transmitted; either connect an approved real service or label the simulation unmistakably.
- [ ] Recheck exported routes, image delivery, interactions, metadata and indexing on the actual preview URL before publishing.

Platform references: [Cloudflare's static Next.js Pages guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Pages build image/version settings](https://developers.cloudflare.com/pages/configuration/build-image/), and [Next.js static export limitations](https://nextjs.org/docs/app/guides/static-exports).
