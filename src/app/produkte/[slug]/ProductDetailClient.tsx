'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, ProductVariant } from '@/lib/domain/types';
import { useShop } from '@/lib/domain/context';
import { formatPriceEur } from '@/lib/domain/formatters';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: readonly Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useShop();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentPriceEur = product.basePriceEur + selectedVariant.priceDeltaEur;
  const maxAvailable = Math.min(selectedVariant.stock, 10);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      sku: selectedVariant.sku,
      unitPriceEur: currentPriceEur,
      quantity,
      image: product.image,
      configurationSummary: {
        finish: selectedVariant.name,
      },
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center space-x-2 font-mono text-xs text-stone-600">
          <li>
            <Link href="/" className="hover:text-[#8F4400] transition-colors">
              Atelier
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/katalog"
              className="hover:text-[#8F4400] transition-colors"
            >
              Katalog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#1E1D1B] font-medium" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Product Image with Frame */}
        <div className="lg:col-span-7">
          <div className="sticky top-28 space-y-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-stone-200 bg-white shadow-sm">
              <Image
                src={product.image}
                alt={`${product.name} – ${product.material}`}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute top-4 left-4 rounded-xs bg-[#1E1D1B]/85 px-3 py-1 font-mono text-xs text-stone-200 uppercase">
                {product.categoryLabel}
              </div>
            </div>

            {/* Quick Link to Interactive Light Configurator */}
            <div className="rounded-sm border border-stone-200 bg-white p-5 flex items-center justify-between">
              <div>
                <p className="font-serif text-sm font-medium text-[#1E1D1B]">
                  Lichtstimmung digital testen
                </p>
                <p className="font-mono text-xs text-stone-600">
                  Simulieren Sie Kelvin (2200K–4000K) und Raumstimmungen im
                  Konfigurator.
                </p>
              </div>
              <Link
                href="/konfigurator"
                className="rounded-sm bg-stone-100 px-3.5 py-2 font-mono text-xs font-semibold text-[#1E1D1B] hover:bg-[#8F4400] hover:text-white transition-colors shrink-0 ml-4"
              >
                Konfigurator →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Configuration & Purchase */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
              Handgefertigte Kleinserie
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]">
              {product.name}
            </h1>
            <p className="mt-2 font-mono text-xs text-stone-600 uppercase tracking-wide">
              {product.material}
            </p>

            <div className="mt-4 flex items-baseline gap-4">
              <span className="font-mono text-2xl font-bold text-[#1E1D1B]">
                {formatPriceEur(currentPriceEur)}
              </span>
              <span className="font-mono text-xs text-stone-600">
                inkl. 19% MwSt., versandkostenfrei
              </span>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6">
            <p className="text-sm leading-relaxed text-stone-700">
              {product.description}
            </p>
          </div>

          {/* Variant Selector */}
          <div className="space-y-4 border-t border-stone-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-800">
                Materialausführung / Finish
              </span>
              <span className="font-mono text-xs text-stone-600">
                SKU: {selectedVariant.sku}
              </span>
            </div>

            <div
              className="grid grid-cols-1 gap-2.5"
              role="radiogroup"
              aria-label="Materialausführung wählen"
            >
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => {
                      setSelectedVariant(v);
                      if (quantity > v.stock) setQuantity(Math.max(1, v.stock));
                    }}
                    className={`flex items-center justify-between rounded-sm border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-[#8F4400] bg-amber-50/50 shadow-xs ring-1 ring-[#8F4400]'
                        : 'border-stone-200 bg-white hover:border-stone-400'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm text-[#1E1D1B]">
                        {v.name}
                      </p>
                      <p className="font-mono text-xs text-stone-600">
                        {v.materialFinish}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-semibold text-[#1E1D1B]">
                        {v.priceDeltaEur > 0
                          ? `+${formatPriceEur(v.priceDeltaEur)}`
                          : 'Inklusive'}
                      </span>
                      <p className="font-mono text-[10px] text-stone-600">
                        {v.stock > 0
                          ? `${v.stock} Stück verfügbar`
                          : 'Derzeit vergriffen'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stock & Availability Info */}
          <div className="rounded-sm bg-stone-100 p-4 font-mono text-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold">
                Sofort versandfertig aus Atelier
              </span>
            </div>
            <p className="text-stone-600">
              Geprüft und signiert. Lieferzeit ca. 3–5 Werktage
              (Spezial-Kunsttransport).
            </p>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-sm border border-stone-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                  aria-label="Menge verringern"
                >
                  −
                </button>
                <span
                  className="px-4 py-2 font-mono text-sm font-semibold text-[#1E1D1B]"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(maxAvailable, q + 1))
                  }
                  disabled={quantity >= maxAvailable}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                  aria-label="Menge erhöhen"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={selectedVariant.stock === 0}
                className="flex-1 rounded-sm bg-[#8F4400] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8F4400] disabled:bg-stone-300"
              >
                In den Warenkorb ({formatPriceEur(currentPriceEur * quantity)})
              </button>
            </div>

            {/* Added Confirmation Banner */}
            {addedNotice && (
              <div
                className="rounded-sm border border-emerald-300 bg-emerald-50 p-4 text-xs animate-in fade-in duration-200"
                role="status"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-900">
                    ✓ {quantity}× {product.name} ({selectedVariant.name}) in den
                    Warenkorb gelegt!
                  </span>
                  <Link
                    href="/warenkorb"
                    className="font-mono font-bold text-emerald-950 underline hover:text-emerald-800"
                  >
                    Zum Warenkorb →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Photometric Technical Specifications Table */}
          <div className="border-t border-stone-200 pt-8 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Lichttechnische Spezifikation
            </h2>
            <div className="overflow-hidden rounded-sm border border-stone-200 bg-white">
              <table className="w-full text-left font-mono text-xs">
                <tbody className="divide-y divide-stone-100">
                  <tr className="bg-stone-50/50">
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Farbwiedergabeindex
                    </th>
                    <td className="px-4 py-2.5 font-semibold text-[#1E1D1B]">
                      {product.photometrics.cri}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Farbtemperatur
                    </th>
                    <td className="px-4 py-2.5 text-[#1E1D1B]">
                      {product.photometrics.kelvinRange}
                    </td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Lichtstrom
                    </th>
                    <td className="px-4 py-2.5 text-[#1E1D1B]">
                      {product.photometrics.fluxLumen} lm
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Leistung & Effizienz
                    </th>
                    <td className="px-4 py-2.5 text-[#1E1D1B]">
                      {product.photometrics.powerWatt} W (
                      {product.photometrics.efficacyLmWatt} lm/W)
                    </td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Abstrahlcharakteristik
                    </th>
                    <td className="px-4 py-2.5 text-[#1E1D1B]">
                      {product.photometrics.beamAngle}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Steuerungsprotokolle
                    </th>
                    <td className="px-4 py-2.5 text-[#1E1D1B]">
                      {product.photometrics.controlProtocols.join(', ')}
                    </td>
                  </tr>
                  <tr className="bg-stone-50/50">
                    <th
                      scope="row"
                      className="px-4 py-2.5 font-medium text-stone-600"
                    >
                      Abmessungen
                    </th>
                    <td className="px-4 py-2.5 text-[#1E1D1B]">
                      {product.dimensions}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Craftsmanship Bullet Points */}
          <div className="border-t border-stone-200 pt-6 space-y-3">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Manufaktur & Werkstatt
            </h2>
            <ul className="space-y-2 text-xs text-stone-600">
              {product.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#8F4400] font-bold">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-stone-300 pt-12">
          <h2 className="font-serif text-2xl font-normal text-[#1E1D1B]">
            Verwandte Lichtarchitekturen
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((rel) => (
              <article
                key={rel.id}
                className="group flex flex-col rounded-sm border border-stone-200 bg-white transition-all hover:border-stone-400"
              >
                <Link
                  href={`/produkte/${rel.slug}`}
                  className="relative aspect-square w-full overflow-hidden bg-stone-100"
                >
                  <Image
                    src={rel.image}
                    alt={`${rel.name} – ${rel.material}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-xs bg-[#1E1D1B]/80 px-2 py-0.5 font-mono text-[10px] text-stone-200 uppercase">
                    {rel.categoryLabel}
                  </div>
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-lg font-normal text-[#1E1D1B] group-hover:text-[#8F4400] transition-colors">
                      <Link href={`/produkte/${rel.slug}`}>{rel.name}</Link>
                    </h3>
                    <span className="font-mono text-xs font-semibold text-[#1E1D1B]">
                      {formatPriceEur(rel.basePriceEur)}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-stone-500 line-clamp-1">
                    {rel.material}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
