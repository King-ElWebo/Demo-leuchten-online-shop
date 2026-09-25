# Acceptance contract

Specification status: READY

This document owns the completion and verification criteria for the configured showcase. It verifies the scope, visual direction, and content defined by the other project specifications; it must not silently introduce, expand, or contradict product scope. If a proposed check requires new functionality, first update the owning specification explicitly.

## Project-specific acceptance

- [ ] **Vollständiger E-Commerce & B2B Durchstich:**
      Produkt im Katalog finden (`/katalog`) → Im Konfigurator (`/konfigurator`) anpassen (Material, Kelvin) → In den Warenkorb legen (`/warenkorb`) → Demo-Bestellung aufgeben (`/kasse`) → Generierte Bestellung in der Händleransicht (`/haendler`) verifizieren → Kausale Veränderung der KPIs (Bestellwert, Anzahl, AOV, Conversion-Rate) überprüfen → Reload-Persistenz der Demo-Order prüfen → Demo-Reset ausführen und Wiederherstellung der Ausgangsdaten verifizieren.
- [ ] **Leuchten-Konfigurator (Signature Moment 1):**
      Echtzeit-Aktualisierung von Material, Farbtemperatur (2200K–4000K), Lichtschein-Vorschau, dynamischer SKU und Gesamtpreis. Funktionierender Tag-/Dämmerungs-Umschalter und fehlerfreies Hinzufügen der konfigurierten Variante in den Warenkorb.
- [ ] **Händleransicht & KPI-Kausalität (Signature Moment 2):**
      Kennzahlen basieren streng auf den Datenpunkten (Bestellungen und Sitzungen) des jeweils gewählten Zeitraums (7, 30, 90 Tage). Klare optische Trennung zwischen historischen Beispieldaten und lokalen Demo-Bestellungen dieses Browsers.
- [ ] **Fehler- und Grenzfall-Handling:**
      Reaktive Behandlung leerer Suchergebnisse im Katalog mit Reset-Möglichkeit. Verhinderung von Mengen über dem lokalen Lagerbestand im Warenkorb. Honest Handling von LocalStorage-Fehlern ohne falsche Erfolgsmeldungen.
- [ ] **Statische Export-Architektur:**
      Produktdetailrouten (`/produkte/[slug]`) werden über `generateStaticParams()` zur Build-Zeit statisch generiert; die Website exportiert vollständig nach `out/` und läuft autonom unter `wrangler pages dev out`.
- [ ] **Design-Authentizität & Barrierefreiheit:**
      Keine generischen KI-Themes. Striktes Einhalten der architektonischen Chiaroscuro-Ästhetik (`#F7F5F0`, `#141416`, `#E28C47`), Axe-Core 0 serious/critical violations, volle Tastaturbedienbarkeit mit sichtbarem Fokus, Respektierung von `prefers-reduced-motion`.

## Routes and behavior

- [ ] Every route in [`SITE.md`](SITE.md) exists and is listed in `tests/e2e/routes.ts`.
- [ ] Every route loads directly with a successful response.
- [ ] Global, contextual, mobile, and footer navigation reaches the intended destination.
- [ ] Every visible control has intentional behavior; no placeholder `#` actions remain.
- [ ] Every project-specific interaction produces its documented result.
- [ ] Browser back/forward behavior is coherent where navigation state is involved.
- [ ] Failure, empty, not-found, loading, or fallback states exist wherever the route actually needs them.

## Responsive layout

Default review viewports:

| Review target | Default viewport | Project value |
| ------------- | ---------------- | ------------- |
| Small mobile  | 320 × 568        | 320 × 568     |
| Modern mobile | 390 × 844        | 390 × 844     |
| Tablet        | 768 × 1024       | 768 × 1024    |
| Laptop        | 1440 × 1000      | 1440 × 1000   |
| Large desktop | 1920 × 1080      | 1920 × 1080   |

- [ ] Desktop layouts preserve the intended hierarchy, rhythm, image crops, and signature moments.
- [ ] Tablet layouts transform as specified rather than merely shrinking desktop.
- [ ] Mobile layouts are deliberately art-directed for priority, rhythm, crop, and touch.
- [ ] At least one intermediate width between each major breakpoint was spot-checked (e.g. 1024px).
- [ ] No required viewport has horizontal document overflow.
- [ ] No unintended overlaps occur.
- [ ] No critical text, controls, focus indicator, or media is clipped.
- [ ] No image is broken, visibly distorted, or assigned an unintended crop.
- [ ] No unresolved placeholder content or asset remains.

