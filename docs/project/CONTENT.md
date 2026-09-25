# Content source of truth

Specification status: READY

This file owns the actual approved copy, products, projects, structured content data, contact details, and media assignments. Implementation modules such as `src/data/products.ts` or `src/data/merchant.ts` are derived directly from this document and do not maintain conflicting manual sources of truth. Scope and behavior belong in [`SITE.md`](SITE.md), visual use and motion direction in [`DESIGN.md`](DESIGN.md), and completion checks in [`ACCEPTANCE.md`](ACCEPTANCE.md).

## Brand content

- **Brand name:** LUMENWERK Studio
- **Tagline:** Skulpturales Licht & Architektonische Leuchten
- **Short descriptor:** Unabhängiges Atelier für funktionale Lichtobjekte, handgedrehtes Messing, Vulkanbasalt und kalibrierte LED-Photometrie.
- **Voice constraints:** Ruhig, präzise, architektonisch fundiert, ehrlich und kunsthandwerklich. Keine Superlative („das Beste der Welt“), keine künstliche Verknappung („nur noch 1 übrig!“), keine Marketing-Phrasen.
- **Required capitalization, punctuation, and naming:**
  - „LUMENWERK“ stets in Versalien für den Markenkern.
  - Modellnamen stets in Versalien mit römischer Ziffer oder Modellzusatz: „KORONA I“, „SOLIS DISK“, „AURA COLUMN“, „STRATA GRAZER“, „KYOTO PENDANT“, „MONO ATELIER“, „LUMEN GLOBE“.
  - Maße und Photometrie präzise mit Einheit: `lm` (Lumen), `K` (Kelvin), `CRI Ra`, `W` (Watt), `mm`.

## Navigation labels

| Label          | Destination/action | Mobile label if different | Rewrite allowed? |
| -------------- | ------------------ | ------------------------- | ---------------- |
| LUMENWERK      | `/`                | LUMENWERK                 | No               |
| Katalog        | `/katalog`         | Katalog                   | No               |
| Konfigurator   | `/konfigurator`    | Konfigurator              | No               |
| Atelier        | `/atelier`         | Atelier                   | No               |
| Händleransicht | `/haendler`        | Händler (Demo)            | No               |
| Warenkorb      | `/warenkorb`       | Warenkorb                 | No               |

## Page-by-page copy

### Route: `/` (Startseite)

- **Metadata title:** LUMENWERK Studio — Skulpturales Licht & Architektonische Leuchten
- **Metadata description:** High-End Leuchtenmanufaktur und Design-Atelier für skulpturale Lichtobjekte, Handwerkskunst und präzise architektonische Photometrie.
- **Primary headline:** Licht als skulpturale Materie.
- **Supporting copy:** Wir formen Leuchten aus archaischem Basalt, feinstem Drehmessing und mundgeblasenem Glas. Tagsüber ruhen sie als stille Raumplastiken — bei Dämmerung definieren sie die Architektur des Raumes.
- **Primary CTA label and destination:** Sortiment erkunden (`/katalog`)
- **Secondary CTA label and destination:** Licht konfigurieren (`/konfigurator`)

### Route: `/katalog` (Sortiment)

- **Metadata title:** Katalog & Sortiment — LUMENWERK Studio
- **Metadata description:** Entdecken Sie unsere kuratierte Kollektion handgefertigter Pendel-, Steh-, Tisch- und Wandleuchten.
- **Primary headline:** Die Kollektion.
- **Supporting copy:** Sieben skulpturale Leuchten, gefertigt in limitierter Atelierauflage mit messbarer photometrischer Präzision.
- **Filter-Labels:** Alle Kategorien, Pendelleuchten, Tisch- & Bodenobjekte, Wand- & Deckenleuchten.

### Route: `/konfigurator` (Leuchten-Konfigurator)

- **Metadata title:** Leuchten-Konfigurator — LUMENWERK Studio
- **Metadata description:** Konfigurieren Sie Oberfläche, Diffusor, Kelvin-Lichtfarbe und Abhängelänge in unserer interaktiven Atelier-Simulation.
- **Primary headline:** Atelier-Konfigurator.
- **Supporting copy:** Passen Sie Korpus, Materialveredelung und Lichtfarbe präzise an Ihren architektonischen Raum an.

### Route: `/warenkorb` (Warenkorb)

