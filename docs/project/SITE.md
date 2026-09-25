# Site specification

Specification status: READY

This file owns the current showcase's purpose, product scope, routes, sections, user journeys, behavior, and non-goals. Describe each section's purpose and content before deciding its layout. Visual and motion direction belongs in [`DESIGN.md`](DESIGN.md), approved copy and content data in [`CONTENT.md`](CONTENT.md), and completion checks in [`ACCEPTANCE.md`](ACCEPTANCE.md). Acceptance checks may verify this scope but may not silently expand or contradict it.

## Project identity and purpose

- **Project name:** LUMENWERK Studio — Atelier für skulpturales Licht & Architektonische Leuchten
- **Industry:** High-End Architectural Lighting / Skulpturale Designleuchten & Lichtobjekte
- **Project type:** Eigenständiges digitales E-Commerce- & Portfolio-Showcase mit integrierter Händleransicht
- **Portfolio purpose:** Erstellung eines kompromisslos gestalteten, typografisch und atmosphärisch herausragenden Design-Onlineshops mit integrierter Händleransicht für ein architektonisches Leuchtenstudio. Nachweis für High-End Next.js 16 App Router Architektur, statischen Export (`out/`), vollständige Keyboard- & Screenreader-Zugänglichkeit (Axe-Clean), ein interaktives Signature-Feature (Leuchten-Konfigurator mit physikalischer Lichtfarben- und Materialvorschau) sowie eine getrennte, datenintegre Händleransicht ("Händleransicht – Demo") mit echten Formelberechnungen und lokaler Persistenz.
- **Target audience:**
  - _Shop:_ Architekten, Innenarchitektinnen, Lichtplaner, Designliebhaber und anspruchsvolle Privatkunden auf der Suche nach skulpturalen Lichtobjekten.
  - _Händleransicht:_ Studio-Inhaber, Vertriebspartner und Fachhändler zur Einsicht in Bestellungen, Kennzahlen (KPIs) und Bestände.
  - _Evaluatoren:_ Frontend- und Design-Gutachter, die Code-Qualität, Responsive-Verhalten, Barrierefreiheit und Domänenarchitektur bewerten.
- **Desired user impression:** Hochwertig, ruhig, architektonisch präzise, haptisch spürbar und inspirierend. Das Studio vermittelt meisterhaftes Handwerk (Messingdreherei, Mundblasung, Vulkanbasalt) und modernste Lichttechnik (CRI 98+, Dim-to-Warm, DALI-2). Keine generischen SaaS-Muster, keine Fake-Verknappung.
- **Brand premise:** LUMENWERK ist ein unabhängiges Lichtatelier mit Werkstätten in Wien (Neubau) und Berlin. Jede Leuchte wird als architektonische Skulptur verstanden, die tagsüber als ruhiges Raumobjekt wirkt und nachts durch präzise photometrische Lichtverteilung Räume definiert.

## Sitemap and routes

List every public route. Route paths are the source for `tests/e2e/routes.ts`.

