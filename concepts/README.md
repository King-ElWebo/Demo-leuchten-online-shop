# Concept Sprint workspace: LUMENWERK Studio

This workspace documents the visual exploration, Stitch MCP concept generation, evaluation, and handoff decisions for **LUMENWERK Studio — Atelier für skulpturales Licht & Architektonische Leuchten**.

## Stitch handoff record

- **Stitch project ID or link:** `projects/6052545706471218584` ("LUMENWERK Studio — Architectural Lighting Atelier")
- **Screen IDs or links:**
  - Direction A (Selected synthesis partner): Screen `projects/6052545706471218584/screens/8a36c355191d4e608aad0dc6f9d02b69` ("Architectural Chiaroscuro")
  - Direction B (Primary structural anchor): Screen `projects/6052545706471218584/screens/b8e18b63155f4e4c8540fc4de1dd0377` ("Nordic Architectural Atelier & Daylight Gallery")
  - Studio Product Photography Assets: Screens `66e917f4d24244e7ad9bddde4168d9bf` (KORONA I), `850a4ad6f3a24125a72eaf1b83a21649` (AURA COLUMN), `16306275e5dd4b9e9fccadae61360715` (SOLIS DISK), `762ff3b4210f43368d32e15604f54458` (SOLIS ORB), `46f2ec3f194f432084236a904d18e4f4` (STRATA SCONCE), `1f24c5955c4449f5ba299bcb8e50242a` (ATELIER SHOWROOM).
- **Prompts used:**
  - Direction A Prompt: _"LUMENWERK Studio — Architectural Lighting Atelier & Designer E-Commerce Shop. A premium lighting design house featuring handcrafted sculptural luminaires, pendants, floor lamps, and table objects. Dark charcoal and warm basalt stone background (#161618, #222225) with glowing warm ambient light (#FFB86C, #E28C47) and off-white serif typography. Hero section showcasing the flagship sculptural pendant lamp 'KORONA I'..."_
  - Direction B Prompt: _"LUMENWERK Studio — Direction B: Nordic Architectural Atelier & Daylight Gallery. A daylight-flooded minimalist lighting design showroom and e-commerce experience. Clean architectural travertine stone and warm linen background (#F6F4F0, #EDE8E1) with deep bronze/obsidian metal accents (#1E1D1B) and warm luminaire glow highlights..."_
- **Selected direction:**
  - **Synthesized Architectural Daylight Atelier (Direction B foundation with Direction A luminous chiaroscuro spotlight):**
    The base interface utilizes Direction B's calm travertine stone canvas (`#F7F5F0`), deep obsidian bronze structure (`#1E1D1B`), and hairline tectonic borders. For the hero luminaire reveal, dark theatrical spotlighting, and the interactive Leuchten-Konfigurator, Direction A's ambient tungsten bloom (`#E28C47`, `#FFB86C`) and chiaroscuro dark-niche viewports are integrated. This provides maximum scannability and contrast for both customer catalog browsing and the dense merchant cockpit while retaining the dramatic visual poetry of architectural lighting.
- **Rejected alternatives and reasons:**
  - Pure dark mode across all shop pages and merchant dashboard (Direction A standalone): Rejected as primary interface foundation because full-screen dark mode on dense data tables (merchant orders, inventory matrices) fatigues eyes during operational use and compromises form scannability.
  - Generic SaaS card layout with heavy box-shadows: Rejected in favor of architectural hairlines and tectonic grid alignment (`roundedness: 0` to `2px`).
- **Layout and typography decisions:**
  - Typography: Serif display typography (**Playfair Display** / **Cormorant Garamond**) for atelier edition titles and manifesto quotes, paired with neutral grotesque body type (**Inter** / **DM Sans**) and monospaced technical telemetry (**JetBrains Mono** / **Space Grotesk**) for photometrics (Kelvin, Lumens, CRI, Beam Angle).
  - Composition: 12-column asymmetric architectural grid, hairline border dividers, generous whitespace without decorative clutter.
- **Asset assumptions:**
  - High-resolution studio product photography saved locally to `public/media/` and processed into 10 responsive WebP widths via `scripts/build-images.mjs`. No hotlinking to external CDNs.
- **Implementation deviations:**
  - Full Next.js 16 static export architecture (`output: 'export'`) with `generateStaticParams()` for product routes.
  - Native accessible HTML form controls and ARIA-compliant dialogs with visible focus states.
  - Shared typed domain store using browser `localStorage` for cart persistence, demo order creation, and merchant cockpit telemetry updates.
- **Responsive interpretation:**
  - 12-column grid reflows to 6-column on tablet and single-column stacked architectural ledger on mobile (320px–390px). Sticky filters collapse into accessible disclosure sheets.
- **Motion opportunities:**
  - Calm, intentional micro-interactions: smooth Kelvin color-temperature transitions in the configurator, subtle luminaire glow bloom on hover, crisp drawer reveals, respecting `prefers-reduced-motion`.