- **Metadata title:** Warenkorb — LUMENWERK Studio
- **Metadata description:** Ihre ausgewählten Lichtobjekte und individuellen Atelier-Konfigurationen im Überblick.
- **Primary headline:** Ihr Warenkorb.
- **Empty state copy:** Ihr Warenkorb ist derzeit leer. Entdecken Sie unsere Leuchten im Katalog oder konfigurieren Sie ein individuelles Lichtobjekt.

### Route: `/kasse` (Demo-Bestellabschluss)

- **Metadata title:** Demo-Bestellabschluss — LUMENWERK Studio
- **Metadata description:** Schließen Sie Ihre unverbindliche Demo-Bestellung ab. Es werden keine Zahlungsdaten erhoben.
- **Primary headline:** Demo-Auftragserfassung.
- **Demo notice copy:** **WICHTIGER DEMO-HINWEIS:** Dies ist ein fiktives Portfolio-Showcase. Es werden keine echten Zahlungen abgewickelt, keine Kreditkartendaten verlangt und keine realen Lieferungen veranlasst. Ihre Bestellung wird lokal in Ihrem Browser gespeichert und erscheint sofort in der Händleransicht.

### Route: `/haendler` (Händleransicht – Demo Cockpit)

- **Metadata title:** Händleransicht (Demo) — LUMENWERK Cockpit
- **Metadata description:** Professionelle Arbeitsübersicht für Vertriebs- und Handelspartner mit nachvollziehbaren Kennzahlen, Auftragslisten und Lagerbeständen.
- **Primary headline:** Händler-Cockpit.
- **Supporting copy:** Reale Auswertung basierend auf datierten Bestell- und Besuchsereignissen. Umschaltbar über 7, 30 und 90 Tage.

## Products: Der kuratierte Katalog (7 Leuchten)

| ID              | Name          | Kategorie              | Material                                | Maße                 | Lichtstrom & Kelvin              | Basispreis | Lagerbestand | Kurzbeschreibung                                                                                |
| --------------- | ------------- | ---------------------- | --------------------------------------- | -------------------- | -------------------------------- | ---------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `korona-i`      | KORONA I      | Pendelleuchten         | Handpoliertes Drehmessing & Basaltglas  | Ø 480 mm, H 380 mm   | 1.850 lm, 2200–4000K Dim-to-Warm | 3.450 €    | 6 Stück      | Skulpturale Pendelleuchte mit ausbalanciertem Messing-Gegenkörper und sanfter Tiefenstrahlung.  |
| `solis-disk`    | SOLIS DISK    | Tisch- & Bodenobjekte  | Geschliffener Vulkanbasalt & Rohmessing | Ø 320 mm, H 240 mm   | 1.100 lm, 2700K Warmweiß         | 1.890 €    | 12 Stück     | Taktile Tischleuchte mit kapazitivem Berührungsdimmer im Basaltfuß.                             |
| `aura-column`   | AURA COLUMN   | Tisch- & Bodenobjekte  | Stranggepresste Bronze & Rillenoptik    | H 1.720 mm, B 140 mm | 3.200 lm, 2700K Indirekt         | 4.200 €    | 4 Stück      | Monumentale Stehleuchte mit 360° vertikalem Wandscheinwerfer für hohe Räume.                    |
| `strata-grazer` | STRATA GRAZER | Wand- & Deckenleuchten | Eloxiertes Champagner-Aluminium         | L 600 mm, T 80 mm    | 920 lm, 3000K Neutral            | 1.640 €    | 8 Stück      | Präzisionsgefräste Wandleuchte mit blendfreier Lamellen-Lichtlenkung nach oben und unten.       |
| `kyoto-pendant` | KYOTO PENDANT | Pendelleuchten         | Mundgeblasenes dreischichtiges Opalglas | Ø 360 mm, H 420 mm   | 1.450 lm, 2700K Diffus           | 2.150 €    | 9 Stück      | Schwebender Glaskörper mit schwereloser Tiefenwirkung, mundgeblasen in traditioneller Holzform. |
| `atelier-mono`  | MONO ATELIER  | Wand- & Deckenleuchten | Brüniertes Eisen & optische Glaslinse   | Ø 90 mm, L 180 mm    | 780 lm, 3000K / 24° Spot         | 890 €      | 15 Stück     | Kompakter Richtstrahler für Kunstwerke und architektonische Fluchtlinien.                       |
| `lumen-globe`   | LUMEN GLOBE   | Pendelleuchten         | Mattiertes Kristallglas & Rauchbronze   | Ø 400 mm, H 400 mm   | 2.100 lm, 2400–3500K             | 2.780 €    | 7 Stück      | Harmonische Lichtsphäre mit unsichtbarer Bajonett-Kupplung für monolithische Deckenintegration. |