| Route                     | Page purpose                                                                         | Primary audience need                                                                | Direct-load requirement |
| ------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------- |
| `/`                       | Einstieg, Markenidentität, Flagship-Hero KORONA I, Kuration, Materialphilosophie     | Orientierung, Atelier-Charakter erleben, direkte Einstiege in Katalog & Konfigurator | Yes                     |
| `/katalog`                | Vollständiges Sortiment (7 Leuchten), Filter (Kategorie, Material, Raum), Sortierung | Schneller Überblick, gezielte Suche nach Dimension, Material und Lichtwirkung        | Yes                     |
| `/produkte/korona-i`      | Produktdetailseite der skulpturalen Messing-Pendelleuchte KORONA I                   | Photometrie, Maße, Materialvarianten, Variantenwechsel, In den Warenkorb             | Yes                     |
| `/produkte/solis-disk`    | Produktdetailseite des Basalt- & Messing-Tischobjekts SOLIS DISK                     | Touch-Dimming, Gewicht, Gesteinsherkunft, Varianten, In den Warenkorb                | Yes                     |
| `/produkte/aura-column`   | Produktdetailseite der monumentalen Stehleuchte AURA COLUMN                          | Raumgrazing, Casambi-Steuerung, Maße, Varianten, In den Warenkorb                    | Yes                     |
| `/produkte/strata-grazer` | Produktdetailseite der gefrästen Wandleuchte STRATA GRAZER                           | Wandflutung, Lamellenoptik, CRI 98+, Varianten, In den Warenkorb                     | Yes                     |
| `/produkte/kyoto-pendant` | Produktdetailseite der mundgeblasenen Opalglas-Leuchte KYOTO PENDANT                 | Diffuses Raumlicht, Glasbläserkunst, Varianten, In den Warenkorb                     | Yes                     |
| `/produkte/atelier-mono`  | Produktdetailseite des minimalistischen Deckenstrahlers MONO ATELIER                 | Akzentlicht, Abstrahlwinkel 24°/36°, Varianten, In den Warenkorb                     | Yes                     |
| `/produkte/lumen-globe`   | Produktdetailseite des schwebenden Lichtkörpers LUMEN GLOBE                          | 360° Sphärenlicht, handgefertigte Halterung, Varianten, In den Warenkorb             | Yes                     |
| `/konfigurator`           | Interaktiver Leuchten-Konfigurator (Signature Moment 1)                              | Modell, Material, Schirm, Kelvin & Drop konfigurieren, Preis/SKU live berechnen      | Yes                     |
| `/warenkorb`              | Voll funktionsfähiger Warenkorb mit Mengen, Entfernen, Preisen und Reload-Persistenz | Übersicht über ausgewählte Positionen, Mengenprüfung gegen Bestand, Kasse aufrufen   | Yes                     |
| `/kasse`                  | Honest Demo-Bestellabschluss mit lokaler Belegnummer und Adresserfassung             | Sichere Demo-Bestellung ohne echte Zahlungsdaten auslösen, Beleg generieren          | Yes                     |
| `/atelier`                | Philosophie, Werkstätten (Wien & Berlin), Materialien, ehrliche Portfolio-Einordnung | Verständnis der handwerklichen Herkunft, Transparenz über fiktives Konzept           | Yes                     |
| `/haendler`               | Professionelle Händleransicht – Demo mit echten KPIs, Zeiträumen & Bestellliste      | Umsatz, Bestellungen, AOV, Conversion, Besucher, Bestände und lokale Demo-Orders     | Yes                     |

## Navigation

- **Primary navigation model:** Feste, semantische Desktop-Kopfzeile (`<header>` und `<nav>`) mit dezentem Frosted-Stone-Hintergrund, klarem Markenlogo „LUMENWERK“, internen Routenlinks (`Katalog`, `Konfigurator`, `Atelier`), Händler-Umschalter („Händleransicht“) und interaktivem Warenkorb-Indikator mit dynamischer Positionsanzahl.
- **Global navigation labels and destinations:**
  - `Katalog` → `/katalog`
  - `Konfigurator` → `/konfigurator`
  - `Atelier` → `/atelier`
  - `Händleransicht` → `/haendler`
  - `Warenkorb` → `/warenkorb`
- **Mobile navigation behavior:** Vollständig zugängliches, fokussicheres Drawer-/Offcanvas-Menü mit Hamburger-Toggle-Button (`aria-expanded`, `aria-controls`), das sich per ESC-Taste, Klick außerhalb oder Tastatur schließt.
- **Footer or secondary navigation:**
  - Spalten für _Sortiment_ (`/katalog`, `/konfigurator`), _Atelier_ (`/atelier`), _B2B & Handel_ (`/haendler`), _Rechtliches & Demo-Hinweis_ (Transparenz über fiktiven Showcase-Status).
- **Active, external, download, and back-link behavior:** Aktive Navigationselemente werden semantisch über `aria-current="page"` und visuell über eine subtile Bernsteinaura gekennzeichnet. Zurück-Links nutzen Standard-Browser-History oder explizite Pfade.

