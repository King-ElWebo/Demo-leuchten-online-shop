import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPriceEur } from '@/lib/domain/formatters';

export default function HomePage() {
  const featured = [
    products.find((p) => p.id === 'korona-i') || products[0],
    products.find((p) => p.id === 'solis-disk') || products[1],
    products.find((p) => p.id === 'kyoto-pendant') || products[4],
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section: Architectural Chiaroscuro */}
      <section
        className="relative overflow-hidden bg-[#141416] text-[#F7F5F0] pt-16 pb-24 lg:pt-24 lg:pb-32"
        aria-labelledby="hero-heading"
      >
        {/* Ambient Warm Glow in Background */}
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Architectural Editorial Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-sm border border-stone-700 bg-stone-900/60 px-3 py-1 font-mono text-xs tracking-widest text-amber-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Atelier Kollektion 2026</span>
              </div>

              <h1
                id="hero-heading"
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.12]"
              >
                Licht als <br />
                <span className="italic font-light text-stone-300">
                  architektonischer
                </span>{' '}
                Baustoff.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-stone-300 max-w-xl">
                Präzisionsgefertigte Lichtinstrumente aus massivem Drehmessing,
                Rohstahl und mundgeblasenem Glas. Entwickelt für Räume, die
                Ruhe, Substanz und kompromisslose Lichtqualität (CRI Ra 98+)
                fordern.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/katalog"
                  className="rounded-sm bg-[#8F4400] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141416]"
                >
                  Kollektion erkunden
                </Link>
                <Link
                  href="/konfigurator"
                  className="rounded-sm border border-stone-500 bg-transparent px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-stone-200 transition-all hover:border-amber-400 hover:text-white hover:bg-stone-800/40 focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  Licht konfigurieren
                </Link>
              </div>

              {/* Photometrics Quick Badges */}
              <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <span className="block text-stone-300">Farbwiedergabe</span>
                  <span className="font-semibold text-white">CRI Ra 98+</span>
                </div>
                <div>
                  <span className="block text-stone-300">Farbtemperatur</span>
                  <span className="font-semibold text-white">2200K–4000K</span>
                </div>
                <div>
                  <span className="block text-stone-300">Steuerung</span>
                  <span className="font-semibold text-white">
                    DALI-2 / Casambi
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Flagship KORONA I Image & Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-sm border border-stone-800 bg-stone-900/40 p-3 shadow-2xl backdrop-blur-xs">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs bg-stone-950">
                  <Image
                    src="/media/korona-i.jpg"
                    alt="Pendelleuchte Korona I aus patiniertem Messing über monolithischem Holztisch in gedämpftem Raum"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-serif text-lg font-medium text-white">
                        KORONA I
                      </span>
                      <p className="font-mono text-[11px] text-stone-300">
                        Handpoliertes Drehmessing
                      </p>
                    </div>
                    <Link
                      href="/produkte/korona-i"
                      className="rounded-sm bg-white/95 px-3 py-1.5 font-mono text-[11px] font-semibold text-[#141416] transition-colors hover:bg-stone-200"
                    >
                      Details ansehen →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Section */}
      <section
        className="py-20 sm:py-24 bg-[#F7F5F0]"
        aria-labelledby="curated-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-300 pb-6">
            <div>
              <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
                Kuratierte Werkschau
              </p>
              <h2
                id="curated-heading"
                className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]"
              >
                Ausgewählte Lichtskulpturen
              </h2>
            </div>
            <Link
              href="/katalog"
              className="font-mono text-xs font-semibold tracking-wider text-[#1E1D1B] uppercase hover:text-[#8F4400] transition-colors inline-flex items-center gap-1"
            >
              <span>Alle 7 Leuchten im Katalog</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {featured.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col rounded-sm border border-stone-200 bg-white transition-all hover:border-stone-400 hover:shadow-md"
              >
                <Link
                  href={`/produkte/${product.slug}`}
                  className="relative aspect-square w-full overflow-hidden bg-stone-100 focus-visible:outline-none"
                  aria-label={`Details zu ${product.name} ansehen`}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} – ${product.material}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-xs bg-[#1E1D1B]/80 px-2 py-0.5 font-mono text-[10px] text-stone-200 uppercase">
                    {product.categoryLabel}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl font-normal text-[#1E1D1B] group-hover:text-[#8F4400] transition-colors">
                      <Link href={`/produkte/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <span className="font-mono text-sm font-semibold text-[#1E1D1B]">
                      {formatPriceEur(product.basePriceEur)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-stone-600 line-clamp-2">
                    {product.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                    <span>
                      {product.photometrics.kelvinRange.split(' ')[0]}
                    </span>
                    <span>{product.photometrics.cri}</span>
                    <span>{product.photometrics.fluxLumen} lm</span>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={`/produkte/${product.slug}`}
                      className="block w-full rounded-sm border border-stone-300 py-2 text-center font-mono text-xs font-medium uppercase tracking-wider text-[#1E1D1B] transition-colors hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white"
                    >
                      Konfigurieren & Kaufen
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Moment 1 Teaser: Interaktiver Leuchten-Konfigurator */}
      <section
        className="relative overflow-hidden bg-[#1E1D1B] text-[#F7F5F0] py-20 lg:py-28"
        aria-labelledby="konfigurator-teaser-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Interaktives Instrument
              </span>
              <h2
                id="konfigurator-teaser-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-white"
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

              <div className="rounded-sm border border-stone-800 bg-stone-900/80 p-5 space-y-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amber-300">2.200 K (Kerzenwärme)</span>
                  <span className="text-stone-300">2.700 K</span>
                  <span className="text-blue-200">4.000 K (Tageslicht)</span>
                </div>
                {/* Visual spectrum bar */}
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
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-stone-800 bg-stone-950">
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

      {/* Atelier & Craftsmanship Manifesto */}
      <section
        className="py-20 sm:py-24 bg-white"
        aria-labelledby="atelier-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100">
                <Image
                  src="/media/atelier-mono.jpg"
                  alt="Handwerkliche Bearbeitung einer Messingfassung im Wiener Atelier"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
                Materialität & Fertigung
              </p>
              <h2
                id="atelier-heading"
                className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-mono text-xs text-[#1E1D1B]">
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

              <div className="pt-4">
                <Link
                  href="/atelier"
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:text-[#8F4400] transition-colors inline-flex items-center gap-1"
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
        className="border-t border-stone-200 bg-stone-100 py-16"
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
                  className="font-serif text-2xl font-normal text-[#1E1D1B]"
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
