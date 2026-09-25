'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/lib/domain/context';
import type { Order } from '@/lib/domain/types';
import { formatPriceEur, formatDateDe } from '@/lib/domain/formatters';

export function KasseClient() {
  const { cart, cartSubtotalEur, cartTaxEur, cartTotalEur, createDemoOrder } =
    useShop();

  const [customerName, setCustomerName] = useState(
    'Architektur & Licht Raumgestaltung',
  );
  const [customerEmail, setCustomerEmail] = useState(
    'kontakt@raumgestaltung-wien.at',
  );
  const [customerCompany, setCustomerCompany] = useState(
    'Raumgestaltung Winkler GmbH',
  );
  const [street, setStreet] = useState('Herrengasse 14');
  const [zip, setZip] = useState('1010');
  const [city, setCity] = useState('Wien');
  const shippingSpeed = 'standard';
  const [formError, setFormError] = useState<string | null>(null);

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (
      !customerName.trim() ||
      !customerEmail.trim() ||
      !street.trim() ||
      !zip.trim() ||
      !city.trim()
    ) {
      setFormError('Bitte füllen Sie alle erforderlichen Pflichtfelder aus.');
      return;
    }

    const shippingAddress = `${street}, ${zip} ${city}, Österreich`;

    const res = createDemoOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerCompany: customerCompany.trim() || undefined,
      shippingAddress,
      shippingSpeed,
    });

    if (res.success && res.order) {
      setConfirmedOrder(res.order);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setFormError(res.error || 'Fehler beim Erstellen der Demo-Bestellung.');
    }
  };

  // Confirmation View
  if (confirmedOrder) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-emerald-300 bg-white p-8 sm:p-12 shadow-md space-y-8">
          <div className="border-b border-stone-200 pb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
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
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8F4400]">
              Demo-Auftrag erfolgreich erfasst
            </span>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]">
              Vielen Dank für Ihre Bestellung!
            </h1>
            <p className="mt-2 font-mono text-sm text-stone-600">
              Auftragsnummer:{' '}
              <span className="font-bold text-[#1E1D1B]">
                {confirmedOrder.orderId}
              </span>
            </p>
          </div>

          {/* Callout to Merchant Cockpit */}
          <div className="rounded-sm border border-[#8F4400] bg-[#8F4400]/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#8F4400]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                ★ Interaktive Händler-Integration
              </span>
            </div>
            <p className="text-sm text-[#1E1D1B] leading-relaxed">
              Ihre Demo-Bestellung ({confirmedOrder.orderId} über{' '}
              {formatPriceEur(confirmedOrder.totalAmountEur)}) wurde im lokalen
              Browserspeicher abgelegt und fließt{' '}
              <strong>sofort kausal in alle Händler-Kennzahlen</strong> ein
              (Umsatz, AOV, Conversion Rate und Bestandsabzug).
            </p>
            <div>
              <Link
                href="/haendler"
                className="inline-flex items-center gap-2 rounded-sm bg-[#1E1D1B] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800 transition-colors"
              >
                <span>Bestellung jetzt im Händler-Cockpit prüfen</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs border-t border-stone-200 pt-6">
            <div>
              <p className="text-stone-600 uppercase">Bestelldetails</p>
              <p className="font-semibold text-[#1E1D1B] mt-1">
                Datum: {formatDateDe(confirmedOrder.date)}
              </p>
              <p className="text-[#1E1D1B]">Status: {confirmedOrder.status}</p>
              <p className="text-[#1E1D1B]">
                Zahlungsart: {confirmedOrder.paymentMethod}
              </p>
              <p className="text-emerald-700 font-semibold mt-1">
                Herkunft: Lokale Browser-Bestellung
              </p>
            </div>

            <div>
              <p className="text-stone-600 uppercase">
                Lieferanschrift & Kunde
              </p>
              <p className="font-semibold text-[#1E1D1B] mt-1">
                {confirmedOrder.customerName}
              </p>
              {confirmedOrder.customerCompany && (
                <p className="text-stone-700">
                  {confirmedOrder.customerCompany}
                </p>
              )}
              <p className="text-stone-700">{confirmedOrder.shippingAddress}</p>
              <p className="text-stone-600 mt-1">
                {confirmedOrder.customerEmail}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border-t border-stone-200 pt-6 space-y-4">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Bestellte Positionen
            </h2>
            <div className="overflow-hidden rounded-sm border border-stone-200">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600">
                  <tr>
                    <th className="px-4 py-2.5">Position</th>
                    <th className="px-4 py-2.5">SKU</th>
                    <th className="px-4 py-2.5 text-center">Menge</th>
                    <th className="px-4 py-2.5 text-right">Gesamt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {confirmedOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#1E1D1B]">
                          {it.productName}
                        </p>
                        <p className="text-[11px] text-stone-600">
                          {it.variantName}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-stone-600">{it.sku}</td>
                      <td className="px-4 py-3 text-center">{it.quantity}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[#1E1D1B]">
                        {formatPriceEur(it.totalPriceEur)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50/70 font-semibold">
                    <td colSpan={3} className="px-4 py-3 text-right">
                      Gesamtbetrag (inkl. 20 % USt.)
                    </td>
                    <td className="px-4 py-3 text-right text-base text-[#8F4400]">
                      {formatPriceEur(confirmedOrder.totalAmountEur)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-stone-200">
            <Link
              href="/katalog"
              className="rounded-sm border border-stone-300 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-stone-700 hover:border-[#8F4400] transition-colors"
            >
              ← Zurück zum Katalog
            </Link>
            <Link
              href="/haendler"
              className="rounded-sm bg-[#8F4400] px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#783800] transition-colors"
            >
              Händler-Cockpit aufrufen →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no order confirmed yet
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-normal text-[#1E1D1B]">
          Ihr Warenkorb ist derzeit leer
        </h1>
        <p className="mt-3 text-sm text-stone-600">
          Um die Kasse zu nutzen, legen Sie bitte zunächst mindestens eine
          Leuchte in den Warenkorb.
        </p>
        <div className="mt-8">
          <Link
            href="/katalog"
            className="rounded-sm bg-[#8F4400] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#783800]"
          >
            Zur Kollektion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-stone-300 pb-6">
        <p className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
          Abschluss
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-normal text-[#1E1D1B]">
          Demo-Kasse & Auftragsbestätigung
        </h1>
      </div>

      {/* Honest Disclaimer Banner */}
      <div className="mt-6 rounded-sm border border-amber-300 bg-amber-50/80 p-5 text-xs text-amber-950">
        <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-amber-900">
          <span>ℹ Hinweis zur Demonstration</span>
        </div>
        <p className="mt-1 leading-relaxed">
          Dies ist eine interaktive E-Commerce-Demonstration. Es werden{' '}
          <strong>keine echten Zahlungen</strong> abgewickelt und{' '}
          <strong>keine Kreditkartendaten</strong> erhoben. Der Abschluss
          erzeugt eine lokale Demo-Bestellung, die direkt im Händler-Cockpit
          eingesehen und ausgewertet werden kann.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-sm border border-stone-200 bg-white p-6 sm:p-8 shadow-xs"
          >
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
                1. Auftraggeber & Kontaktdaten
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="customer-name"
                    className="block font-mono text-xs text-stone-700 uppercase"
                  >
                    Vollständiger Name / Ansprechpartner *
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-stone-300 px-3.5 py-2 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="customer-company"
                    className="block font-mono text-xs text-stone-700 uppercase"
                  >
                    Unternehmen / Architekturbüro (Optional)
                  </label>
                  <input
                    id="customer-company"
                    type="text"
                    value={customerCompany}
                    onChange={(e) => setCustomerCompany(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-stone-300 px-3.5 py-2 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="customer-email"
                    className="block font-mono text-xs text-stone-700 uppercase"
                  >
                    E-Mail-Adresse für Auftragsbestätigung *
                  </label>
                  <input
                    id="customer-email"
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-stone-300 px-3.5 py-2 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
                2. Lieferanschrift
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="street"
                    className="block font-mono text-xs text-stone-700 uppercase"
                  >
                    Straße und Hausnummer *
                  </label>
                  <input
                    id="street"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-stone-300 px-3.5 py-2 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zip"
                    className="block font-mono text-xs text-stone-700 uppercase"
                  >
                    Postleitzahl *
                  </label>
                  <input
                    id="zip"
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-stone-300 px-3.5 py-2 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block font-mono text-xs text-stone-700 uppercase"
                  >
                    Stadt / Ort *
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-sm border border-stone-300 px-3.5 py-2 text-sm text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none focus:ring-1 focus:ring-[#8F4400]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-6 space-y-4">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
                3. Zahlungsart (Demo)
              </h2>
              <div className="rounded-sm border border-stone-300 bg-stone-50 p-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="payment-invoice"
                    name="payment"
                    checked
                    readOnly
                    className="accent-[#8F4400]"
                  />
                  <label
                    htmlFor="payment-invoice"
                    className="font-semibold text-[#1E1D1B]"
                  >
                    Rechnungskauf für Fachhandel & Lichtplanung (30 Tage
                    Zahlungsziel – Demo)
                  </label>
                </div>
                <p className="mt-2 text-stone-600 pl-5">
                  Keine Zahlungsabwicklung erforderlich. Rechnungsstellung
                  erfolgt virtuell zur Verbuchung im Händler-Cockpit.
                </p>
              </div>
            </div>

            {formError && (
              <div className="rounded-sm border border-rose-300 bg-rose-50 p-4 font-mono text-xs text-rose-800">
                {formError}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-sm bg-[#8F4400] py-4 font-mono text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition-all hover:bg-[#783800] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8F4400]"
              >
                Verbindliche Demo-Bestellung aufgeben (
                {formatPriceEur(cartTotalEur)})
              </button>
            </div>
          </form>
        </div>

        {/* Order Preview Column */}
        <div className="lg:col-span-5">
          <div className="rounded-sm border border-stone-200 bg-white p-6 shadow-xs space-y-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Bestellübersicht ({cart.length} Positionen)
            </h2>

            <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex justify-between items-start text-xs font-mono"
                >
                  <div>
                    <p className="font-bold text-[#1E1D1B]">
                      {item.quantity}× {item.productName}
                    </p>
                    <p className="text-stone-600">{item.variantName}</p>
                    <p className="text-[10px] text-stone-600">
                      SKU: {item.sku}
                    </p>
                  </div>
                  <span className="font-semibold text-[#1E1D1B]">
                    {formatPriceEur(item.unitPriceEur * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Zwischensumme (Netto)</span>
                <span>{formatPriceEur(cartSubtotalEur)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>20 % USt. (Österreich)</span>
                <span>{formatPriceEur(cartTaxEur)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Kunstkurier (versichert)</span>
                <span className="text-emerald-700 font-semibold">
                  Kostenlos
                </span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-bold text-[#1E1D1B]">
                <span>Gesamt</span>
                <span>{formatPriceEur(cartTotalEur)}</span>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 text-center">
              <Link
                href="/warenkorb"
                className="font-mono text-xs text-stone-600 hover:text-[#8F4400] underline"
              >
                ← Warenkorb bearbeiten
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