## Route sections

### Route: `/` (Startseite)

**Page purpose:** Emotionaler und handwerklicher Einstieg in die Welt von LUMENWERK. Vorstellung des Flagship-Modells KORONA I, Erklärung des Zusammenspiels von Material und Licht, Kuratierte Auswahl und Einstiege in Katalog und Konfigurator.

| Section               | Purpose                                          | Required content/data                           | Required action or interaction         | Priority  |
| --------------------- | ------------------------------------------------ | ----------------------------------------------- | -------------------------------------- | --------- |
| Hero Spotlight        | Präsentation Flagship KORONA I                   | Hero-Fotografie, Titel, Subtitel, Kelvin-Badge  | Klick zu Detailseite & Konfigurator    | Primary   |
| Kuration / Bestseller | Übersicht ausgewählter skulpturaler Leuchten     | 4 kuratierte Leuchten mit Preisen & Material    | Link zur jeweiligen Produktdetailseite | Primary   |
| Konfigurator Teaser   | Vorstellung des interaktiven Licht-Konfigurators | Interaktiver Teaser mit Material & Lichtfarben  | Direktsprung zu `/konfigurator`        | Primary   |
| Atelier Manifest      | Philosophischer Exkurs über Schatten & Licht     | Manifesttext, Werkstatt-Standorte Wien & Berlin | Link zu `/atelier`                     | Secondary |
| Photometrie & B2B     | Vertrauensanker für Planer & Architekten         | CRI 98+, DALI-2, Casambi, IES-Daten             | Link zu `/haendler`                    | Secondary |

### Route: `/katalog` (Sortiment & Katalog)

**Page purpose:** Vollständige Übersicht aller 7 Leuchten des Ateliers mit durchsuchbarer, filterbarer und sortierbarer Präsentation.

| Section               | Purpose                                 | Required content/data                                 | Required action or interaction       | Priority |
| --------------------- | --------------------------------------- | ----------------------------------------------------- | ------------------------------------ | -------- |
| Filter- & Suchleiste  | Präzise Eingrenzung des Sortiments      | Suchfeld, Kategorie-Tabs, Material-Filter, Sortierung | Live-Filterung, Filter-Reset-Button  | Primary  |
| Produkt-Raster        | Präsentation aller gefilterten Leuchten | Bild, Name, Kategorie, Material, Lichtstrom, Preis    | Klick zu `/produkte/[slug]`          | Primary  |
| Leerer Trefferzustand | Hilfreicher State bei 0 Suchergebnissen | Erklärung, Suchbegriff-Anzeige, Reset-Button          | Klick auf „Alle Filter zurücksetzen“ | Primary  |

### Route: `/produkte/[slug]` (Produktdetailseiten)

**Page purpose:** Detaillierte Produktbetrachtung mit hochauflösender Fotografie, technischem Photometrie-Datenblatt, Variantenwahl und direktem Warenkorb-Einschub.

| Section           | Purpose                                     | Required content/data                           | Required action or interaction         | Priority  |
| ----------------- | ------------------------------------------- | ----------------------------------------------- | -------------------------------------- | --------- |
| Produktbühne      | Hochauflösende Ansicht & Lichtstimmung      | Lokales WebP-Bild, Edition-Tag, Modellname      | Zoomen / Bildwechsel                   | Primary   |
| Varianten-Wähler  | Material- & Oberflächenwahl                 | Messing, Basalt, Schwarzstahl mit Aufpreisen    | Variantenwahl aktualisiert SKU & Preis | Primary   |
| Kaufaktion        | Hinzufügen zum Warenkorb                    | Stückpreis, Verfügbarkeitsstatus, Lagerbestand  | Klick „In den Warenkorb“ mit Feedback  | Primary   |
| Technische Daten  | Umfassendes Datenblatt für Planer           | Lumen, Watt, CRI, Farbtemperatur, Maße, Gewicht | Tabellarische Übersicht                | Secondary |
| Konfigurator-Link | Individuelle Anpassung des Modells anbieten | Teaserbox für Sondermaterialien                 | Klick zu `/konfigurator?model=[slug]`  | Secondary |

