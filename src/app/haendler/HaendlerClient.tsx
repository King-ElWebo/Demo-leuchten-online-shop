'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/lib/domain/context';
import type { MerchantTimeframe, Order } from '@/lib/domain/types';
import { calculateMerchantMetrics } from '@/data/merchant';
import { formatPriceEur, formatPercent } from '@/lib/domain/formatters';

export function HaendlerClient() {
  const { orders, resetDemoData } = useShop();

  const [timeframe, setTimeframe] = useState<MerchantTimeframe>('30');
  const [orderSearch, setOrderSearch] = useState('');
  const [originFilter, setOriginFilter] = useState<
    'all' | 'historical_sample' | 'local_demo'
  >('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [resetNotice, setResetNotice] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{
    dateLabel: string;
    revenueEur: number;
    orders: number;
  } | null>(null);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedOrder) {
        setSelectedOrder(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOrder]);

  // Causal KPI calculations
  const metrics = useMemo(() => {
    return calculateMerchantMetrics(orders, timeframe);
  }, [orders, timeframe]);

  // Filter orders for the table
  const displayedOrders = useMemo(() => {
    return metrics.filteredOrders.filter((order) => {
      if (originFilter !== 'all' && order.origin !== originFilter) {
        return false;
      }
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        const matchId = order.orderId.toLowerCase().includes(q);
        const matchCustomer = order.customerName.toLowerCase().includes(q);
        const matchCompany =
          order.customerCompany?.toLowerCase().includes(q) || false;
        const matchItem = order.items.some((it) =>
          it.productName.toLowerCase().includes(q),
        );
        if (!matchId && !matchCustomer && !matchCompany && !matchItem) {
          return false;
        }
      }
      return true;
    });
  }, [metrics.filteredOrders, originFilter, orderSearch]);

  const handleReset = () => {
    if (
      window.confirm(
        'Möchten Sie alle im Browser erstellten Demo-Bestellungen zurücksetzen und die Standard-Beispieldaten wiederherstellen?',
      )
    ) {
      const res = resetDemoData();
      if (res.success) {
        setResetNotice(true);
        setResetError(null);
        setTimeout(() => setResetNotice(false), 4000);
      } else {
        setResetError(
          res.error ||
            'Demo-Daten konnten im lokalen Speicher nicht zurückgesetzt werden.',
        );
        setResetNotice(false);
        setTimeout(() => setResetError(null), 6000);
      }
    }
  };

  // Max revenue for SVG chart scaling
  const maxRevenue = useMemo(() => {
    const max = Math.max(...metrics.chartPoints.map((p) => p.revenueEur), 1000);
    return Math.ceil(max / 1000) * 1000;
  }, [metrics.chartPoints]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Banner: Honest Demo Cockpit Indicator */}
      <div className="rounded-sm border border-stone-300 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-mono text-xs font-semibold tracking-widest text-[#8F4400] uppercase">
                B2B Händler-Cockpit · Live Demonstrator
              </span>
            </div>
            <h1 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#1E1D1B]">
              Kaufmännische Steuerung & Auftragsüberblick
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Causale Echtzeit-Berechnung aller KPIs. Geben Sie im Shop eine
              Bestellung auf, um die Kennzahlen live zu verändern.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-sm border border-stone-300 bg-stone-50 px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-stone-700 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-800 transition-colors"
              title="Entfernt alle lokalen Browser-Bestellungen und stellt 7 historische Beispieldaten wieder her"
            >
              Demo-Daten zurücksetzen
            </button>
            <Link
              href="/katalog"
              className="rounded-sm bg-[#1E1D1B] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800 transition-colors"
            >
              Zum Shop
            </Link>
          </div>
        </div>

        {resetNotice && (
          <div
            role="status"
            className="mt-4 rounded-sm border border-emerald-300 bg-emerald-50 p-3 font-mono text-xs text-emerald-900 animate-in fade-in duration-200"
          >
            ✓ Demo-Bestellungen wurden zurückgesetzt. Die kaufmännischen
            Kennzahlen basieren wieder auf den 7 historischen Referenzaufträgen.
          </div>
        )}

        {resetError && (
          <div
            role="alert"
            data-testid="haendler-reset-error"
            className="mt-4 rounded-sm border border-rose-300 bg-rose-50 p-3 font-mono text-xs text-rose-900 animate-in fade-in duration-200"
          >
            ✕ {resetError}
          </div>
        )}
      </div>

      {/* Timeframe Selector Bar */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-stone-600">
            Analysezeitraum (Referenzstichtag: 25.09.2026)
          </span>
        </div>
        <div
          className="inline-flex rounded-sm border border-stone-300 bg-stone-100 p-1 font-mono text-xs"
          role="group"
          aria-label="Zeitraum wählen"
        >
          <button
            type="button"
            onClick={() => setTimeframe('7')}
            aria-pressed={timeframe === '7'}
            className={`rounded-xs px-3.5 py-1.5 transition-colors ${
              timeframe === '7'
                ? 'bg-white font-semibold text-[#1E1D1B] shadow-xs'
                : 'text-stone-600 hover:text-[#1E1D1B]'
            }`}
          >
            Letzte 7 Tage
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('30')}
            aria-pressed={timeframe === '30'}
            className={`rounded-xs px-3.5 py-1.5 transition-colors ${
              timeframe === '30'
                ? 'bg-white font-semibold text-[#1E1D1B] shadow-xs'
                : 'text-stone-600 hover:text-[#1E1D1B]'
            }`}
          >
            Letzte 30 Tage
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('90')}
            aria-pressed={timeframe === '90'}
            className={`rounded-xs px-3.5 py-1.5 transition-colors ${
              timeframe === '90'
                ? 'bg-white font-semibold text-[#1E1D1B] shadow-xs'
                : 'text-stone-600 hover:text-[#1E1D1B]'
            }`}
          >
            Letzte 90 Tage
          </button>
        </div>
      </div>

      {/* Authoritative Two-Tier B2B KPI Cockpit */}
      <div className="mt-8 space-y-4">
        {/* Tier 1: Dominant Business Anchors (Gross Revenue & Order Count) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Primary Lead Metric: Bruttoumsatz */}
          <div className="lg:col-span-8 rounded-sm border border-stone-300 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-600">
                  Bruttoumsatz (inkl. 20 % USt.)
                </span>
                <span className="rounded-xs bg-stone-100 px-2.5 py-0.5 font-mono text-[10px] text-stone-600 uppercase">
                  Leitmetrik · Österreich
                </span>
              </div>
              <p
                className="mt-3 font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[#1E1D1B]"
                data-testid="kpi-revenue"
              >
                {formatPriceEur(metrics.totalRevenueEur)}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-stone-600">
              <span className="font-medium">
                Netto: {formatPriceEur(metrics.netRevenueEur)} · 20 % USt.
              </span>
              {metrics.localOrdersCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-xs bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-emerald-800 font-semibold text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  <span>
                    +{metrics.localOrdersCount} Demo-Auftrag/Aufträge aktiv
                    verrechnet
                  </span>
                </span>
              ) : (
                <span className="text-stone-500 text-[11px]">
                  Basiert auf {metrics.historicalOrdersCount} Referenzaufträgen
                </span>
              )}
            </div>
          </div>

          {/* Secondary Lead Metric: Bestellvolumen */}
          <div className="lg:col-span-4 rounded-sm border border-stone-300 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-600">
                Bestellungen
              </span>
              <p
                className="mt-3 font-mono text-4xl sm:text-5xl font-bold tracking-tight text-[#1E1D1B]"
                data-testid="kpi-orders-count"
              >
                {metrics.ordersCount}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 font-mono text-xs text-stone-600">
              {metrics.localOrdersCount > 0 ? (
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-emerald-700 font-semibold">
                    {metrics.localOrdersCount} Browser-Demo
                  </span>
                  <span>·</span>
                  <span className="text-stone-600">
                    {metrics.historicalOrdersCount} Referenzdaten
                  </span>
                </div>
              ) : (
                <span className="text-stone-500 text-[11px]">
                  Zeitfenster: Letzte {metrics.timeframeDays} Tage
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tier 2: Secondary Operational Telemetry Ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* KPI 3: Ø Bestellwert (AOV) */}
          <div className="rounded-sm border border-stone-200 bg-stone-50/70 p-4 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-wider text-stone-600">
              Ø Bestellwert (AOV)
            </span>
            <p
              className="mt-1 font-mono text-xl font-bold text-[#1E1D1B]"
              data-testid="kpi-aov"
            >
              {formatPriceEur(metrics.averageOrderValueEur)}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-stone-500">
              Umsatz / Aufträge
            </p>
          </div>

          {/* KPI 4: Conversion Rate */}
          <div className="rounded-sm border border-stone-200 bg-stone-50/70 p-4 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-wider text-stone-600">
              Conversion Rate (CR)
            </span>
            <p
              className="mt-1 font-mono text-xl font-bold text-[#8F4400]"
              data-testid="kpi-conversion-rate"
            >
              {formatPercent(metrics.conversionRatePercent)}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-stone-500">
              Aufträge / Sessions
            </p>
          </div>

          {/* KPI 5: Sitzungen / Benchmark */}
          <div className="rounded-sm border border-stone-200 bg-stone-50/70 p-4 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-wider text-stone-600">
              Sitzungen (Benchmark)
            </span>
            <p
              className="mt-1 font-mono text-xl font-bold text-[#1E1D1B]"
              data-testid="kpi-sessions"
            >
              {metrics.sessionsCount.toLocaleString('de-DE')}
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-stone-500">
              {metrics.uniqueVisitorsCount.toLocaleString('de-DE')} Unique Users
              (Referenz)
            </p>
          </div>
        </div>
      </div>

      {/* Time Series SVG Chart with Horizontal Overflow Scrollbar */}
      <div className="mt-8 rounded-sm border border-stone-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Umsatzverlauf (Tageswerte in €)
            </h2>
            <p className="font-mono text-[11px] text-stone-500">
              Klicken oder zeigen Sie auf einen Tag für exakte Werte.
            </p>
          </div>
          {hoveredPoint && (
            <div className="rounded-xs bg-[#1E1D1B] px-3 py-1 font-mono text-xs text-white">
              <span>{hoveredPoint.dateLabel}: </span>
              <span className="font-bold text-amber-300">
                {formatPriceEur(hoveredPoint.revenueEur)}
              </span>
              <span>
                {' '}
                ({hoveredPoint.orders}{' '}
                {hoveredPoint.orders === 1 ? 'Auftrag' : 'Aufträge'})
              </span>
            </div>
          )}
        </div>

        {/* Responsive Bar Chart with overflow-x-auto */}
        <div
          className="mt-6 w-full overflow-x-auto pb-4 custom-scrollbar"
          tabIndex={0}
          role="region"
          aria-label="Umsatzverlauf Diagramm (horizontal scrollbar)"
        >
          <div className="flex h-48 min-w-[500px] items-end gap-1 sm:gap-2 pt-6">
            {metrics.chartPoints.map((pt) => {
              const heightPercent =
                maxRevenue > 0 ? (pt.revenueEur / maxRevenue) * 100 : 0;
              const hasRevenue = pt.revenueEur > 0;
              return (
                <div
                  key={pt.date}
                  className="group relative flex flex-1 flex-col items-center h-full justify-end"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-xs transition-all duration-300 ${
                      hasRevenue
                        ? 'bg-[#8F4400] group-hover:bg-[#783800]'
                        : 'bg-stone-200 group-hover:bg-stone-300'
                    }`}
                    style={{
                      height: `${Math.max(hasRevenue ? heightPercent : 3, 2)}%`,
                    }}
                  />

                  {/* Day label */}
                  <span className="mt-2 font-mono text-[9px] text-stone-500 group-hover:text-[#1E1D1B] rotate-45 sm:rotate-0 origin-left">
                    {pt.dateLabel.slice(0, 5)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Grid: Top Products & Live Inventory */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Top-Selling Products */}
        <div className="lg:col-span-6 rounded-sm border border-stone-200 bg-white p-6 shadow-xs">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
            Meistverkaufte Instrumente ({metrics.timeframeDays} Tage)
          </h2>
          <div className="mt-4 overflow-hidden rounded-xs border border-stone-200">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-700">
                <tr>
                  <th className="px-3 py-2">Produkt / Finish</th>
                  <th className="px-3 py-2 text-center">Stück</th>
                  <th className="px-3 py-2 text-right">Umsatz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {metrics.topProducts.slice(0, 5).map((tp, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50">
                    <td className="px-3 py-2.5">
                      <p className="font-bold text-[#1E1D1B]">{tp.name}</p>
                      <p className="text-[11px] text-stone-600">{tp.variant}</p>
                    </td>
                    <td className="px-3 py-2.5 text-center font-semibold text-[#1E1D1B]">
                      {tp.unitsSold}
                    </td>
                    <td className="px-3 py-2.5 text-right font-semibold text-[#8F4400]">
                      {formatPriceEur(tp.revenueEur)}
                    </td>
                  </tr>
                ))}
                {metrics.topProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-3 py-4 text-center text-stone-500"
                    >
                      Keine Verkäufe im gewählten Zeitraum.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Inventory Status with Local Deductions */}
        <div className="lg:col-span-6 rounded-sm border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex justify-between items-baseline">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Lagerbestand & Reservierungen
            </h2>
            <span className="font-mono text-[10px] text-stone-500">
              Live aktualisiert
            </span>
          </div>
          <div
            className="mt-4 overflow-hidden rounded-xs border border-stone-200 max-h-72 overflow-y-auto custom-scrollbar"
            tabIndex={0}
            role="region"
            aria-label="Lagerbestand Tabelle (vertikal scrollbar)"
          >
            <table
              className="w-full text-left font-mono text-xs"
              data-testid="inventory-table"
            >
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 sticky top-0">
                <tr>
                  <th className="px-3 py-2">Leuchte</th>
                  <th className="px-3 py-2">SKU</th>
                  <th className="px-3 py-2 text-center">Bestand</th>
                  <th className="px-3 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {metrics.inventory.map((inv) => (
                  <tr key={inv.sku} className="hover:bg-stone-50/50">
                    <td className="px-3 py-2">
                      <p className="font-medium text-[#1E1D1B]">
                        {inv.productName}
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {inv.variantName}
                      </p>
                    </td>
                    <td className="px-3 py-2 text-stone-600 text-[11px]">
                      {inv.sku}
                    </td>
                    <td className="px-3 py-2 text-center font-bold text-[#1E1D1B]">
                      {inv.currentStock}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {inv.status === 'optimal' && (
                        <span className="rounded-xs bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-900">
                          Optimal
                        </span>
                      )}
                      {inv.status === 'low' && (
                        <span className="rounded-xs bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-950">
                          Knapp
                        </span>
                      )}
                      {inv.status === 'out_of_stock' && (
                        <span className="rounded-xs bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-950">
                          Vergriffen
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Orders Table with Distinction for Browser vs Historical Orders */}
      <div className="mt-10 rounded-sm border border-stone-200 bg-white p-6 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#1E1D1B]">
              Auftragsverwaltung ({displayedOrders.length}{' '}
              {displayedOrders.length === 1 ? 'Auftrag' : 'Aufträge'})
            </h2>
            <p className="font-mono text-xs text-stone-600 mt-1">
              Klicken Sie auf eine Zeile, um vollständige Bestelldetails und
              Positionen einzusehen.
            </p>
          </div>

          {/* Search & Origin Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              placeholder="Suchen nach ID, Kunde..."
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              className="rounded-sm border border-stone-300 px-3 py-1.5 font-mono text-xs text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none"
            />
            <select
              aria-label="Auftragsherkunft filtern"
              value={originFilter}
              onChange={(e) =>
                setOriginFilter(
                  e.target.value as 'all' | 'historical_sample' | 'local_demo',
                )
              }
              className="rounded-sm border border-stone-300 bg-stone-50 px-3 py-1.5 font-mono text-xs text-[#1E1D1B] focus:border-[#8F4400] focus:outline-none"
            >
              <option value="all">Alle Herkünfte</option>
              <option value="local_demo">Nur lokale Demo-Bestellungen</option>
              <option value="historical_sample">
                Nur historische Beispieldaten
              </option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div
          className="overflow-x-auto custom-scrollbar"
          tabIndex={0}
          role="region"
          aria-label="Auftragsverwaltung Tabelle (horizontal scrollbar)"
        >
          <table
            className="w-full min-w-[700px] text-left font-mono text-xs"
            data-testid="orders-table"
          >
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-700">
              <tr>
                <th className="px-4 py-3">Auftrags-ID</th>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Kunde / Büro</th>
                <th className="px-4 py-3">Positionen</th>
                <th className="px-4 py-3 text-right">Gesamtsumme</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Herkunft</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {displayedOrders.map((order) => {
                const isLocal = order.origin === 'local_demo';
                return (
                  <tr
                    key={order.orderId}
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer transition-colors hover:bg-stone-50"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedOrder(order);
                      }
                    }}
                    aria-label={`Details zu Auftrag ${order.orderId} öffnen`}
                  >
                    <td className="px-4 py-3.5 font-bold text-[#1E1D1B]">
                      {order.orderId}
                    </td>
                    <td className="px-4 py-3.5 text-stone-600">{order.date}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#1E1D1B]">
                        {order.customerName}
                      </p>
                      {order.customerCompany && (
                        <p className="text-[11px] text-stone-600">
                          {order.customerCompany}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-stone-600">
                      {order.items.reduce((s, it) => s + it.quantity, 0)} Stück
                      ({order.items.map((i) => i.productName).join(', ')})
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-[#1E1D1B]">
                      {formatPriceEur(order.totalAmountEur)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="rounded-xs bg-stone-200 px-2 py-0.5 text-[11px] text-stone-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {isLocal ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xs border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
                          <span>Lokale Demo-Bestellung (Dieser Browser)</span>
                        </span>
                      ) : (
                        <span className="rounded-xs bg-stone-100 px-2 py-0.5 text-[11px] text-stone-700">
                          Historische Beispieldaten
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {displayedOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-stone-500"
                  >
                    Keine Aufträge gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-order-title"
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl custom-scrollbar">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="absolute right-4 top-4 rounded-sm p-1.5 font-mono text-sm text-stone-600 hover:bg-stone-100 hover:text-[#1E1D1B]"
              aria-label="Modal schließen"
            >
              ✕
            </button>

            <div className="border-b border-stone-200 pb-4">
              <span className="font-mono text-xs font-semibold text-[#8F4400] uppercase">
                Auftragsdetails
              </span>
              <h3
                id="modal-order-title"
                className="font-serif text-2xl font-normal text-[#1E1D1B] mt-1"
              >
                Bestellung {selectedOrder.orderId}
              </h3>
              <p className="font-mono text-xs text-stone-600 mt-1">
                Eingegangen am: {selectedOrder.date} · Status:{' '}
                {selectedOrder.status}
              </p>
            </div>

            {/* Badges and Origin */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedOrder.origin === 'local_demo' ? (
                <span className="rounded-xs border border-amber-300 bg-amber-100 px-2.5 py-1 font-mono text-xs font-semibold text-amber-900">
                  ★ Lokale Demo-Bestellung aus diesem Browser
                </span>
              ) : (
                <span className="rounded-xs bg-stone-100 px-2.5 py-1 font-mono text-xs text-stone-700">
                  Historischer Beispieldatensatz (Atelier-Archiv)
                </span>
              )}
              <span className="rounded-xs bg-stone-100 px-2.5 py-1 font-mono text-xs text-stone-700">
                Zahlungsart: {selectedOrder.paymentMethod}
              </span>
            </div>

            {/* Customer & Address */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs border-t border-stone-100 pt-4">
              <div>
                <p className="text-stone-500 uppercase">Kunde</p>
                <p className="font-bold text-[#1E1D1B] mt-1">
                  {selectedOrder.customerName}
                </p>
                {selectedOrder.customerCompany && (
                  <p className="text-stone-600">
                    {selectedOrder.customerCompany}
                  </p>
                )}
                <p className="text-stone-600">{selectedOrder.customerEmail}</p>
              </div>
              <div>
                <p className="text-stone-500 uppercase">Lieferadresse</p>
                <p className="text-[#1E1D1B] mt-1">
                  {selectedOrder.shippingAddress}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-6 border-t border-stone-200 pt-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E1D1B]">
                Enthaltene Positionen
              </h4>
              <div className="mt-3 overflow-hidden rounded-xs border border-stone-200">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-700">
                    <tr>
                      <th className="px-3 py-2">Produkt</th>
                      <th className="px-3 py-2">SKU</th>
                      <th className="px-3 py-2 text-center">Menge</th>
                      <th className="px-3 py-2 text-right">Gesamt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {selectedOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2.5">
                          <p className="font-bold text-[#1E1D1B]">
                            {it.productName}
                          </p>
                          <p className="text-[11px] text-stone-600">
                            {it.variantName}
                          </p>
                        </td>
                        <td className="px-3 py-2.5 text-stone-600">{it.sku}</td>
                        <td className="px-3 py-2.5 text-center font-bold text-[#1E1D1B]">
                          {it.quantity}
                        </td>
                        <td className="px-3 py-2.5 text-right font-bold text-[#1E1D1B]">
                          {formatPriceEur(it.totalPriceEur)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-stone-50 font-bold">
                      <td colSpan={3} className="px-3 py-2.5 text-right">
                        Gesamtsumme
                      </td>
                      <td className="px-3 py-2.5 text-right text-[#8F4400]">
                        {formatPriceEur(selectedOrder.totalAmountEur)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-sm bg-[#1E1D1B] px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-stone-800"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
