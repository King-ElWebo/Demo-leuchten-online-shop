# Project creative direction

Specification status: READY

This file owns the visual identity, typography, layout and composition, imagery, responsive art direction, and motion direction for one showcase. It contains project-specific creative direction—not generic motion tutorials, library rules, or coding guidance. Scope and behavior live in [`SITE.md`](SITE.md), implementation constraints in [`ENGINEERING.md`](../system/ENGINEERING.md), approved copy and media assignments in [`CONTENT.md`](CONTENT.md), and completion checks in [`ACCEPTANCE.md`](ACCEPTANCE.md). Skills, MCP suggestions, and references may support or critique this direction but may not replace it.

## Strategic creative core

- **Brand thesis:** Licht ist keine bloße Beleuchtung, sondern architektonische Materie. LUMENWERK formt Leuchten als funktionale Skulpturen, die bei Tageslicht als ruhige monolithische Raumobjekte existieren und bei Dämmerung durch meisterhaft geführte Photometrie Räume atmosphärisch gliedern.
- **Central creative idea:** _Architectural Chiaroscuro & Monolithic Craft._ Die Verschmelzung von archaischen, haptischen Werkstoffen (handgedrehtes Messing, Vulkanbasalt, mundgeblasenes Opalglas) mit ultra-präziser moderner Lichttechnologie (CRI 98+, Dim-to-Warm, Casambi).
- **Creative tension:** Die Spannung zwischen schwerer, rauer Materialität (steinern, metallisch, gefräst) und immateriellem, warmem, schwerelosem Lichtschein.
- **Mood and emotional outcome:** Kontemplativ, souverän, architektonisch diszipliniert, warm und einladend. Der Nutzer erlebt einen Raum von kuratierter Ruhe statt digitaler Reizüberflutung.
- **Visual positioning:** Positioniert im Segment internationaler High-End-Lichtateliers (vergleichbar mit Michael Anastassiades, Flos Custom, Roll & Hill, Viabizzuno), mit Wiener Werkstätten-Präzision und nordischer Klarheit.

## Design DNA

- **Recurring visual logic:** Ein tektonisches 12-Spalten-Raster mit hauchfeinen, metallischen Haarlinien (`border-stone-200` / `border-stone-800`), asymmetrische typografische Setzungen, großzügiger negativer Raum und fokussierte Lichtkegel-Simulationen.
- **Deliberate contrast or imbalance:** Die Kundenseite operiert auf einem warmen, hellen Travertin-Kalkstein-Grund (`#F7F5F0`), während der Hero-Spotlight und der interaktive Leuchten-Konfigurator eine dunkle Chiaroscuro-Nische (`#141416`) bieten, in der das warme Bernsteinlicht (`#E28C47`) seine volle Leuchtkraft entfaltet.
- **What creates recognition across pages:** Die markante Serif-Typografie für Werknummern und Titel, das feine Rastersystem mit metallenen Index-Tags (`[EDITION 01]`, `[2700K]`), sowie die konsequent abgerundungslose Geometrie (`rounded: 0px` bzw. `rounded-sm` für subtile Haptik).
- **What must vary between pages:**
  - _Shop:_ Hohe visuelle Großzügigkeit, raumgreifende Produktfotografie und interaktive Lichtfarbensimulation.
  - _Händleransicht:_ Professionelle, ruhige Arbeitsdichte mit tabellarischer Klarheit, synchronen Zeitfiltern und klaren Kennzahlen-Hierarchien.

## Typography roles

| Role         | Typeface or category               | Weight/width/case logic                    | Intended voice                                    | Responsive behavior                             |
| ------------ | ---------------------------------- | ------------------------------------------ | ------------------------------------------------- | ----------------------------------------------- |
| Display      | Playfair Display / Editorial Serif | Regular / Medium, tighter tracking -0.02em | Kunsthandwerkliche Autorität, skulpturaler Raum   | Skaliert von 48px (Desktop) bis 28px (Mobile)   |
| Body         | Inter / System Sans                | Regular (400), offenes Tracking, LH 1.6    | Höchste Lesbarkeit, neutraler Dienst am Inhalt    | 16px Desktop, 15px Mobile                       |
| Utility/meta | JetBrains Mono / Space Grotesk     | Medium (500), Uppercase, Tracking 0.08em   | Architektonische Präzision, technische Telemetrie | 11–13px auf allen Geräten, tabellarische Zahlen |

## Color logic