### Route: `/konfigurator` (Leuchten-Konfigurator – Signature Moment 1)

**Page purpose:** Interaktives Atelier-Werkzeug zur individuellen Konfiguration einer Wunschleuchte mit Echtzeit-Berechnung von Preis, SKU und Lichtstimmung.

| Section                 | Purpose                                       | Required content/data                             | Required action or interaction           | Priority |
| ----------------------- | --------------------------------------------- | ------------------------------------------------- | ---------------------------------------- | -------- |
| Modell-Auswahl          | Wahl der Basiskorpus-Geometrie                | KORONA I (Pendel) oder SOLIS DISK (Tisch)         | Umschaltung Modell                       | Primary  |
| Material & Oberfläche   | Haptische Materialauswahl                     | Handpoliertes Messing, Vulkanbasalt, Schwarzstahl | Visuelle Aktualisierung & Aufpreis       | Primary  |
| Diffusorglas            | Optischer Lichtaustritt                       | Mattes Opalglas, Rauchglas getönt, Bernstein      | Lichtwirkung ändert sich                 | Primary  |
| Farbtemperatur / Kelvin | Lichtstimmung einstellen                      | 2200K (Kerze), 2700K (Warm), 4000K (Neutral)      | Kelvin-Slider/Buttons ändern Lichtschein | Primary  |
| Tag / Nacht Simulation  | Raumhintergrund umschalten                    | Atelier-Tag vs. Chiaroscuro-Nacht                 | Umschalten Lichtkontrast                 | Primary  |
| Live-Zusammenfassung    | Generierter Beleg, SKU, Preis & Bestandscheck | SKU, Lieferzeit, konfigurierter Gesamtpreis       | „Konfiguration in Warenkorb legen“       | Primary  |

### Route: `/warenkorb` (Warenkorb)

**Page purpose:** Transparente Verwaltung aller ausgewählten Standard- und konfigurierten Leuchten mit Bestandsvalidierung.

| Section         | Purpose                                   | Required content/data                               | Required action or interaction       | Priority  |
| --------------- | ----------------------------------------- | --------------------------------------------------- | ------------------------------------ | --------- |
| Positionsliste  | Anzeige aller konfigurierten Artikel      | Bild, Titel, Konfigurationsdetails, Einzelpreis     | Menge +/- ändern, Position entfernen | Primary   |
| Preisübersicht  | Aufschlüsselung von Netto, 20% USt, Total | Zwischensumme (Netto), 20% USt., Versandkosten (0€) | Sofortige Neuberechnung              | Primary   |
| Speicherstatus  | Transparenz über LocalStorage             | Indikator für lokale Speicherung im Browser         | Persistenz über Reload               | Secondary |
| Kassen-Absprung | Weiterleitung zur Demo-Kasse              | Primärer CTA-Button                                 | Klick führt zu `/kasse`              | Primary   |

### Route: `/kasse` (Demo-Bestellabschluss)

**Page purpose:** Transparenter, honest gestalteter Bestellabschluss ohne Täuschung oder Fake-Zahlungsabwicklung. Erzeugung einer lokalen Demo-Bestellung.

| Section           | Purpose                            | Required content/data                                | Required action or interaction      | Priority |
| ----------------- | ---------------------------------- | ---------------------------------------------------- | ----------------------------------- | -------- |
| Demo-Hinweis      | Unmissverständliche Kennzeichnung  | Banner: „DEMO-BESTELLUNG – Keine echte Zahlung“      | Informative Anzeige                 | Primary  |
| Kontaktdaten      | Adresserfassung für den Beleg      | Name, Demo-E-Mail, Lieferadresse, Anmerkung          | Formulareingabe mit Validierung     | Primary  |
| Versandart        | Wahl der Zustellung                | Atelier-Kurier (Kostenlos) vs. White-Glove Spedition | Auswahl ändert Belegdaten           | Primary  |
| Bestellabschluss  | Generierung der lokalen Demo-Order | Bestellübersicht, Gesamtsumme                        | Klick „Demo-Bestellung abschließen“ | Primary  |
| Beleg-Bestätigung | Erfolgsanzeige mit Belegnummer     | Belegnummer (z.B. `LW-2026-8491`), Bestelldatum      | Link zur Händleransicht & Reset     | Primary  |

