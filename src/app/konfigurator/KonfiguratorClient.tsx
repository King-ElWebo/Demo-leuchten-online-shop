'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useShop } from '@/lib/domain/context';
import { formatPriceEur } from '@/lib/domain/formatters';

type AmbientMode = 'dusk' | 'night' | 'day';

interface FinishOption {
  id: string;
  name: string;
  skuCode: string;
  priceDeltaEur: number;
  description: string;
}

const FINISHES: FinishOption[] = [
  {
    id: 'brass',
    name: 'Drehmessing Natur poliert',
    skuCode: 'BRS',
    priceDeltaEur: 0,
    description:
      'Massives Messing auf Zehntelmillimeter überdreht, feine Drehrillen, unbehandelt patinierend.',
  },
  {
    id: 'basalt',
    name: 'Vulkanbasalt Patina dunkel',
    skuCode: 'BST',
    priceDeltaEur: 320,
    description:
      'Säuregeschwärzte Basalt-Patina mit matter Tiefenwirkung und wachsversiegelter Haptik.',
  },
  {
    id: 'steel',
    name: 'Schwarzstahl geölt',
    skuCode: 'STL',
    priceDeltaEur: 180,
    description:
      'Rohguss-Schwarzstahl handentgratet mit natürlicher Anlassfarbe.',
  },
];

const DROP_LENGTHS = [
  {
    id: '1500',
    label: '1.500 mm (Standard)',
    skuCode: '150',
    priceDeltaEur: 0,
  },
  {
    id: '2500',
    label: '2.500 mm (Hohe Decken)',
    skuCode: '250',
    priceDeltaEur: 120,
  },
  {
    id: '4000',
    label: '4.000 mm (Galerie / Luftraum)',
    skuCode: '400',
    priceDeltaEur: 220,
  },
];

const PROTOCOLS = [
  { id: 'dali', label: 'DALI-2 (Gebäudeleittechnik)', skuCode: 'DALI' },
  { id: 'casambi', label: 'Casambi (Bluetooth Wireless)', skuCode: 'CAS' },
  {
    id: 'phase',
    label: 'Phasenabschnitt (Konventioneller Wanddimmer)',
    skuCode: 'PHS',
  },
];

// Mathematical interpolation from Kelvin to RGB
function kelvinToRgb(kelvin: number): {
  r: number;
  g: number;
  b: number;
  hex: string;
} {
  const t = Math.max(2200, Math.min(4000, kelvin));
  const factor = (t - 2200) / (4000 - 2200); // 0 (warm) to 1 (neutral/cool)

  // 2200K: [255, 147, 41] -> 4000K: [230, 240, 255]
  const r = Math.round(255 - factor * 25);
  const g = Math.round(147 + factor * 93);
  const b = Math.round(41 + factor * 214);

  const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  return { r, g, b, hex };
}