### Varianten-Matrix

Jedes Produkt besitzt definierte Varianten:

- **KORONA I:**
  - `Standard`: Handpoliertes Messing (3.450 €)
  - `Vulkanbasalt Patina`: Geschwärzter Basalt-Look (+320 € → 3.770 €)
  - `Schwarzstahl Atelier`: Roher geölter Zunderstahl (+180 € → 3.630 €)
- **SOLIS DISK:**
  - `Standard`: Vulkanbasalt & Messing (1.890 €)
  - `Carrara Marmor Edition`: Feiner weißer Marmor (+260 € → 2.150 €)
- **AURA COLUMN:**
  - `Standard`: Dunkle Bronze gebürstet (4.200 €)
  - `Nachtschwarz Matt`: Feinstruktur-Pulverbeschichtung (4.200 €)

## Händleransicht: Kennzahlen & Beispieldatensatz

### Mathematische Definitionen und KPI-Kausalität

Um Datenintegrität zu garantieren, werden keine isolierten Zufallszahlen generiert. Alle Metriken berechnen sich streng aus den im gewählten Zeitraum liegenden Datensätzen:

1. **Umsatz / Bestellwert (€):**
   $$\text{Gesamtbestellwert} = \sum_{o \in \text{Orders}(t)} \text{orderTotal}(o)$$
   _(Summe aller berechneten Bestellwerte im Zeitfenster $t$. Unbezahlte Demo-Orders werden als „Ausstehend / In Erfassung“ ausgewiesen)._

2. **Bestellungen:**
   $$\text{Bestellungen} = |\text{Orders}(t)|$$

3. **Durchschnittlicher Bestellwert (AOV - Average Order Value):**
   $$\text{AOV} = \begin{cases} \frac{\text{Gesamtbestellwert}}{\text{Bestellungen}}, & \text{wenn Bestellungen} > 0 \\ 0, & \text{sonst} \end{cases}$$

4. **Besucher & Sitzungen:**
   - Ein Besucher (Unique Visitor) kann mehrere Sitzungen (Sessions) erzeugen.
   - Modellierter Faktor: ~1.28 Sitzungen pro Besucher.
   - Zeitfenster 7 Tage: 412 Besucher / 528 Sitzungen.
   - Zeitfenster 30 Tage: 1.840 Besucher / 2.360 Sitzungen.
   - Zeitfenster 90 Tage: 5.420 Besucher / 6.940 Sitzungen.

5. **Conversion-Rate (CR %):**
   $$\text{CR} = \left( \frac{\text{Bestellungen}}{\text{Sitzungen}} \right) \times 100$$
   _(Präzise berechnet und auf 2 Nachkommastellen gerundet)._

### Kuratierter historischer Beispieldatensatz (7 Orders)

1. `LW-2026-9102` | 24.09.2026 | Architekturbüro Kahl & Partner, Wien | 1x KORONA I (Messing), 2x SOLIS DISK | 7.230,00 € | Abgeschlossen | Beispieldaten
2. `LW-2026-8984` | 21.09.2026 | Studio Thulstrup Interiors, Kopenhagen | 2x AURA COLUMN (Bronze) | 8.400,00 € | Versendet | Beispieldaten
3. `LW-2026-8741` | 15.09.2026 | Galerie Hinterland, Berlin | 4x STRATA GRAZER, 2x MONO ATELIER | 8.340,00 € | Abgeschlossen | Beispieldaten
4. `LW-2026-8419` | 02.09.2026 | Privathaus am Attersee, Salzburg | 1x KORONA I (Basalt), 1x KYOTO PENDANT | 5.920,00 € | Abgeschlossen | Beispieldaten
5. `LW-2026-8102` | 24.08.2026 | Penthouse Seestadt, Wien | 2x KYOTO PENDANT, 1x SOLIS DISK | 6.190,00 € | Abgeschlossen | Beispieldaten
6. `LW-2026-7840` | 11.08.2026 | Boutique Hotel Kitzbühel | 6x MONO ATELIER, 2x STRATA GRAZER | 8.620,00 € | Abgeschlossen | Beispieldaten
7. `LW-2026-7512` | 29.07.2026 | Kanzlei Dr. Eder & Partner, Graz | 1x AURA COLUMN, 1x SOLIS DISK | 6.090,00 € | Abgeschlossen | Beispieldaten