- **Core palette and roles:**
  - `Surface Atelier Floor (Light Canvas):` `#F7F5F0` (Warmer Travertin-Kalkstein)
  - `Surface Niche (Dark Chiaroscuro):` `#141416` (Vulkanbasalt & Anthrazit)
  - `Surface Elevated / Cards:` `#FFFFFF` (Shop) / `#FAFAF7` (Panels)
  - `Primary Obsidian Bronze:` `#1E1D1B` (Typografie & Rahmenstrukturen)
  - `Illumination Amber Glow:` `#D97724` / `#E28C47` (Aktive Lichtpunkte, Fokus, CTAs)
  - `Radiant Core Accent:` `#FFB86C` (Lichtschein-Highlights & Kelvin-Spitzen)
  - `Muted Mortar / Meta:` `#7A766E` (Technische Beschriftungen, IES-Daten)
  - `Hairline Rule:` `rgba(30, 29, 27, 0.10)` (Leichte Rasterlinien)
- **Dominant/rare color proportions:** 85% Neutralraum (Travertin, Obsidian, Weiß), 10% Basalt-Kontrastflächen, 5% präzise dosiertes Bernstein-Licht (`#E28C47`).
- **Surface and text relationships:** Textkontraste liegen stets bei > 10:1 auf hellen wie dunklen Flächen (WCAG AAA konform).
- **Semantic states and contrast approach:**
  - Erfolgsmeldungen & Bestände: Ruhiges Salbeigrün (`#15803D` auf `#F0FDF4`).
  - Warnung / Knapp: Terrakotta / Bernstein (`#B45309` auf `#FEF3C7`).
  - Fehler: Gedämpftes Karminrot (`#B91C1C` auf `#FEF2F2`).
- **Where color is intentionally withheld:** Tabellen und Händler-Dashboards verzichten auf bunte Verzierungen; Farbe signalisiert ausschließlich Status oder Lichtfarben.

## Grid and composition grammar

- **Grid principle:** Asymmetrisches 12-Spalten-Architekturraster auf Desktop, 6 Spalten auf Tablet, 4 Spalten auf Mobile.
- **Alignment anchors:** Durchgehende vertikale und horizontale Haarlinienanker; Inhalte sitzen bündig auf Rasterlinien statt frei im Raum zu schweben.
- **Rules for asymmetry, overlap, bleed, or whitespace:** Keine künstlichen Schatten-Karten; Produkte ruhen auf Plattformen, abgegrenzt durch 1px Haarlinien.
- **Repeated composition behavior:** Hero-Abschnitte kombinieren großformatige Fotografie links mit einer strukturierten technischen Spezifikationsspalte rechts.
- **Composition behavior that must not repeat:** Keine identischen 3-Karten-Reihen ohne rhythmischen Wechsel.

## Spacing and density rhythm

- **Macro section rhythm:** Großzügige Abstände (`py-16` bis `py-24` auf Desktop, `py-10` bis `py-12` auf Mobile) für Galeriebereiche; kompaktere Taktung (`py-6` bis `py-8`) in der Händleransicht.
- **Dense versus quiet moments:** Das Dashboard und die Photometrie-Tabellen sind dicht und scanbar; die Produktbühne und das Atelier-Manifest sind kontemplativ und ruhig.
- **Text measure and vertical cadence:** Fließtextzeilen sind auf maximal 65–75 Zeichen limitiert (`max-w-prose`).

## Image direction

- **Subject matter and point of view:** Echte Leuchtenfotografie im architektonischen Raum. Handwerkliche Detailaufnahmen von Messingpatina, Gesteinsstrukturen, mundgeblasenem Glas und präzisen Lichtausbrüchen.
- **Lighting, color, and treatment:** Hohe plastische Tiefe, ruhiges Dämmerlicht oder klares nordisches Tageslicht. Keine synthetischen Stockfoto-Gesten.
- **Editorial versus product balance:** 60% freigestellte oder studiofotografische Produktansichten, 40% räumliche Situationsaufnahmen.
- **What images must never look like:** Keine bunten Neon-Glows, keine generischen 3D-Renderings ohne Materialhaptik, keine unnatürlichen KI-Artefakte.

### Crop and focal-point behavior

- **Default crop logic:** Feste architektonische Seitenverhältnisse: 16:10 für Raumansichten, 4:5 für Porträts, 1:1 für Detail-Swatches.
- **Desktop focal behavior:** Schärfepunkt liegt zentriert auf dem leuchtenden Körper oder der Materialverbindung.
- **Mobile crop or alternate asset logic:** Vertikaler Zuschnitt unter Beibehaltung des Leuchtenkopfes; keine abgeschnittenen Diffusoren.

## Material language