### Route: `/haendler` (Händleransicht – Demo Cockpit)

**Page purpose:** Ruhige, professionelle Arbeitsoberfläche für Studio-Partner mit nachvollziehbaren Kennzahlen, umschaltbaren Zeiträumen, Lagerübersicht und Auftragsverwaltung.

| Section            | Purpose                                   | Required content/data                                | Required action or interaction         | Priority  |
| ------------------ | ----------------------------------------- | ---------------------------------------------------- | -------------------------------------- | --------- |
| Demo-Kennzeichnung | Transparenz über lokale Beispieldaten     | Banner „Händleransicht – Demo“, Reset-Button         | Demo-Daten auf Standard zurücksetzen   | Primary   |
| Zeitraum-Filter    | Synchroner Filter für alle Metriken       | 7 Tage, 30 Tage, 90 Tage                             | Umschaltung aktualisiert alle Zahlen   | Primary   |
| KPI-Dashboard      | Mathematisch fundierte Kennzahlen         | Bestellwert (€), Orders, AOV (€), Visitors, CR (%)   | Synchrone Berechnung aus Rohdaten      | Primary   |
| Verlaufsgraph      | Zeitliche Entwicklung von Umsatz & Orders | SVG-Liniendiagramm / Balkendiagramm                  | Hover-Tooltip mit Tageswerten          | Primary   |
| Auftragsliste      | Durchsuchbare Tabelle aller Bestellungen  | Datum, Order-ID, Kunde, Betrag, Status, Herkunft     | Suche, Status-Filter, Detail-Modal     | Primary   |
| Herkunftstrennung  | Unterscheidung Sample vs. Browser-Order   | Badge: „Historische Beispieldaten“ vs. „Lokale Demo“ | Klare visuelle Differenzierung         | Primary   |
| Lagerüberblick     | Bestandsstatus aller Leuchten             | Modellname, Bestand, Mindestbestand, Status          | Zeigt Bestand nach lokalen Demo-Orders | Secondary |

## Primary user journeys

1. **Journey: Der vollständige Durchstich (End-to-End Walkthrough)**
   - Entry: Einstieg auf Startseite `/`
   - Steps:
     1. Klick auf „Katalog“ oder „Konfigurator“.
     2. Auf `/konfigurator` Modell KORONA I wählen, Finish „Vulkanbasalt Patina“ wählen, Farbtemperatur auf „2700K Warm Amber“ stellen.
     3. Preisaktualisierung prüfen und Klick auf „Konfiguration in den Warenkorb“.
     4. Auf `/warenkorb` Menge auf 2 erhöhen. Gesamtpreis wird aktualisiert.
     5. Klick auf „Zur Kasse“ → `/kasse`.
     6. Kontaktdaten (z.B. „Architekturbüro Steiner“, „wien@steiner-arch.at“) eingeben und „Demo-Bestellung aufgeben“.
     7. Bestätigungsseite mit generierter Bestellnummer `LW-2026-XXXX` erscheint.
     8. Klick auf Direktlink „In Händleransicht prüfen“ → `/haendler`.
     9. In der Händleransicht erscheint die frisch erzeugte Bestellung mit dem Badge „Lokale Demo-Bestellung (Dieser Browser)“.
     10. Die Dashboard-KPIs (Bestellwert, Anzahl Bestellungen, AOV, Conversion-Rate) haben sich sofort nachvollziehbar um diese Bestellung erhöht.
     11. Browser-Reload durchführen: Die Bestellung und die veränderten KPIs bleiben erhalten!
     12. Klick auf „Demo-Daten zurücksetzen“: Alle Kennzahlen und Bestellungen kehren exakt zum kuratierten Ausgangszustand zurück.
   - Success: Vollständiger, bruchloser Ablauf mit echter lokaler Persistenz und nachweisbarer mathematischer Datenintegrität.
   - Mobile difference: Warenkorb und Tabellen nutzen responsive Karten- und Drawer-Ansichten, Touch-Ziele ≥ 44px.