### Verhalten lokaler Demo-Bestellungen

Wenn ein Nutzer im Browser eine Bestellung über `/kasse` aufgibt:

- Sie erhält das aktuelle Datum (z.B. 25.09.2026) und eine generierte ID `LW-2026-[RANDOM]`.
- Sie erhält den Status `"Neu / Demo-Eingang"` und die Herkunft `"Lokale Demo-Bestellung"`.
- Sie wird im `localStorage` unter `lumenwerk_demo_orders` gespeichert.
- Die Händleransicht aggregiert historische Beispieldaten + lokale Demo-Bestellungen.
- Alle KPIs verändern sich sofort kausal und nachvollziehbar!
- Ein Klick auf „Demo zurücksetzen“ entfernt die lokalen Bestellungen und stellt den Ausgangsbelegstand wieder her.

## Image and media assignments

Alle Bilddateien sind lokal im Projekt abgelegt unter `public/media/` und werden über `scripts/build-images.mjs` in 10 responsive WebP-Breiten konvertiert:

| ID                  | Dateipfad                        | Verwendung                        | Seitenverhältnis | Alt-Text                                                                                                   |
| ------------------- | -------------------------------- | --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `img-hero-korona`   | `public/media/korona-i.jpg`      | Startseite Hero & KORONA I Detail | 16:10            | Skulpturale Pendelleuchte KORONA I aus handgedrehtem Messing und getöntem Glas in architektonischer Nische |
| `img-solis-disk`    | `public/media/solis-disk.jpg`    | Katalog & SOLIS DISK Detail       | 4:3              | Tischleuchte SOLIS DISK aus rauem Vulkanbasalt und matt gebürstetem Messing                                |
| `img-aura-column`   | `public/media/aura-column.jpg`   | Katalog & AURA COLUMN Detail      | 4:5              | Monumentale Bronze-Stehleuchte AURA COLUMN mit vertikalem Wandscheinwerfer                                 |
| `img-strata-grazer` | `public/media/strata-grazer.jpg` | Katalog & STRATA Detail           | 16:10            | Gefräste Wandleuchte STRATA GRAZER mit auf- und abwärts gerichtetem Lichtaustritt                          |
| `img-kyoto-pendant` | `public/media/kyoto-pendant.jpg` | Katalog & KYOTO Detail            | 4:5              | Mundgeblasene Leuchte KYOTO PENDANT aus dreischichtigem Opalglas                                           |
| `img-atelier-mono`  | `public/media/atelier-mono.jpg`  | Katalog & MONO Detail             | 1:1              | Minimalistischer Richtstrahler MONO ATELIER aus geschwärztem Eisen                                         |
| `img-lumen-globe`   | `public/media/lumen-globe.jpg`   | Katalog & LUMEN GLOBE Detail      | 1:1              | Sphärische Pendelleuchte LUMEN GLOBE mit warmer Lichtverteilung                                            |
| `img-atelier-space` | `public/media/atelier-space.jpg` | Atelier-Seite & Raummanifest      | 16:9             | Tageslichtdurchflutetes LUMENWERK Atelier mit Werkbank und Entwurfsmodellen                                |

## Contact information

- **Public email:** atelier@lumenwerk.studio (Fiktive Demo-Adresse)
- **Telephone:** +43 1 522 94 10 (Atelier Wien Neubau)
- **Address:** Kirchengasse 24, A-1070 Wien / Torstraße 88, D-10119 Berlin
- **Opening/response hours:** Montag bis Freitag, 10:00 – 18:00 Uhr nach Terminvereinbarung

## Legal and demo notices

- **Demo disclosure:** LUMENWERK Studio ist ein fiktives Design- und E-Commerce-Showcase zur Demonstration moderner Web-Technologien, Barrierefreiheit und responsiver Frontend-Architektur. Keine echten Kaufverträge, keine realen Lieferungen.
- **Copyright:** © 2026 LUMENWERK Studio. Alle Rechte vorbehalten.
