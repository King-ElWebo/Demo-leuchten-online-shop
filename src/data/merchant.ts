import type {
  Order,
  MerchantTimeframe,
  MerchantMetrics,
  TopProductStat,
  InventoryItem,
  DailyMetricsPoint,
} from '@/lib/domain/types';
import { products } from './products';
import { itemMatchesVariant } from '@/lib/domain/stock';

export const BASELINE_REFERENCE_DATE = '2026-09-25';

export const baselineHistoricalOrders: readonly Order[] = [
  {
    orderId: 'LW-2026-9102',
    date: '2026-09-24',
    customerName: 'Architekturbüro Kahl & Partner',
    customerEmail: 'projekte@kahl-architekten.at',
    customerCompany: 'Kahl & Partner ZT GmbH',
    shippingAddress: 'Herrengasse 14, 1010 Wien, Österreich',
    items: [
      {
        productName: 'KORONA I',
        variantName: 'Handpoliertes Messing Natur',
        sku: 'LW-KOR-BRS-01',
        quantity: 1,
        unitPriceEur: 3450,
        totalPriceEur: 3450,
      },
      {
        productName: 'SOLIS DISK',
        variantName: 'Vulkanbasalt & Rohmessing',
        sku: 'LW-SOL-BST-01',
        quantity: 2,
        unitPriceEur: 1890,
        totalPriceEur: 3780,
      },
    ],
    totalAmountEur: 7230,
    status: 'Abgeschlossen',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
  {
    orderId: 'LW-2026-8984',
    date: '2026-09-21',
    customerName: 'Studio Thulstrup Interiors',
    customerEmail: 'procurement@thulstrup-studio.dk',
    customerCompany: 'Thulstrup Design ApS',
    shippingAddress: 'Bredgade 32, 1260 København, Dänemark',
    items: [
      {
        productName: 'AURA COLUMN',
        variantName: 'Dunkle Bronze gebürstet',
        sku: 'LW-AUR-BRZ-01',
        quantity: 2,
        unitPriceEur: 4200,
        totalPriceEur: 8400,
      },
    ],
    totalAmountEur: 8400,
    status: 'Versendet',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
  {
    orderId: 'LW-2026-8741',
    date: '2026-09-15',
    customerName: 'Galerie Hinterland',
    customerEmail: 'kontakt@galerie-hinterland.de',
    customerCompany: 'Hinterland Kunsthandel KG',
    shippingAddress: 'Potsdamer Straße 81, 10785 Berlin, Deutschland',
    items: [
      {
        productName: 'STRATA GRAZER',
        variantName: 'Champagner Eloxal seidenmatt',
        sku: 'LW-STR-CMP-01',
        quantity: 4,
        unitPriceEur: 1640,
        totalPriceEur: 6560,
      },
      {
        productName: 'MONO ATELIER',
        variantName: 'Brüniertes Eisen Zunderfinish',
        sku: 'LW-MNO-IRN-01',
        quantity: 2,
        unitPriceEur: 890,
        totalPriceEur: 1780,
      },
    ],
    totalAmountEur: 8340,
    status: 'Abgeschlossen',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
  {
    orderId: 'LW-2026-8419',
    date: '2026-09-02',
    customerName: 'Privathaus am Attersee (Dr. M. Lindner)',
    customerEmail: 'lindner.attersee@gmail.com',
    shippingAddress: 'Uferstraße 12, 4864 Attersee, Österreich',
    items: [
      {
        productName: 'KORONA I',
        variantName: 'Vulkanbasalt Patina dunkel',
        sku: 'LW-KOR-BST-02',
        quantity: 1,
        unitPriceEur: 3770,
        totalPriceEur: 3770,
      },
      {
        productName: 'KYOTO PENDANT',
        variantName: 'Mattes Opalglas & Zunftmessing',
        sku: 'LW-KYO-OPL-01',
        quantity: 1,
        unitPriceEur: 2150,
        totalPriceEur: 2150,
      },
    ],
    totalAmountEur: 5920,
    status: 'Abgeschlossen',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
  {
    orderId: 'LW-2026-8102',
    date: '2026-08-24',
    customerName: 'Penthouse Seestadt Aspern',
    customerEmail: 'office@aspern-penthouse.at',
    shippingAddress: 'Sonnenallee 45, 1220 Wien, Österreich',
    items: [
      {
        productName: 'KYOTO PENDANT',
        variantName: 'Mattes Opalglas & Zunftmessing',
        sku: 'LW-KYO-OPL-01',
        quantity: 2,
        unitPriceEur: 2150,
        totalPriceEur: 4300,
      },
      {
        productName: 'SOLIS DISK',
        variantName: 'Vulkanbasalt & Rohmessing',
        sku: 'LW-SOL-BST-01',
        quantity: 1,
        unitPriceEur: 1890,
        totalPriceEur: 1890,
      },
    ],
    totalAmountEur: 6190,
    status: 'Abgeschlossen',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
  {
    orderId: 'LW-2026-7840',
    date: '2026-08-11',
    customerName: 'Boutique Hotel Kitzbühel',
    customerEmail: 'rezeption@boutique-kitz.tirol',
    customerCompany: 'Kitz Hospitality Group',
    shippingAddress: 'Schwarzseeallee 8, 6370 Kitzbühel, Österreich',
    items: [
      {
        productName: 'MONO ATELIER',
        variantName: 'Brüniertes Eisen Zunderfinish',
        sku: 'LW-MNO-IRN-01',
        quantity: 6,
        unitPriceEur: 890,
        totalPriceEur: 5340,
      },
      {
        productName: 'STRATA GRAZER',
        variantName: 'Champagner Eloxal seidenmatt',
        sku: 'LW-STR-CMP-01',
        quantity: 2,
        unitPriceEur: 1640,
        totalPriceEur: 3280,
      },
    ],
    totalAmountEur: 8620,
    status: 'Abgeschlossen',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
  {
    orderId: 'LW-2026-7512',
    date: '2026-07-29',
    customerName: 'Kanzlei Dr. Eder & Partner',
    customerEmail: 'kanzlei@eder-partner.at',
    customerCompany: 'Eder Rechtsanwälte GmbH',
    shippingAddress: 'Joanneumring 6, 8010 Graz, Österreich',
    items: [
      {
        productName: 'AURA COLUMN',
        variantName: 'Dunkle Bronze gebürstet',
        sku: 'LW-AUR-BRZ-01',
        quantity: 1,
        unitPriceEur: 4200,
        totalPriceEur: 4200,
      },
      {
        productName: 'SOLIS DISK',
        variantName: 'Vulkanbasalt & Rohmessing',
        sku: 'LW-SOL-BST-01',
        quantity: 1,
        unitPriceEur: 1890,
        totalPriceEur: 1890,
      },
    ],
    totalAmountEur: 6090,
    status: 'Abgeschlossen',
    origin: 'historical_sample',
    paymentMethod: 'Rechnung (Demo)',
  },
];

export const baselineTrafficByDays: Record<
  number,
  { visitors: number; sessions: number }
> = {
  7: { visitors: 412, sessions: 528 },
  30: { visitors: 1840, sessions: 2360 },
  90: { visitors: 5420, sessions: 6940 },
};

export function calculateMerchantMetrics(
  allOrders: Order[],
  timeframeStr: MerchantTimeframe,
  referenceDateStr: string = BASELINE_REFERENCE_DATE,
): MerchantMetrics {
  const days = parseInt(timeframeStr, 10);
  const refDate = new Date(referenceDateStr);
  const cutoffDate = new Date(refDate);
  cutoffDate.setDate(cutoffDate.getDate() - days);

  // Filter orders by date range
  const filteredOrders = allOrders.filter((order) => {
    const orderDate = new Date(order.date);
    return orderDate >= cutoffDate && orderDate <= refDate;
  });

  const totalRevenueEur = filteredOrders.reduce(
    (sum, o) => sum + o.totalAmountEur,
    0,
  );
  // Net revenue before Austrian 20 % USt.
  const netRevenueEur = Math.round((totalRevenueEur / 1.2) * 100) / 100;
  const taxRevenueEur =
    Math.round((totalRevenueEur - netRevenueEur) * 100) / 100;

  const ordersCount = filteredOrders.length;
  const historicalOrdersCount = filteredOrders.filter(
    (o) => o.origin === 'historical_sample',
  ).length;
  const localOrdersCount = filteredOrders.filter(
    (o) => o.origin === 'local_demo',
  ).length;

  const averageOrderValueEur =
    ordersCount > 0
      ? Math.round((totalRevenueEur / ordersCount) * 100) / 100
      : 0;

  const traffic = baselineTrafficByDays[days] || {
    visitors: Math.round(days * 58),
    sessions: Math.round(days * 75),
  };

  const uniqueVisitorsCount = traffic.visitors;
  const sessionsCount = traffic.sessions;
  const conversionRatePercent =
    sessionsCount > 0
      ? Math.round((ordersCount / sessionsCount) * 10000) / 100
      : 0;

  // Aggregate top products
  const productAggMap = new Map<
    string,
    { name: string; variant: string; unitsSold: number; revenueEur: number }
  >();

  for (const order of filteredOrders) {
    for (const item of order.items) {
      const key = `${item.productName}__${item.variantName}`;
      const existing = productAggMap.get(key) || {
        name: item.productName,
        variant: item.variantName,
        unitsSold: 0,
        revenueEur: 0,
      };
      existing.unitsSold += item.quantity;
      existing.revenueEur += item.totalPriceEur;
      productAggMap.set(key, existing);
    }
  }

  const topProducts: TopProductStat[] = Array.from(productAggMap.values()).sort(
    (a, b) => b.revenueEur - a.revenueEur,
  );

  // Generate chart points (daily aggregates)
  const chartPointsMap = new Map<
    string,
    { orders: number; revenueEur: number }
  >();
  // populate date buckets
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(refDate);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    chartPointsMap.set(key, { orders: 0, revenueEur: 0 });
  }

  for (const order of filteredOrders) {
    const key = order.date;
    const bucket = chartPointsMap.get(key);
    if (bucket) {
      bucket.orders += 1;
      bucket.revenueEur += order.totalAmountEur;
    }
  }

  const chartPoints: DailyMetricsPoint[] = Array.from(
    chartPointsMap.entries(),
  ).map(([date, data]) => {
    const d = new Date(date);
    const dateLabel = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.`;
    return {
      date,
      dateLabel,
      orders: data.orders,
      revenueEur: data.revenueEur,
    };
  });

  // Inventory mapping with dynamic deduction from local demo orders (including configurator finished items)
  const inventory: InventoryItem[] = [];
  for (const prod of products) {
    for (const v of prod.variants) {
      // Calculate local demo sold using itemMatchesVariant for direct SKU & configurator base mapping
      const localSold = allOrders
        .filter((o) => o.origin === 'local_demo')
        .flatMap((o) => o.items)
        .filter((item) => itemMatchesVariant(item, v, prod.id))
        .reduce((sum, item) => sum + item.quantity, 0);

      const currentStock = Math.max(0, v.stock - localSold);
      const minStock = 2;
      let status: 'optimal' | 'low' | 'out_of_stock' = 'optimal';
      if (currentStock === 0) status = 'out_of_stock';
      else if (currentStock <= minStock) status = 'low';

      inventory.push({
        productId: prod.id,
        productName: prod.name,
        variantName: v.name,
        sku: v.sku,
        currentStock,
        minStock,
        status,
      });
    }
  }

  return {
    timeframeDays: days,
    totalRevenueEur,
    netRevenueEur,
    taxRevenueEur,
    ordersCount,
    historicalOrdersCount,
    localOrdersCount,
    averageOrderValueEur,
    uniqueVisitorsCount,
    sessionsCount,
    conversionRatePercent,
    chartPoints,
    topProducts,
    filteredOrders,
    inventory,
  };
}