2. **Journey: Gezielte Leuchtensuche im Sortiment**
   - Entry: Klick auf `/katalog`
   - Steps:
     1. Suchbegriff „Basalt“ in das Suchfeld eingeben.
     2. Sofortige Reduzierung auf die passenden Modelle (SOLIS DISK, KORONA I).
     3. Klick auf Filter „Tisch- & Bodenobjekte“.
     4. Nur noch SOLIS DISK wird angezeigt.
     5. Klick auf „Alle Filter zurücksetzen“ stellt wieder alle 7 Leuchten dar.
   - Success: Keine Seitenladezeiten, reaktive Filterung ohne Layout-Shifts.

## Features and interactions

| Feature or interaction    | User purpose                                | Trigger                              | Expected result                                       | Keyboard/touch behavior                  | Failure or fallback                      |
| ------------------------- | ------------------------------------------- | ------------------------------------ | ----------------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| Leuchten-Konfigurator     | Individuelles Anpassen von Licht & Material | Klick auf Material / Kelvin-Slider   | Bild, Preis, SKU und Lichtschein aktualisieren sich   | Volle Tab- & Pfeiltasten-Navigation      | Standardvariante bleibt aktiv            |
| Warenkorb-Persistenz      | Speichern der Auswahl über Sitzungen hinweg | Position hinzufügen oder ändern      | Daten liegen synchronisiert im Browser-LocalStorage   | Sofortige optische Bestätigung           | Session-Fallback bei Storage-Fehler      |
| Demo-Kassenabschluss      | Simulation eines Atelier-Auftrags           | Klick auf „Demo-Bestellung absenden“ | Eindeutige Belegnummer, Eintrag in Händlerliste       | Enter-Taste im Formular, Tab-Fokus       | Formular zeigt fehlende Pflichtfelder an |
| Händleransicht Zeitfilter | Analyse von 7, 30 oder 90 Tagen             | Klick auf Zeitraum-Tab               | Diagramm, KPI-Karten und Tabelle wechseln synchron    | Tastatur-Navigierbare Tabs mit ARIA-Tabs | Fallback auf 30-Tage-Standard            |
| Auftragsdetail-Modal      | Inspektion einer Bestellung im Cockpit      | Klick auf Tabellenzeile              | Zugänglicher Dialog mit allen Positionen & Adressaten | ESC schließt, Fokus bleibt gefangen      | Zeile bleibt lesbar                      |
| Demo Reset                | Reproduzierbare Wiederherstellung           | Klick auf „Demo zurücksetzen“        | Bereinigung von LocalStorage, Toast-Meldung           | Bestätigungsdialog vor Zurücksetzen      | Keine Zerstörung von Systemdaten         |

## Non-goals and boundaries

- Keine Anbindung an externe Zahlungsdienstleister (Stripe, PayPal). Die Demo simuliert keine echten Zahlungen und täuscht keine Kreditkartenabfrage vor.
- Keine serverseitige Datenbank (Postgres, Prisma) oder Benutzer-Authentifizierung. Alles läuft als performanter statischer Export über Next.js 16 auf Cloudflare Pages.
- Keine irreführenden Dark Patterns: Keine Countdown-Timer („Nur noch 2 Stunden verfügbar!“), keine Fake-Live-Käufer-Popups („Maria aus Berlin hat gerade gekauft“).
- Keine Fremdbilder aus ungesicherten externen Quellen. Alle Bilder sind lokal im Repository unter `public/media/` gespeichert und mit Sharp optimiert.