## Browser health

- [ ] For a static project, `pnpm build` creates `out/`; every required route loads directly and reloads from `wrangler pages dev out` with HTTP 200.
- [ ] Exported-site navigation, key interactions, and responsive local image variants work without a Next.js server or runtime image optimizer.
- [ ] Every required route has zero uncaught page errors.
- [ ] Every required route has zero unexpected browser console errors.
- [ ] Network failures do not break locally assigned production assets.
- [ ] Direct navigation and in-site navigation were both exercised.

## Accessibility

- [ ] All functionality is reachable by keyboard in a logical order.
- [ ] Focus is clearly visible and not obscured.
- [ ] Native semantic HTML is used before custom roles.
- [ ] Links and buttons match their behavior.
- [ ] Landmarks and heading order communicate the page structure.
- [ ] Every informative image has meaningful context-specific alt text; decorative images have empty alt text.
- [ ] Text, controls, focus indicators, and essential graphics received a contrast review (> 4.5:1 / > 10:1).
- [ ] Forms have persistent labels, useful instructions, and clear error states.
- [ ] Essential information and actions do not depend on hover.
- [ ] Touch devices have an intentional alternative for hover-specific enhancement.
- [ ] `prefers-reduced-motion` removes large spatial movement and non-essential choreography.
- [ ] The automated accessibility scan has no unresolved serious or critical violations.

## Motion and performance

- [ ] Every animation has a documented purpose consistent with [`DESIGN.md`](DESIGN.md).
- [ ] Frequent interactions respond quickly and include suitable press feedback.
- [ ] Motion uses transform and opacity where practical and avoids permanent `will-change`.
- [ ] Scroll behavior does not rely on unnecessary listeners or competing motion systems.
- [ ] Animation remains smooth on the tested mobile and desktop browser projects.
- [ ] Images use `next/image` with correct intrinsic sizing or `fill` plus `sizes` where applicable.
- [ ] Fonts use supported Next.js font tooling where custom fonts are required.
- [ ] Large assets were audited and visible layout shift was reviewed.

## Metadata and production quality

- [ ] Route titles and descriptions match [`CONTENT.md`](CONTENT.md).
- [ ] Canonical, Open Graph, indexing, sitemap, and robots behavior match [`SITE.md`](SITE.md).
- [ ] No accidental no-index or template metadata remains in the production result.
- [ ] TypeScript strict checks pass without casual `any` or weakened configuration.
- [ ] ESLint passes without disabled checks added merely to obtain green output.
- [ ] Browser tests pass for mobile and desktop projects.
- [ ] Production build completes successfully.
- [ ] Generated QA reports, test results, and screenshots are ignored by version control where appropriate.

## Visual review and final polish

- [ ] Screenshots were captured and visually reviewed at every required viewport (320, 390, 768, 1024, 1440, 1920).
- [ ] Typography, whitespace, density, alignment, image crops, and responsive composition were refined after review.
- [ ] A dedicated motion pass was completed in the browser.
- [ ] A dedicated accessibility pass was completed.
- [ ] A final visual-cohesion pass confirmed the pages feel like one authored identity without repetitive template composition.

## Required evidence

| Evidence                | Required record                                                            |
| ----------------------- | -------------------------------------------------------------------------- |
| Routes and interactions | Routes visited and interactions exercised                                  |
| Responsive review       | Viewport dimensions and screenshot paths                                   |
| Browser health          | Console and page-error result                                              |
| Accessibility           | Keyboard/reduced-motion notes and automated scan result                    |
| Engineering             | Fresh output from `pnpm lint`, `pnpm typecheck`, and `pnpm build`          |
| Browser tests           | Fresh output from `pnpm test:e2e`                                          |
| Full local validation   | Fresh output from `pnpm qa` or individually documented equivalent commands |
| Remaining limitations   | Exact external blocker, impact, and evidence                               |

Commands and artifact locations are defined in [`TOOLING.md`](../system/TOOLING.md). Evidence—not confidence—is the completion standard.
