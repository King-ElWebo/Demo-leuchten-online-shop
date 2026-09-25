'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/lib/domain/context';
import { formatPriceEur } from '@/lib/domain/formatters';

export function WarenkorbClient() {
  const {
    cart,
    cartCount,
    cartSubtotalEur,
    cartTaxEur,
    cartTotalEur,
    updateQuantity,
    removeFromCart,
    clearCart,
    storageError,
  } = useShop();

  const [quantityError, setQuantityError] = React.useState<string | null>(null);

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setQuantityError(null);
    const res = updateQuantity(itemId, newQty);
    if (!res.success && res.error) {
      setQuantityError(res.error);
      setTimeout(() => setQuantityError(null), 5000);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-sm border border-stone-200 bg-white p-12 shadow-xs">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-normal text-[#1E1D1B]">
            Ihr Warenkorb ist leer
          </h1>
          <p className="mt-3 text-sm text-stone-600 max-w-md mx-auto">
            Sie haben noch keine Lichtarchitekturen oder Konfigurationen
            ausgewählt. Entdecken Sie unsere handgefertigten Kleinserien im
            Katalog.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/katalog"
              className="rounded-sm bg-[#8F4400] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800]"
            >
              Zum Gesamtkatalog
            </Link>
            <Link
              href="/konfigurator"
              className="rounded-sm border border-stone-300 bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B] transition-colors hover:border-[#8F4400]"
            >
              Konfigurator starten
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-stone-300 pb-6">
        <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
          Bestellübersicht
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]">
          Warenkorb ({cartCount} {cartCount === 1 ? 'Position' : 'Positionen'})
        </h1>
      </div>

      {storageError && (
        <div className="mt-6 rounded-sm border border-amber-300 bg-amber-50 p-4 text-xs font-mono text-amber-900">
          Hinweis: Lokale Speicherung im Browser eingeschränkt ({storageError}).
        </div>
      )}

      {quantityError && (
        <div
          role="alert"
          data-testid="cart-quantity-error"
          className="mt-6 rounded-sm border border-rose-300 bg-rose-50 p-4 font-mono text-xs text-rose-900"
        >
          ✕ {quantityError}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="divide-y divide-stone-200 rounded-sm border border-stone-200 bg-white">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:flex sm:items-start sm:gap-6"
              >
                {/* Thumbnail */}
                <div className="relative aspect-square h-28 w-28 shrink-0 overflow-hidden rounded-xs border border-stone-200 bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="mt-4 flex flex-1 flex-col justify-between sm:mt-0">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-serif text-lg font-normal text-[#1E1D1B]">
                          <Link
                            href={`/produkte/${item.productSlug}`}
                            className="hover:text-[#8F4400] transition-colors"
                          >
                            {item.productName}
                          </Link>
                        </h2>
                        <p className="font-mono text-xs text-stone-600 mt-0.5">
                          {item.variantName}
                        </p>
                        {item.configurationSummary?.kelvin && (
                          <p className="font-mono text-[11px] text-[#8F4400] mt-1">
                            Lichtfarbe: {item.configurationSummary.kelvin}{' '}
                            Kelvin
                            {item.configurationSummary.dropLength &&
                              ` · Abhängung: ${item.configurationSummary.dropLength}`}
                          </p>
                        )}
                        <p className="font-mono text-[11px] text-stone-600 mt-0.5">
                          SKU: {item.sku}
                        </p>
                      </div>
                      <span className="font-mono text-base font-bold text-[#1E1D1B]">
                        {formatPriceEur(item.unitPriceEur * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Remove action */}
                  <div className="mt-6 flex items-center justify-between border-t border-stone-100 pt-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-stone-600 uppercase">
                        Menge:
                      </span>
                      <div className="flex items-center rounded-sm border border-stone-300 bg-stone-50">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200"
                          aria-label={`Menge für ${item.productName} verringern`}
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-mono text-xs font-semibold text-[#1E1D1B]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200"
                          aria-label={`Menge für ${item.productName} erhöhen`}
                        >
                          +
                        </button>
                      </div>
                      <span className="font-mono text-xs text-stone-600">
                        à {formatPriceEur(item.unitPriceEur)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="font-mono text-xs text-rose-700 hover:text-rose-900 underline"
                      aria-label={`${item.productName} aus dem Warenkorb entfernen`}
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              href="/katalog"
              className="font-mono text-xs font-medium text-stone-600 hover:text-[#8F4400] transition-colors"
            >
              ← Weiter einkaufen
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="font-mono text-xs text-stone-600 hover:text-stone-900 underline"
            >
              Warenkorb vollständig leeren
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-xs space-y-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Zusammenfassung
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Zwischensumme (Netto)</span>
                <span>{formatPriceEur(cartSubtotalEur)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>20 % USt. (Österreich)</span>
                <span>{formatPriceEur(cartTaxEur)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Versicherter Kunstkurier</span>
                <span className="text-emerald-700 font-semibold">
                  Kostenlos
                </span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-bold text-[#1E1D1B]">
                <span>Gesamtbetrag (Brutto)</span>
                <span>{formatPriceEur(cartTotalEur)}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/kasse"
                className="block w-full rounded-sm bg-[#8F4400] py-3.5 text-center font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8F4400]"
              >
                Zur Demo-Kasse gehen →
              </Link>
            </div>

            <div className="rounded-xs bg-stone-50 p-4 font-mono text-[11px] text-stone-600 space-y-1">
              <p className="font-semibold text-stone-700">
                Showcase-Bestellablauf:
              </p>
              <p>
                In der Demo-Kasse werden keine Zahlungsdaten abgefragt. Ihre
                Bestellung wird lokal erfasst und sofort im Händler-Cockpit
                ausgewertet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
