import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPriceEur } from '@/lib/domain/formatters';

export default function HomePage() {
  const korona = products.find((p) => p.id === 'korona-i') || products[0];
  const solis = products.find((p) => p.id === 'solis-disk') || products[1];
  const strata = products.find((p) => p.id === 'strata-grazer') || products[2];
  const kyoto = products.find((p) => p.id === 'kyoto-pendant') || products[4];

  return (
    <div className="flex flex-col">
      {/* Hero Section: Architectural Chiaroscuro & Spatial Light Staging */}
      <section
        className="relative overflow-hidden bg-[#141416] text-[#F7F5F0] pt-12 pb-20 lg:pt-20 lg:pb-32"
        aria-labelledby="hero-heading"
      >
        {/* Ambient Warm Architectural Light Cones */}
        <div
          className="pointer-events-none absolute top-0 right-1/4 h-[640px] w-[640px] rounded-full bg-amber-500/12 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-10 h-[400px] w-[400px] rounded-full bg-amber-600/8 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Spatial Header & Eyebrow */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-stone-800/80">
            <div>
              <p className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Atelier Manufaktur Wien & Berlin · Edition 2026
              </p>
              <h1
                id="hero-heading"
                className="mt-3 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08] max-w-4xl"
              >
                Licht als{' '}
                <span className="italic font-light text-stone-300">
                  architektonischer
                </span>{' '}
                Baustoff.
              </h1>
            </div>

            <div className="lg:max-w-xs space-y-4">
              <p className="text-sm leading-relaxed text-stone-300">
                Präzisionsgefertigte Lichtinstrumente aus massivem Drehmessing,
                Rohstahl und mundgeblasenem Glas. Geschaffen für Räume von
                zeitloser Klarheit und kompromissloser Lichtqualität.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/katalog"
                  className="rounded-sm bg-[#8F4400] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-white"
                >
                  Kollektion erkunden
                </Link>
                <Link
                  href="/konfigurator"
                  className="rounded-sm border border-stone-700 bg-stone-900/60 px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-stone-300 transition-all hover:border-amber-400 hover:text-white"
                >
                  Licht konfigurieren
                </Link>
              </div>
            </div>
          </div>

          {/* Staged Architectural Space: Flagship KORONA I */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Immersive Room Staging Frame */}
            <div className="lg:col-span-8 relative">
              <div className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-sm border border-stone-800 bg-stone-950 shadow-2xl">
                <Image
                  src={korona.image}
                  alt="Pendelleuchte Korona I aus patiniertem Messing über monolithischem Holztisch in gedämpftem Raum"
                  fill
                  priority
                  loading="eager"
                  sizes="(min-width: 1280px) 66vw, 100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-103"
                />
                {/* Spatial Chiaroscuro Vignette */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141416]/90 via-transparent to-black/20"
                  aria-hidden="true"
                />

                {/* Spatial Anchor Caption */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300">
                      Flagship Skulptur
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                      KORONA I
                    </h2>
                    <p className="font-mono text-xs text-stone-300 mt-0.5">
                      Handpoliertes Drehmessing · Mundgeblasenes Basaltglas
                    </p>
                  </div>
                  <Link
                    href="/produkte/korona-i"
                    className="inline-flex items-center gap-2 rounded-sm bg-white/95 px-4 py-2 font-mono text-xs font-semibold text-[#141416] transition-colors hover:bg-stone-200"
                  >
                    <span>Details & Werkdaten</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Architectural Telemetry Column */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="border-l-2 border-amber-600/70 pl-5 space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-stone-300">
                  Lichtphysik & Spezifikation
                </span>
                <p className="font-serif text-xl font-normal text-white">
                  Tageslichtechtes Vollspektrum
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Mit einem Farbwiedergabeindex von CRI Ra 98.4 und einem
                  Spezial-Rotwert R9 &gt; 92 bildet LUMENWERK das
                  kontinuierliche Sonnenspektrum naturgetreu ab.
                </p>
              </div>

              {/* Specification Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 font-mono text-xs">
                <div>
                  <span className="block text-stone-300 text-[11px] uppercase">
                    Farbwiedergabe
                  </span>
                  <span className="text-base font-semibold text-white">
                    CRI Ra 98+
                  </span>
                </div>
                <div>
                  <span className="block text-stone-300 text-[11px] uppercase">
                    Farbtemperatur
                  </span>
                  <span className="text-base font-semibold text-white">
                    2200K–4000K
                  </span>
                </div>
                <div>
                  <span className="block text-stone-300 text-[11px] uppercase">
                    Steuerung
                  </span>
                  <span className="text-base font-semibold text-white">
                    DALI-2 / Casambi
                  </span>
                </div>
                <div>
                  <span className="block text-stone-300 text-[11px] uppercase">
                    Fertigung
                  </span>
                  <span className="text-base font-semibold text-white">
                    Wien & Berlin
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/konfigurator"
                  className="block w-full text-center rounded-sm border border-stone-700 bg-stone-900/40 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-amber-300 transition-colors hover:border-amber-400 hover:text-white"
                >
                  Lichtwirkung simulieren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Section: Asymmetric Architectural Rhythm */}
      <section
        className="py-20 sm:py-28 bg-[#F7F5F0]"
        aria-labelledby="curated-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-300">
            <div>
              <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
                Kuratierte Werkschau
              </p>
              <h2
                id="curated-heading"
                className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1D1B]"
              >
                Ausgewählte Lichtskulpturen
              </h2>
            </div>
            <Link
              href="/katalog"
              className="font-mono text-xs font-semibold tracking-wider text-[#1E1D1B] uppercase hover:text-[#8F4400] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Alle 7 Leuchten im Katalog</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Asymmetric Curated Gallery (Breaking the 3-column template monotony) */}
          <div className="mt-14 space-y-16 lg:space-y-24">
            {/* Primary Showcase: SOLIS DISK & Basalt Monolith */}
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <Link
                  href={`/produkte/${solis.slug}`}
                  className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                  aria-label={`Details zu ${solis.name} ansehen`}
                >
                  <Image
                    src={solis.image}
                    alt={`${solis.name} – ${solis.material}`}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                    {solis.categoryLabel}
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1D1B]">
                    <Link
                      href={`/produkte/${solis.slug}`}
                      className="hover:text-[#8F4400] transition-colors"
                    >
                      {solis.name}
                    </Link>
                  </h3>
                  <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                    {formatPriceEur(solis.basePriceEur)}
                  </span>
                </div>

                <p className="font-mono text-xs text-[#8F4400]">
                  {solis.material}
                </p>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {solis.description}
                </p>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-mono text-stone-600">
                  <span>{solis.photometrics.cri}</span>
                  <span>{solis.photometrics.fluxLumen} lm</span>
                  <span>{solis.photometrics.beamAngle}</span>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href={`/produkte/${solis.slug}`}
                    className="inline-flex items-center gap-2 rounded-sm bg-[#1E1D1B] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800 transition-colors"
                  >
                    <span>Konfigurieren & Kaufen</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>

            {/* Asymmetric Counterpart: STRATA GRAZER & KYOTO PENDANT Duo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-stone-200">
              {/* Left Item: STRATA GRAZER (Architectural Wall Grazer) */}
              <article className="md:col-span-6 flex flex-col justify-between space-y-6">
                <Link
                  href={`/produkte/${strata.slug}`}
                  className="group block relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-100"
                  aria-label={`Details zu ${strata.name} ansehen`}
                >
                  <Image
                    src={strata.image}
                    alt={`${strata.name} – ${strata.material}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                    {strata.categoryLabel}
                  </div>
                </Link>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                      <Link
                        href={`/produkte/${strata.slug}`}
                        className="hover:text-[#8F4400] transition-colors"
                      >
                        {strata.name}
                      </Link>
                    </h3>
                    <span className="font-mono text-sm font-semibold text-[#1E1D1B]">
                      {formatPriceEur(strata.basePriceEur)}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8F4400]">
                    {strata.material}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {strata.summary}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/produkte/${strata.slug}`}
                      className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:text-[#8F4400] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Spezifikation ansehen</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>

              {/* Right Item: KYOTO PENDANT (Mouth-blown glass sphere) */}
              <article className="md:col-span-6 flex flex-col justify-between space-y-6">
                <Link
                  href={`/produkte/${kyoto.slug}`}
                  className="group block relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-100"
                  aria-label={`Details zu ${kyoto.name} ansehen`}
                >
                  <Image
                    src={kyoto.image}
                    alt={`${kyoto.name} – ${kyoto.material}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                    {kyoto.categoryLabel}
                  </div>
                </Link>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                      <Link
                        href={`/produkte/${kyoto.slug}`}
                        className="hover:text-[#8F4400] transition-colors"
                      >
                        {kyoto.name}
                      </Link>
                    </h3>
                    <span className="font-mono text-sm font-semibold text-[#1E1D1B]">
                      {formatPriceEur(kyoto.basePriceEur)}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#8F4400]">
                    {kyoto.material}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {kyoto.summary}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/produkte/${kyoto.slug}`}
                      className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:text-[#8F4400] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Spezifikation ansehen</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Moment 1 Teaser: Interaktives Lichtinstrument */}
      <section
        className="relative overflow-hidden bg-[#141416] text-[#F7F5F0] py-20 lg:py-28"
        aria-labelledby="konfigurator-teaser-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Interaktives Instrument
              </span>
              <h2
                id="konfigurator-teaser-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight"
              >
                Präzision in jedem Kelvin.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-stone-300">
                Licht formt Architektur erst im Moment des Dimmens. Mit unserem
                physikalischen Konfigurator simulieren Sie die Farbtemperatur
                stufenlos von 2.200 K (warmes Kerzenlicht) bis 4.000 K (klares
                Atelierlicht) unter wechselnden Raumstimmungen (Tag, Dämmerung,
                Nacht).
              </p>

              {/* Physical Spectrum Visualization */}
              <div className="rounded-sm border border-stone-800 bg-stone-900/80 p-5 space-y-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-300">2.200 K (Kerzenwärme)</span>
                  <span className="text-stone-300">2.700 K (Wohnlicht)</span>
                  <span className="text-blue-200">4.000 K (Atelierlicht)</span>
                </div>
                <div
                  className="h-3 w-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(to right, #ff9329 0%, #ffc078 35%, #ffe8d6 70%, #d4e8ff 100%)',
                  }}
                  aria-hidden="true"
                />
                <p className="font-mono text-[11px] text-stone-300">
                  Echtzeit-Preis- und SKU-Kalkulation mit direkter
                  Warenkorb-Übernahme.
                </p>
              </div>

              <div>
                <Link
                  href="/konfigurator"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#8F4400] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Konfigurator öffnen</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-stone-800 bg-stone-950 shadow-2xl">
                <Image
                  src="/media/atelier-space.jpg"
                  alt="Architektonischer Raum mit LUMENWERK Lichtinszenierung"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xs border border-stone-700/60 bg-stone-900/90 p-4 backdrop-blur-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-serif text-sm font-medium text-white">
                        Live Kelvin Simulation
                      </p>
                      <p className="font-mono text-[11px] text-stone-300">
                        Tag- & Nacht-Modus · Materialauswahl
                      </p>
                    </div>
                    <span className="rounded-xs bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] text-amber-300 uppercase font-semibold">
                      Interaktiv
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier & Craftsmanship Manifesto with Authentic Workshop Lathe Image */}
      <section
        className="py-20 sm:py-28 bg-white"
        aria-labelledby="atelier-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-md">
                <Image
                  src="/media/atelier-craft.jpg"
                  alt="Handwerkliche Bearbeitung einer Messingfassung auf der Drehbank im Wiener Atelier"
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
                Materialität & Fertigung
              </p>
              <h2
                id="atelier-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1D1B] leading-tight"
              >
                Gegen die Vergänglichkeit des Industriellen.
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                Jedes LUMENWERK-Instrument entsteht in Kleinserie in unseren
                Ateliers in Wien und Berlin. Wir verzichten auf verklebte
                Gehäuse und billige Kunststoffoptiken. Jede Verbindung ist
                geschraubt, jedes Bauteil zugänglich, und jede Lichtquelle auch
                nach Jahrzehnten austauschbar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-mono text-xs text-[#1E1D1B]">
                <div className="border-l-2 border-[#8F4400] pl-4">
                  <span className="font-semibold block text-sm">
                    Drehmessing & Rohstahl
                  </span>
                  <span className="text-stone-600 font-sans">
                    Natürliche Patina, die mit den Jahren Würde gewinnt, statt
                    zu altern.
                  </span>
                </div>
                <div className="border-l-2 border-[#8F4400] pl-4">
                  <span className="font-semibold block text-sm">
                    Mundgeblasenes Glas
                  </span>
                  <span className="text-stone-600 font-sans">
                    Sanfte Lichtbrechung ohne Blendpunkte oder störende
                    Schlieren.
                  </span>
                </div>
                <div className="border-l-2 border-[#8F4400] pl-4">
                  <span className="font-semibold block text-sm">
                    CRI 98+ Vollspektrum
                  </span>
                  <span className="text-stone-600 font-sans">
                    Naturgetreue Wiedergabe von Hölzern, Textilien und
                    Hauttönen.
                  </span>
                </div>
                <div className="border-l-2 border-[#8F4400] pl-4">
                  <span className="font-semibold block text-sm">
                    25 Jahre Ersatzteile
                  </span>
                  <span className="text-stone-600 font-sans">
                    Garantierte Verfügbarkeit von LED-Engines und
                    Treiberelektronik.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/atelier"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:text-[#8F4400] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Mehr über unser Atelier & Fertigung erfahren</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Merchant Cockpit Banner (Signature Moment 2 Teaser) */}
      <section
        className="border-t border-stone-200 bg-[#F7F5F0] py-16"
        aria-labelledby="merchant-teaser-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm border border-stone-300 bg-white p-8 sm:p-10 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 rounded-xs bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-700 uppercase">
                  <span>Fachhandel & B2B</span>
                  <span>·</span>
                  <span className="text-[#8F4400] font-semibold">
                    Live-Demonstrator
                  </span>
                </div>
                <h3
                  id="merchant-teaser-heading"
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1D1B]"
                >
                  Das LUMENWERK Händler-Cockpit
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Erleben Sie die nahtlose Verbindung von Showcase-Shop und
                  kaufmännischer B2B-Steuerung. Geben Sie eine Demo-Bestellung
                  auf und beobachten Sie, wie Umsatz, Ø Bestellwert, Conversion
                  Rate und Bestandsreservierungen unmittelbar kausal neu
                  berechnet werden.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/haendler"
                  className="rounded-sm bg-[#1E1D1B] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-stone-800 text-center"
                >
                  Händleransicht öffnen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
