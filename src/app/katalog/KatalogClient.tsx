'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/domain/types';
import { formatPriceEur } from '@/lib/domain/formatters';

interface KatalogClientProps {
  products: readonly Product[];
}

type CategoryFilter =
  | 'all'
  | 'pendelleuchten'
  | 'wand-deckenleuchten'
  | 'stehleuchten'
  | 'tischleuchten';
type MaterialFilter = 'all' | 'messing' | 'stahl' | 'glas';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'lumen-desc';

export function KatalogClient({ products }: KatalogClientProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [material, setMaterial] = useState<MaterialFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchSummary = product.summary.toLowerCase().includes(q);
          const matchMaterial = product.material.toLowerCase().includes(q);
          const matchCategory = product.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchSummary && !matchMaterial && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (category !== 'all') {
          if (product.category !== category) return false;
        }

        // Material filter
        if (material !== 'all') {
          const matLower = product.material.toLowerCase();
          if (material === 'messing' && !matLower.includes('messing'))
            return false;
          if (
            material === 'stahl' &&
            !matLower.includes('stahl') &&
            !matLower.includes('basalt')
          )
            return false;
          if (material === 'glas' && !matLower.includes('glas')) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePriceEur - b.basePriceEur;
        if (sortBy === 'price-desc') return b.basePriceEur - a.basePriceEur;
        if (sortBy === 'lumen-desc')
          return b.photometrics.fluxLumen - a.photometrics.fluxLumen;
        return 0; // default featured order
      });
  }, [products, search, category, material, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setMaterial('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    search !== '' ||
    category !== 'all' ||
    material !== 'all' ||
    sortBy !== 'featured';

  // Check if we are showing all 7 products in default curation
  const isDefaultCuratedView =
    !hasActiveFilters && filteredProducts.length === products.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header: Architectural Editorial Staging */}
      <div className="border-b border-stone-300 pb-10">
        <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
          Kollektionsübersicht · Werkkatalog
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1E1D1B] tracking-tight">
          Architektonische Lichtinstrumente
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone-600 leading-relaxed">
          Sieben eigenständige Leuchtenserien aus handgedrehtem Messing,
          Vulkanbasalt und mundgeblasenem Glas. Entwickelt für meisterhafte
          Lichtführung (CRI Ra 98+) und jahrzehntelange Reparaturfähigkeit.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="mt-8 rounded-sm border border-stone-200 bg-white p-6 shadow-xs">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          {/* Search Field */}
          <div className="md:col-span-4">
            <label
              htmlFor="product-search"
              className="block font-mono text-xs font-medium uppercase tracking-wider text-stone-700"
            >
              Suche nach Modell oder Material
            </label>
            <div className="relative mt-2">
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="z. B. Korona, Messing, Stehleuchte..."
                className="w-full rounded-sm border border-stone-300 bg-stone-50/50 px-3.5 py-2 text-sm text-[#1E1D1B] placeholder-stone-400 focus:border-[#D97724] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D97724]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-stone-400 hover:text-stone-700"
                  aria-label="Suchbegriff löschen"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="md:col-span-5">
            <span className="block font-mono text-xs font-medium uppercase tracking-wider text-stone-700">
              Kategorie
            </span>
            <div
              className="mt-2 flex flex-wrap gap-1.5"
              role="group"
              aria-label="Kategorie-Filter"
            >
              {[
                { id: 'all', label: 'Alle' },
                { id: 'pendelleuchten', label: 'Pendel' },
                { id: 'wand-deckenleuchten', label: 'Wand & Decke' },
                { id: 'stehleuchten', label: 'Stehleuchten' },
                { id: 'tischleuchten', label: 'Tisch' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as CategoryFilter)}
                  aria-pressed={category === cat.id}
                  className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
                    category === cat.id
                      ? 'bg-[#1E1D1B] text-white font-medium'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <label
              htmlFor="sort-by"
              className="block font-mono text-xs font-medium uppercase tracking-wider text-stone-700"
            >
              Sortierung
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="mt-2 w-full rounded-sm border border-stone-300 bg-stone-50/50 px-3 py-2 text-sm text-[#1E1D1B] focus:border-[#D97724] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D97724]"
            >
              <option value="featured">Kuratierte Werkschau (Standard)</option>
              <option value="price-asc">Preis: aufsteigend</option>
              <option value="price-desc">Preis: absteigend</option>
              <option value="lumen-desc">Lichtstrom: höchste Lumenzahl</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter: Materials & Active Indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-stone-500 uppercase">
              Material:
            </span>
            {[
              { id: 'all', label: 'Alle Werkstoffe' },
              { id: 'messing', label: 'Messing' },
              { id: 'stahl', label: 'Rohstahl / Basalt' },
              { id: 'glas', label: 'Mundgeblasenes Glas' },
            ].map((mat) => (
              <button
                key={mat.id}
                type="button"
                onClick={() => setMaterial(mat.id as MaterialFilter)}
                className={`rounded-xs px-2.5 py-1 font-mono text-[11px] transition-colors ${
                  material === mat.id
                    ? 'border border-[#8F4400] bg-amber-50 text-[#8F4400] font-semibold'
                    : 'border border-stone-200 text-stone-700 hover:border-stone-400'
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span
              className="font-mono text-xs text-stone-600"
              data-testid="catalog-count"
            >
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'Modell' : 'Modelle'}
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-mono text-xs font-semibold text-[#8F4400] underline hover:text-[#783800]"
              >
                Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Catalog Body */}
      {filteredProducts.length === 0 ? (
        <div className="mt-16 rounded-sm border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="font-serif text-2xl font-normal text-[#1E1D1B]">
            Keine Leuchten für diese Filterkombination gefunden
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Versuchen Sie einen anderen Suchbegriff oder heben Sie die Material-
            und Kategorieeinschränkungen auf.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-sm bg-[#1E1D1B] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-stone-800"
          >
            Alle 7 Leuchten anzeigen
          </button>
        </div>
      ) : isDefaultCuratedView ? (
        /* Curated Editorial Dramaturgy for the 7 Master Models */
        <div className="mt-12 space-y-16 lg:space-y-24">
          {/* Act 1: Flagship Spotlight KORONA I */}
          {(() => {
            const p = products[0]; // KORONA I
            return (
              <article
                key={p.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-sm border border-stone-200 bg-white p-6 sm:p-10 shadow-xs"
              >
                <div className="lg:col-span-7">
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-950"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      priority
                      loading="eager"
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/90 px-3 py-1 font-mono text-[10px] text-stone-200 uppercase tracking-widest">
                      Flagship · {p.categoryLabel}
                    </div>
                  </Link>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="hover:text-[#8F4400] transition-colors"
                      >
                        {p.name}
                      </Link>
                    </h2>
                    <span className="font-mono text-lg font-semibold text-[#1E1D1B]">
                      {formatPriceEur(p.basePriceEur)}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-[#8F4400] font-medium">
                    {p.material}
                  </p>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 border-t border-b border-stone-100 py-3 font-mono text-[11px] text-stone-600">
                    <div>
                      <span className="block text-stone-600">CRI</span>
                      <span className="font-semibold text-stone-800">
                        {p.photometrics.cri}
                      </span>
                    </div>
                    <div>
                      <span className="block text-stone-600">Lichtstrom</span>
                      <span className="font-semibold text-stone-800">
                        {p.photometrics.fluxLumen} lm
                      </span>
                    </div>
                    <div>
                      <span className="block text-stone-600">Farbe</span>
                      <span className="font-semibold text-stone-800">
                        {p.photometrics.kelvinRange.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/produkte/${p.slug}`}
                      className="rounded-sm bg-[#1E1D1B] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800 transition-colors"
                    >
                      Konfiguration & Details
                    </Link>
                    <Link
                      href="/konfigurator"
                      className="rounded-sm border border-stone-300 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-stone-700 hover:border-[#8F4400] hover:text-[#8F4400] transition-colors"
                    >
                      Licht simulieren
                    </Link>
                  </div>
                </div>
              </article>
            );
          })()}

          {/* Act 2: Asymmetric Duo — SOLIS DISK & STRATA GRAZER */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* SOLIS DISK (Tischleuchte Monolith) */}
            {(() => {
              const p = products[1];
              return (
                <article
                  key={p.id}
                  className="md:col-span-7 flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      loading="eager"
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                      {p.categoryLabel}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                        <Link
                          href={`/produkte/${p.slug}`}
                          className="hover:text-[#8F4400] transition-colors"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                        {formatPriceEur(p.basePriceEur)}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8F4400]">
                      {p.material}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                      <span>{p.photometrics.cri}</span>
                      <span>{p.photometrics.fluxLumen} lm</span>
                      <span>{p.dimensions}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="block w-full text-center rounded-sm border border-stone-300 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white transition-colors"
                      >
                        Konfiguration & Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })()}

            {/* STRATA GRAZER (Wand- & Deckenleuchte Grazer) */}
            {(() => {
              const p = products[2];
              return (
                <article
                  key={p.id}
                  className="md:col-span-5 flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                      {p.categoryLabel}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                        <Link
                          href={`/produkte/${p.slug}`}
                          className="hover:text-[#8F4400] transition-colors"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                        {formatPriceEur(p.basePriceEur)}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8F4400]">
                      {p.material}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                      <span>{p.photometrics.cri}</span>
                      <span>{p.photometrics.fluxLumen} lm</span>
                      <span>{p.dimensions.split('(')[0]}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="block w-full text-center rounded-sm border border-stone-300 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white transition-colors"
                      >
                        Konfiguration & Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>

          {/* Act 3: Architectural Manifesto Interlude */}
          <div className="rounded-sm border border-stone-300 bg-[#1E1D1B] p-8 sm:p-14 text-[#F7F5F0]">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Philosophie der Entblendung
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-normal text-white leading-relaxed">
                „Architektur wird erst durch Licht bewohnbar. Jedes unserer
                Instrumente ist auf Langlebigkeit, subtile Entblendung und
                naturgetreue Farbwiedergabe ausgelegt.“
              </p>
              <p className="font-mono text-xs text-stone-300">
                — LUMENWERK Manufaktur Wien & Berlin
              </p>
            </div>
          </div>

          {/* Act 4: Asymmetric Duo — AURA COLUMN & KYOTO PENDANT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* AURA COLUMN (Stehleuchte) */}
            {(() => {
              const p = products[3];
              return (
                <article
                  key={p.id}
                  className="md:col-span-5 flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      sizes="(min-width: 768px) 42vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                      {p.categoryLabel}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                        <Link
                          href={`/produkte/${p.slug}`}
                          className="hover:text-[#8F4400] transition-colors"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                        {formatPriceEur(p.basePriceEur)}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8F4400]">
                      {p.material}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                      <span>{p.photometrics.cri}</span>
                      <span>{p.photometrics.fluxLumen} lm</span>
                      <span>{p.dimensions.split('(')[0]}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="block w-full text-center rounded-sm border border-stone-300 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white transition-colors"
                      >
                        Konfiguration & Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })()}

            {/* KYOTO PENDANT (Pendelleuchte) */}
            {(() => {
              const p = products[4];
              return (
                <article
                  key={p.id}
                  className="md:col-span-7 flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                      {p.categoryLabel}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                        <Link
                          href={`/produkte/${p.slug}`}
                          className="hover:text-[#8F4400] transition-colors"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                        {formatPriceEur(p.basePriceEur)}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8F4400]">
                      {p.material}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                      <span>{p.photometrics.cri}</span>
                      <span>{p.photometrics.fluxLumen} lm</span>
                      <span>{p.dimensions}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="block w-full text-center rounded-sm border border-stone-300 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white transition-colors"
                      >
                        Konfiguration & Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>

          {/* Act 5: The Final Duo — MONO ATELIER & LUMEN GLOBE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* MONO ATELIER (Richtstrahler) */}
            {(() => {
              const p = products[5];
              return (
                <article
                  key={p.id}
                  className="md:col-span-6 flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                      {p.categoryLabel}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                        <Link
                          href={`/produkte/${p.slug}`}
                          className="hover:text-[#8F4400] transition-colors"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                        {formatPriceEur(p.basePriceEur)}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8F4400]">
                      {p.material}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                      <span>{p.photometrics.cri}</span>
                      <span>{p.photometrics.fluxLumen} lm</span>
                      <span>{p.photometrics.beamAngle}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="block w-full text-center rounded-sm border border-stone-300 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white transition-colors"
                      >
                        Konfiguration & Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })()}

            {/* LUMEN GLOBE (Lichtsphäre) */}
            {(() => {
              const p = products[6];
              return (
                <article
                  key={p.id}
                  className="md:col-span-6 flex flex-col justify-between rounded-sm border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs"
                >
                  <Link
                    href={`/produkte/${p.slug}`}
                    className="group block relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-100"
                    aria-label={`Details zu ${p.name} ansehen`}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} – ${p.material}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-2.5 py-1 font-mono text-[10px] text-stone-200 uppercase">
                      {p.categoryLabel}
                    </div>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
                        <Link
                          href={`/produkte/${p.slug}`}
                          className="hover:text-[#8F4400] transition-colors"
                        >
                          {p.name}
                        </Link>
                      </h2>
                      <span className="font-mono text-base font-semibold text-[#1E1D1B]">
                        {formatPriceEur(p.basePriceEur)}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8F4400]">
                      {p.material}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.summary}
                    </p>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                      <span>{p.photometrics.cri}</span>
                      <span>{p.photometrics.fluxLumen} lm</span>
                      <span>{p.dimensions}</span>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/produkte/${p.slug}`}
                        className="block w-full text-center rounded-sm border border-stone-300 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white transition-colors"
                      >
                        Konfiguration & Details
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>
        </div>
      ) : (
        /* Filtered Grid Presentation with Elevated Architectural Layout */
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
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
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-xs bg-[#1E1D1B]/80 px-2 py-0.5 font-mono text-[10px] text-stone-200 uppercase">
                  {product.categoryLabel}
                </div>
                {product.stock <= 4 && (
                  <div className="absolute top-3 right-3 rounded-xs bg-amber-600/90 px-2 py-0.5 font-mono text-[10px] font-medium text-white uppercase">
                    Nur {product.stock} Stück
                  </div>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-serif text-xl font-normal text-[#1E1D1B] group-hover:text-[#8F4400] transition-colors">
                    <Link href={`/produkte/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h2>
                  <span className="font-mono text-sm font-semibold text-[#1E1D1B]">
                    {formatPriceEur(product.basePriceEur)}
                  </span>
                </div>

                <p className="mt-1 font-mono text-[11px] text-stone-600">
                  {product.material}
                </p>

                <p className="mt-3 text-xs text-stone-600 line-clamp-2">
                  {product.summary}
                </p>

                {/* Photometrics summary bar */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                  <span title="Farbwiedergabeindex">
                    {product.photometrics.cri}
                  </span>
                  <span title="Farbtemperatur">
                    {product.photometrics.kelvinRange.split(' ')[0]}
                  </span>
                  <span title="Lichtstrom">
                    {product.photometrics.fluxLumen} lm
                  </span>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href={`/produkte/${product.slug}`}
                    className="block w-full rounded-sm border border-stone-300 py-2.5 text-center font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] transition-colors hover:border-[#8F4400] hover:bg-[#8F4400] hover:text-white"
                  >
                    Konfiguration & Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