- **Texture and material treatment:** Matter Vulkanbasalt, gebürstetes Rohmessing, sandgestrahltes Aluminium, mundgeblasenes Milchglas.
- **Shape vocabulary:** Orthogonal, monolithisch, diszipliniert.
- **Radius logic:** Strikte 0px bis maximal 2px Eckenradien (`rounded-none` / `rounded-sm`) für architektonische Schärfe.
- **Border, shadow, and depth logic:** Tiefe entsteht durch Tonwerte und Haarlinien (`border border-stone-200/80` oder `border-white/10`). Keine weichen Gaußschen Schlagschatten.
- **Icon direction:** Reduzierte, linienbasierte SVGs mit 1.5px Strichstärke, passend zur Haarlinien-Architektur.

## Interaction and motion personality

- **Interaction personality:** Gewichtsvoll, präzise, reaktionsschnell. Wie ein massiver Dimmerknopf aus Vollmessing.
- **Motion personality:** Sanftes Ein- und Ausblenden von Lichtwerten (200–300ms ease-out), ruhige Entfaltung von Schubladen und Menüs.
- **Animation density:** Keine dauerhaften Loop-Animationen. Bewegung dient ausschließlich dem Zustandswechsel (Licht an/aus, Filter aktiv).
- **Page transition character:** Subtiles Deckkraft-Fade (150ms), keine ruckartigen Seitenverschiebungen.
- **Reduced-motion interpretation:** Bei `prefers-reduced-motion: reduce` werden alle räumlichen Übergänge deaktiviert; Lichtfarben und Opazitäten schalten instant um.

## Responsive art direction

### Desktop (≥ 1280px)

Volle 12-Spalten-Architektur mit getrennten Zonen für Raumbühne, Photometrie und Konfigurationsmatrix.

### Tablet transformation (768px – 1279px)

Reflow in 6-Spalten-Layout; Telemetriespalten docken sauber unter die Produktbühne; Filter bleiben als horizontale Leiste verfügbar.

### Mobile (< 768px)

Umwandlung in ein klares, vertikales Buchformat. Touch-Ziele sind mindestens 44×44px groß. Filter und Warenkorb-Details lassen sich über intuitive Sheets einblenden.

## Required signature moments

1. **Signature moment one: Interaktiver Leuchten-Konfigurator mit Lichtfarben- & Dämmerungssimulation**
   - Brand connection: Erlebbarmachung der Kernkompetenz von LUMENWERK — Lichtstimmung im Raum steuern.
   - Route/state: `/konfigurator` (und interaktiv auf Produktdetailseiten)
   - Responsive and reduced-motion behavior: Funktioniert auf Touchscreens durch direkte Swatch-Buttons und Schieberegler; bei reduzierter Bewegung entfällt der Lichtübergang, die Farbe wechselt instant.
2. **Signature moment two: Synchronisierte Händleransicht mit Echtzeit-Demo-Order-Integration & KPI-Kausalität**
   - Brand connection: Authentische B2B-Transparenz und professionelle Arbeitsumgebung für Handelspartner.
   - Route/state: `/haendler`
   - Responsive and reduced-motion behavior: Echte Neuberechnung aller KPIs bei Datumswechsel oder neuer Demo-Bestellung im Browser. Responsives horizontales Scrollen oder Kartenumwandlung auf Mobilgeräten.

## Controlled exceptions

- Der interaktive Raum im Konfigurator darf vollflächig dunkel sein (`#141416`), um die Kelvin-Lichtwirkung optisch korrekt darzustellen.
- Modale Auftragsdetails in der Händleransicht verwenden für maximale Konzentration auf Belegdaten einen dunklen Backdrop (`rgba(0,0,0,0.6)`).

## Stitch exploration policy

- **Use Stitch for new visual exploration (`Yes` or `No`):** Yes
- **May create or update Stitch projects and screens (`Yes` or `No`):** Yes
- **Target initial directions (`0`, `2`, or `3`):** 2
- **May use supplied references, screenshots, sketches, or wireframes in Stitch (`Yes` or `No`):** Yes
- **May export permitted visual handoff material locally (`Yes` or `No`):** Yes
- **Required concepts record (project and screen identifiers or links, prompts, selection rationale, implementation notes):** Recorded in [`concepts/README.md`](../../concepts/README.md) under Stitch project `projects/6052545706471218584`.

## Gestaltungsentscheidungen der visuellen Überarbeitung (Architectural Chiaroscuro Overhaul)

Um die Seite aus der schematischen Schablone generischer E-Commerce-Templates zu befreien, wurden folgende architektonische Gestaltungsentscheidungen getroffen und implementiert:

1. **Hero-Inszenierung als architektonische Raumkomposition:**
   - _Entscheidung:_ Befreiung von KORONA I aus dem repetitiven 2-Spalten-Kartenraster („Headline links, Kachel rechts“). Die Pendelleuchte wird als skulpturales Zentrum in einem tiefen Chiaroscuro-Raum (`#141416`) inszeniert, dessen bernsteinfarbener Lichtschein (`#E28C47`) die Raumgrenzen atmosphärisch moduliert.
   - _Rationale:_ LUMENWERK versteht Licht als Baustoff. Eine Leuchte muss im Raum wirken und Licht werfen, statt in einer isolierten Produktkachel zu stehen.

