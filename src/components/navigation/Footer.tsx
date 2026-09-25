import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-stone-300 bg-[#1E1D1B] text-[#F7F5F0]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-normal tracking-[0.2em] uppercase text-white">
              LUMENWERK
            </span>
            <p className="mt-2 font-mono text-xs tracking-wider text-stone-300 uppercase">
              Architectural Lighting Instruments
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-300">
              Präzisionsgefertigte architektonische Leuchten aus Messing,
              Rohstahl und mundgeblasenem Opalglas mit tageslichtechtem CRI 98+.
            </p>
          </div>

          {/* Kollektion Links */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Kollektion & Studio
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/katalog"
                  className="text-stone-300 transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Gesamtkatalog (7 Leuchten)
                </Link>
              </li>
              <li>
                <Link
                  href="/konfigurator"
                  className="text-stone-300 transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Interaktiver Konfigurator
                </Link>
              </li>
              <li>
                <Link
                  href="/atelier"
                  className="text-stone-300 transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Atelier & Manufaktur
                </Link>
              </li>
              <li>
                <Link
                  href="/warenkorb"
                  className="text-stone-300 transition-colors hover:text-white focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Warenkorb
                </Link>
              </li>
            </ul>
          </div>

          {/* Ateliers */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Standorte & Kontakt
            </h3>
            <div className="mt-4 space-y-3 text-sm text-stone-300">
              <div>
                <p className="font-medium text-white">Atelier Wien</p>
                <p className="font-mono text-xs text-stone-300">
                  Praterstraße 42, 1020 Wien
                </p>
              </div>
              <div>
                <p className="font-medium text-white">Atelier Berlin</p>
                <p className="font-mono text-xs text-stone-300">
                  Köpenicker Str. 124, 10179 Berlin
                </p>
              </div>
              <p className="font-mono text-xs text-stone-300 pt-1">
                E-Mail: atelier@lumenwerk-studio.at
              </p>
            </div>
          </div>

          {/* Demo Cockpit & Transparency */}
          <div>
            <h3 className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
              Händler-Cockpit
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-stone-300">
              Echtzeit-Berechnung kaufmännischer Kennzahlen (Umsatz, AOV, CR%)
              aus historischen Beispieldaten und Ihren aktiven
              Browser-Bestellungen.
            </p>
            <div className="mt-4">
              <Link
                href="/haendler"
                className="inline-flex items-center gap-2 rounded-sm border border-stone-600 bg-stone-800/90 px-3.5 py-2 font-mono text-xs text-white transition-all hover:border-amber-400 hover:bg-stone-700 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              >
                <span>Händleransicht öffnen</span>
                <span className="rounded-xs bg-amber-950/80 border border-amber-500/40 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300 uppercase">
                  Live-Demo
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 border-t border-stone-800 pt-8 sm:flex sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-stone-400">
            © 2026 LUMENWERK Studio. Alle Rechte vorbehalten.
            Demonstrations-Showcase für hochwertige Lichtarchitektur.
          </p>
          <p className="mt-2 font-mono text-[11px] text-stone-400 sm:mt-0">
            Keine echten Zahlungen · Lokale Browser-Persistenz · Static Export
          </p>
        </div>
      </div>
    </footer>
  );
}