export function KonfiguratorClient() {
  const { addToCart } = useShop();

  const [kelvin, setKelvin] = useState<number>(2700);
  const [ambient, setAmbient] = useState<AmbientMode>('dusk');
  const [finish, setFinish] = useState<FinishOption>(FINISHES[0]);
  const [dropLength, setDropLength] = useState(DROP_LENGTHS[0]);
  const [protocol, setProtocol] = useState(PROTOCOLS[0]);
  const [addedNotice, setAddedNotice] = useState(false);
  const [stockError, setStockError] = useState<string | null>(null);

  const basePrice = 3450;
  const totalPrice =
    basePrice + finish.priceDeltaEur + dropLength.priceDeltaEur;
  const generatedSku = `LW-KOR-${kelvin}K-${finish.skuCode}-${protocol.skuCode}-${dropLength.skuCode}`;

  const lightColor = useMemo(() => kelvinToRgb(kelvin), [kelvin]);

  // Ambient backgrounds
  const ambientBgClass = {
    night: 'bg-[#0B0B0D]',
    dusk: 'bg-[#18181B]',
    day: 'bg-[#E5E1D8]',
  }[ambient];

  const handleAddToCart = () => {
    setStockError(null);
    const baseSku =
      finish.id === 'brass'
        ? 'LW-KOR-BRS-01'
        : finish.id === 'basalt'
          ? 'LW-KOR-BST-02'
          : 'LW-KOR-STL-03';
    const baseVariantId =
      finish.id === 'brass'
        ? 'standard-brass'
        : finish.id === 'basalt'
          ? 'basalt-patina'
          : 'black-steel';

    const res = addToCart({
      productId: 'korona-i',
      productSlug: 'korona-i',
      productName: 'KORONA I (Atelier-Konfiguration)',
      variantId: `custom-${finish.id}-${kelvin}k`,
      variantName: `${finish.name} (${kelvin} K, ${dropLength.label})`,
      sku: generatedSku,
      baseSku,
      baseVariantId,
      unitPriceEur: totalPrice,
      quantity: 1,
      image: '/media/korona-i.jpg',
      configurationSummary: {
        finish: finish.name,
        kelvin,
        dropLength: dropLength.label,
        diffuser: `${protocol.label}`,
      },
    });

    if (res.success) {
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 5000);
    } else {
      setStockError(res.error || 'Artikel konnte nicht hinzugefügt werden.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
              Interaktive Lichtarchitektur
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1D1B]">
              Leuchten-Konfigurator
            </h1>
          </div>
          <div className="font-mono text-xs text-stone-600 text-right">
            <span>Referenzmodell: </span>
            <span className="font-bold text-[#1E1D1B]">KORONA I Flagship</span>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-600">
          Modellieren Sie die architektonische Raumwirkung durch physikalische
          Farbtemperatursimulation (2.200 K bis 4.000 K), ausgewählte Werkstoffe
          und Lichtsteuerungsprotokolle.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Interactive Visualizer Canvas */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className={`relative flex min-h-[460px] sm:min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-sm border border-stone-800 p-8 transition-colors duration-500 ${ambientBgClass}`}
          >
            {/* Ambient Mode Switcher inside Stage */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 rounded-sm bg-black/40 p-1 backdrop-blur-md border border-white/10">
              <span className="sr-only">Raumstimmung:</span>
              <button
                type="button"
                onClick={() => setAmbient('dusk')}
                className={`rounded-xs px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  ambient === 'dusk'
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Dämmerung
              </button>
              <button
                type="button"
                onClick={() => setAmbient('night')}
                className={`rounded-xs px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  ambient === 'night'
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Nacht
              </button>
              <button
                type="button"
                onClick={() => setAmbient('day')}
                className={`rounded-xs px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  ambient === 'day'
                    ? 'bg-white/40 text-black font-medium'
                    : 'text-stone-400 hover:text-black'
                }`}
              >
                Tag
              </button>
            </div>

            {/* Dynamic Halo Glow behind Luminaire */}
            <div
              className="pointer-events-none absolute h-72 w-72 rounded-full blur-[80px] transition-all duration-300 sm:h-96 sm:w-96"
              style={{
                backgroundColor: lightColor.hex,
                opacity:
                  ambient === 'day' ? 0.35 : ambient === 'night' ? 0.75 : 0.6,
              }}
              aria-hidden="true"
            />

            {/* Luminaire Visual Graphic & Suspension (Illustrative Canvas) */}
            <div
              className="relative z-10 flex flex-col items-center select-none"
              aria-hidden="true"
            >
              {/* Suspension Cable */}
              <div
                className="w-[2px] transition-all duration-300"
                style={{
                  height:
                    dropLength.id === '1500'
                      ? '90px'
                      : dropLength.id === '2500'
                        ? '130px'
                        : '170px',
                  backgroundColor:
                    finish.id === 'brass'
                      ? '#C2A675'
                      : finish.id === 'basalt'
                        ? '#383838'
                        : '#52525B',
                }}
              />

              {/* Luminaire Body Silhouette / Representation */}
              <div
                className="relative flex h-36 w-56 sm:h-44 sm:w-72 flex-col items-center justify-center rounded-b-full border-t-2 shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor:
                    finish.id === 'brass'
                      ? '#997E4A'
                      : finish.id === 'basalt'
                        ? '#262626'
                        : '#3F3F46',
                  borderColor:
                    finish.id === 'brass'
                      ? '#D6BE8B'
                      : finish.id === 'basalt'
                        ? '#4A4A4A'
                        : '#71717A',
                  boxShadow: `0 20px 60px -10px ${lightColor.hex}88`,
                }}
              >
                {/* Glowing Core / Glass Diffuser */}
                <div
                  className="absolute -bottom-4 h-16 w-36 sm:h-20 sm:w-48 rounded-full blur-[2px] transition-all duration-300"
                  style={{
                    backgroundColor: lightColor.hex,
                    boxShadow: `0 0 50px 15px ${lightColor.hex}`,
                  }}
                />

                <span
                  className="font-mono text-[10px] tracking-widest uppercase transition-colors"
                  style={{
                    color: ambient === 'day' ? '#1E1D1B' : '#FFFFFF',
                    textShadow:
                      ambient === 'day' ? 'none' : '0 1px 4px rgba(0,0,0,0.9)',
                  }}
                >
                  {finish.name.split(' ')[0]}
                </span>
              </div>
            </div>

            {/* Realtime Photometric readout overlay inside Stage */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xs bg-black/60 px-4 py-2 text-xs font-mono text-stone-200 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full border border-white/40"
                  style={{ backgroundColor: lightColor.hex }}
                />
                <span className="font-semibold text-white">
                  {kelvin} Kelvin
                </span>
                <span className="text-stone-400">
                  (
                  {kelvin <= 2400
                    ? 'Kerzenwärme'
                    : kelvin <= 2900
                      ? 'Warmweiß'
                      : kelvin <= 3400
                        ? 'Neutralweiß'
                        : 'Atelier-Tageslicht'}
                  )
                </span>
              </div>
              <div className="hidden sm:block text-stone-300">
                CRI Ra 98.4 · 1.850 lm
              </div>
            </div>
          </div>

          {/* Quick Technical Guarantee box */}
          <div className="rounded-sm border border-stone-200 bg-white p-5 text-xs text-stone-600 font-mono space-y-1">
            <p className="font-bold text-[#1E1D1B] uppercase tracking-wider">
              Qualitätsversprechen der Manufaktur
            </p>
            <p>
              Stufenloses Dimmen ohne Phasenflackern (Flicker-Index &lt; 0,01).
              Voll kompatibel mit zentralen Lichtsteuerungen. 5 Jahre Garantie
              auf LED-Engine und Optik.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Configuration Form */}
        <div className="lg:col-span-5 space-y-8">
          {/* Section 1: Kelvin Slider */}
          <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kelvin-slider"
                className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B]"
              >
                1. Farbtemperatur (Kelvin)
              </label>
              <span
                className="rounded-xs px-2 py-0.5 font-mono text-sm font-bold"
                style={{
                  backgroundColor: `${lightColor.hex}33`,
                  color: kelvin > 3200 ? '#1E1D1B' : '#8F4400',
                }}
              >
                {kelvin} K
              </span>
            </div>

            {/* Slider */}
            <input
              id="kelvin-slider"
              type="range"
              min={2200}
              max={4000}
              step={50}
              value={kelvin}
              onChange={(e) => setKelvin(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-[#8F4400] focus:outline-none"
              aria-valuemin={2200}
              aria-valuemax={4000}
              aria-valuenow={kelvin}
              aria-label="Farbtemperatur in Kelvin einstellen"
            />

            {/* Gradient Bar Visual */}
            <div
              className="h-2 w-full rounded-xs"
              style={{
                background:
                  'linear-gradient(to right, #ff9329 0%, #ffc078 35%, #ffe8d6 70%, #d4e8ff 100%)',
              }}
              aria-hidden="true"
            />

            <div className="flex justify-between font-mono text-[11px] text-stone-600">
              <span>2.200 K (Kerzenstimmung)</span>
              <span>2.700 K</span>
              <span>4.000 K (Arbeitslicht)</span>
            </div>
          </div>

          {/* Section 2: Material Finish */}
          <div className="space-y-3">
            <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B]">
              2. Materialausführung / Metallkörper
            </label>
            <div
              className="grid grid-cols-1 gap-2.5"
              role="radiogroup"
              aria-label="Materialausführung"
            >
              {FINISHES.map((f) => {
                const isSelected = finish.id === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setFinish(f)}
                    className={`rounded-sm border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-[#8F4400] bg-[#8F4400]/5 shadow-xs ring-1 ring-[#8F4400]'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-[#1E1D1B]">
                        {f.name}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#1E1D1B]">
                        {f.priceDeltaEur > 0
                          ? `+${formatPriceEur(f.priceDeltaEur)}`
                          : 'Inklusive'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-600">
                      {f.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Suspension Cable Length */}
          <div className="space-y-3">
            <label
              htmlFor="drop-select"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B]"
            >
              3. Abhängungslänge (Deckenhöhe)
            </label>
            <select
              id="drop-select"
              value={dropLength.id}
              onChange={(e) => {
                const found = DROP_LENGTHS.find((d) => d.id === e.target.value);
                if (found) setDropLength(found);
              }}
              className="w-full rounded-sm border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
            >
              {DROP_LENGTHS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}{' '}
                  {d.priceDeltaEur > 0
                    ? `(+${formatPriceEur(d.priceDeltaEur)})`
                    : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Section 4: Control Protocol */}
          <div className="space-y-3">
            <label
              htmlFor="protocol-select"
              className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B]"
            >
              4. Dimm- & Steuerungsprotokoll
            </label>
            <select
              id="protocol-select"
              value={protocol.id}
              onChange={(e) => {
                const found = PROTOCOLS.find((p) => p.id === e.target.value);
                if (found) setProtocol(found);
              }}
              className="w-full rounded-sm border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
            >
              {PROTOCOLS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Live Price, SKU and Purchase */}
          <div className="rounded-sm border border-stone-300 bg-stone-50 p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs text-stone-600 uppercase">
                  Kalkulierter Gesamtpreis
                </span>
                <p className="font-mono text-3xl font-bold text-[#1E1D1B]">
                  {formatPriceEur(totalPrice)}
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-stone-600 uppercase">
                  Generierte Serien-SKU
                </span>
                <p className="font-mono text-xs font-semibold text-[#8F4400]">
                  {generatedSku}
                </p>
              </div>
            </div>

            <p className="font-mono text-xs text-stone-600">
              Inkl. 20 % USt. · Kostenloser versicherter Kurierversand · 3-5
              Werktage Fertigungszeit.
            </p>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-sm bg-[#8F4400] py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-white"
            >
              Konfiguration in den Warenkorb übernehmen
            </button>

            {stockError && (
              <div
                className="rounded-sm border border-red-300 bg-red-50 p-3.5 text-xs text-red-900"
                role="alert"
                data-testid="configurator-stock-error"
              >
                {stockError}
              </div>
            )}

            {addedNotice && (
              <div
                className="rounded-sm border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-900 animate-in fade-in duration-200"
                role="status"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    ✓ Konfigurierte KORONA I ({kelvin} K) wurde dem Warenkorb
                    hinzugefügt.
                  </span>
                  <Link
                    href="/warenkorb"
                    className="font-mono font-bold text-emerald-950 underline hover:text-emerald-800 ml-2"
                  >
                    Warenkorb ansehen →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