2. **Aufbrechen schematischer Dreierspalten & Reduktion repetitiver Chrome:**
   - _Entscheidung:_ Beseitigung monotoner 3-Spalten-Boxen und ubiquitärer `border border-stone-200`-Kästen. Rigorose Reduktion der allgegenwärtigen `text-[10px] font-mono uppercase`-Pill-Badges.
   - _Rationale:_ Wiederholen sich Rahmen und Mono-Labels auf jedem Element, verflacht die visuelle Hierarchie vollständig („Template-Look“). Durch den Wechsel von dichten und offenen Flächen entsteht ein redaktioneller Lesefluss.

3. **Katalog mit kuratierter architektonischer Dramaturgie:**
   - _Entscheidung:_ Überführung des 7-Produkte-Rasters in eine gegliederte Werkschau:
     - _Flagship-Spotlight:_ Großformatige Querformat-Inszenierung der KORONA I mit vollständiger Spezifikation und Direktlink zur Konfiguration.
     - _Asymmetrische Werkpaare:_ Gegenüberstellung von gegensätzlichen Skulpturen (z. B. monolithische Basalt-Tischleuchte SOLIS DISK neben flachem Wandgrazer STRATA GRAZER; vertikales Totem AURA COLUMN neben opaler Sphäre KYOTO PENDANT).
     - _Architektonisches Intermezzo:_ Eine ruhige typografische Zäsur mit Lichtmanifest zur Kontemplation.
   - _Rationale:_ Designobjekte verlangen nach individueller Maßstäblichkeit. Ein Richtstrahler (MONO ATELIER) und eine Raumskulptur (KORONA I) besitzen unterschiedliche architektonische Dimensionen und dürfen nicht in identischen quadratischen Boxen nivelliert werden.

4. **Produktdetail: Materielle Sinnlichkeit & Lichtarchitektur:**
   - _Entscheidung:_ Großzügige, atmosphärische Bildbühne; klar gegliederte Photometrie-Matrix mit exakten Kennzahlen (CRI Ra 98.4, R9 > 92, Abstrahlcharakteristik, DALI-2/Casambi); taktile Materialbeschreibungen der Patina.
   - _Rationale:_ Architekten und Bauherren spezifizieren Leuchten anhand zweier Kriterien: physische Materialqualität bei Tag und photometrische Exzellenz bei Nacht.

5. **Händler-Dashboard mit autoritativer Hierarchie:**
   - _Entscheidung:_ Ersetzung der fünf gleichförmigen Kacheln durch eine zweistufige Hierarchie: Dominante Primärbühne für Bruttoumsatz und Bestellungen mit auffälliger Live-Delta-Anzeige für Browser-Demo-Bestellungen; darunter ein ruhiges Ledger-Band für sekundäre Betriebsdaten (Ø Bestellwert, Conversion Rate, Fertigungsstatus).
   - _Rationale:_ Ein B2B-Werkzeug braucht klare kaufmännische Schwerpunkte. Umsatz und Bestellvolumen sind die operativen Leitmetriken; alles Weitere dient der Detailsteuerung.

6. **Authentische Werkstattfotografie im Atelier-Bereich:**
   - _Entscheidung:_ Austausch des fehlassoziierten Deckenstrahler-Bildes gegen die authentische Manufakturaufnahme `atelier-craft.jpg` (Handarbeit an der Drehbank mit Messingspänen und Werkzeugen).
   - _Rationale:_ Das Manifest „Gegen die Vergänglichkeit des Industriellen“ erfordert echte handwerkliche Beweise statt unpassender Produktkacheln.

## Explicit anti-patterns

- Kein generisches SaaS-Dashboard mit lila Farbverläufen und runden Pillen.
- Keine Fake-Kundenbewertungen („5 Sterne von Lisa M.“).
- Keine Countdown-Timer oder falsche Knappheitsmeldungen.
- Keine simulierten Zahlungs-Gateways mit gefälschten Kreditkartenfeldern.
- Keine unbeschrifteten Platzhalterdaten.

## Final visual quality bar

LUMENWERK Studio präsentiert sich als digitaler Meilenstein für Design-E-Commerce: Eine Seite, die sich wie das gedruckte Jahrbuch eines Meisterateliers anfühlt — haptisch, typografisch unverwechselbar, technisch fehlerfrei und auf jedem Viewport von 320px bis 1920px ein Genuss.
