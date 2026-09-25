import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Atelier & Manufaktur — Handwerk & Lichtphysik',
  description:
    'Erfahren Sie mehr über unsere handwerkliche Fertigung in Wien und Berlin: massives Drehmessing, mundgeblasenes Glas und kompromisslose Lichtqualität (CRI 98+).',
};

export default function AtelierPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-stone-300 pb-8">
        <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
          Manufaktur & Philosophie
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1D1B]">
          Wo Licht physische Gestalt annimmt.
        </h1>
        <p className="mt-4 max-w-3xl text-base sm:text-lg text-stone-600 leading-relaxed">
          LUMENWERK entstand aus dem Unbehagen an kurzlebigen Industrieleuchten.
          In unseren Werkstätten in Wien und Berlin verbinden wir traditionelle
          spanabhebende Metallbearbeitung mit modernster
          Vollspektrum-LED-Technologie.
        </p>
      </div>

      {/* Main Feature Story: Metall & Drehbank */}
      <section className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 space-y-6">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
            Spanabhebende Präzision
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1D1B]">
            Aus dem vollen Block gedreht.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700">
            Wir verwenden kein Dünnblech oder tiefgezogene Blenden. Jeder
            Leuchtenkörper wird auf Dreh- und Fräsbänken aus vollem Messing oder
            massivem Rohstahl mit einer Toleranz von unter 0,1 Millimetern
            gefertigt.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700">
            Die sichtbaren, feinen Werkzeugspuren werden nicht künstlich
            wegpoliert — sie bezeugen die handwerkliche Genese jedes einzelnen
            Exemplars und bilden die Grundlage für eine reiche, lebendige Patina
            über Jahrzehnte.
          </p>

          <div className="rounded-sm border border-stone-200 bg-white p-5 font-mono text-xs text-stone-600 space-y-2">
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500 uppercase">
                Verwendete Legierungen:
              </span>
              <span className="font-semibold text-[#1E1D1B]">
                CuZn39Pb3 (Atelier-Drehmessing)
              </span>
            </div>
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500 uppercase">
                Oberflächenveredelung:
              </span>
              <span className="font-semibold text-[#1E1D1B]">
                Handgewachste Säurebrünierung
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500 uppercase">
                Fertigungstoleranz:
              </span>
              <span className="font-semibold text-[#1E1D1B]">± 0,08 mm</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
            <Image
              src="/media/atelier-craft.jpg"
              alt="Handwerkliche Bearbeitung einer Messingfassung auf der Drehbank im Wiener Atelier"
              fill
              priority
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Secondary Story: Lichtlabor & CRI 98+ */}
      <section className="mt-20 border-t border-stone-300 pt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-100 shadow-sm">
            <Image
              src="/media/atelier-space.jpg"
              alt="Architektonischer Raum mit LUMENWERK Lichtinszenierung"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
            Photometrisches Labor
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1D1B]">
            Farbtreue jenseits des Standards.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700">
            Herkömmliche LED-Beleuchtung schneidet im kritischen roten
            Spektralbereich (R9-Wert) oft schwach ab — Holz wirkt fahl, Hauttöne
            blass, Kunstwerke verlieren an Tiefe.
          </p>
          <p className="text-sm sm:text-base leading-relaxed text-stone-700">
            LUMENWERK integriert eigens selektierte Vollspektrum-LEDs mit
            Farbwiedergabewerten von CRI Ra 98+ und R9 &gt; 92. Das Licht bildet
            das kontinuierliche Sonnenspektrum nach und bringt die authentischen
            Materialfarben von Architektur und Interieur zur Geltung.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="rounded-sm border border-stone-200 bg-white p-4">
              <span className="text-stone-500 block uppercase">
                CRI Ra Gesamt
              </span>
              <span className="text-2xl font-bold text-[#1E1D1B]">98.4</span>
            </div>
            <div className="rounded-sm border border-stone-200 bg-white p-4">
              <span className="text-stone-500 block uppercase">
                Spezial-Index R9 (Rot)
              </span>
              <span className="text-2xl font-bold text-[#8F4400]">&gt; 92</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Circular Architecture: 25 Jahre Reparierbarkeit */}
      <section className="mt-20 rounded-sm border border-stone-300 bg-stone-900 p-8 sm:p-12 text-[#F7F5F0]">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
            Zirkuläre Konstruktion
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Gegen das Wegwerfen: 25 Jahre Verfügbarkeitsgarantie.
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Keine geklebten Gehäuse, keine vergossenen Einweg-Module. Jede
            Leuchte von LUMENWERK ist vollständig modular mit metrischen
            Edelstahlschrauben aufgebaut. LED-Engines, Konstantstromtreiber und
            Dimm-Controller können im Bedarfsfall in wenigen Minuten gewechselt
            werden.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
            <Link
              href="/konfigurator"
              className="rounded-sm bg-[#8F4400] px-5 py-2.5 uppercase tracking-wider text-white font-semibold hover:bg-[#783800] transition-colors"
            >
              Licht konfigurieren
            </Link>
            <Link
              href="/katalog"
              className="rounded-sm border border-stone-600 bg-stone-800 px-5 py-2.5 uppercase tracking-wider text-stone-200 hover:text-white hover:border-stone-400 transition-colors"
            >
              Zur Gesamtkollektion
            </Link>
          </div>
        </div>
      </section>

      {/* Standorte */}
      <section className="mt-20 border-t border-stone-300 pt-16">
        <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
          Unsere Werkstätten
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-sm border border-stone-200 bg-white p-8 space-y-3">
            <span className="font-mono text-xs font-semibold text-[#8F4400] uppercase">
              Atelier Wien
            </span>
            <h3 className="font-serif text-xl font-normal text-[#1E1D1B]">
              Mechanische Manufaktur & Prototypenbau
            </h3>
            <p className="font-mono text-xs text-stone-600">
              Praterstraße 42, A-1020 Wien
            </p>
            <p className="text-xs text-stone-500 pt-2">
              Dreherei, Metallbeizerei und handwerkliche Montage der
              Kleinserien.
            </p>
          </div>

          <div className="rounded-sm border border-stone-200 bg-white p-8 space-y-3">
            <span className="font-mono text-xs font-semibold text-[#8F4400] uppercase">
              Atelier Berlin
            </span>
            <h3 className="font-serif text-xl font-normal text-[#1E1D1B]">
              Lichtlabor & Digitale Steuerungstechnik
            </h3>
            <p className="font-mono text-xs text-stone-600">
              Köpenicker Straße 124, D-10179 Berlin
            </p>
            <p className="text-xs text-stone-500 pt-2">
              Photometrische Vermessung, DALI-2/Casambi-Integration und
              B2B-Fachhandelsbetreuung.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
