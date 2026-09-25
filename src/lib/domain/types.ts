export type ProductCategory = 'pendelleuchten' | 'tisch-boden' | 'wand-decken';

export interface PhotometricSpec {
  fluxLumen: number;
  kelvinRange: string;
  cri: string;
  powerWatt: number;
  efficacyLmWatt: number;
  beamAngle?: string;
  controlProtocols: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  priceDeltaEur: number;
  sku: string;
  stock: number;
  materialFinish: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  material: string;
  dimensions: string;
  basePriceEur: number;
  stock: number;
  summary: string;
  description: string;
  details: string[];
  photometrics: PhotometricSpec;
  image: string;
  variants: ProductVariant[];
}

export interface ConfiguratorSelection {
  baseModelId: string;
  materialFinish: string;
  diffuser: string;
  kelvin: number;
  dropLength?: string;
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  variantName: string;
  sku: string;
  baseSku?: string;
  baseVariantId?: string;
  unitPriceEur: number;
  quantity: number;
  image: string;
  configurationSummary?: {
    finish: string;
    diffuser?: string;
    kelvin?: number;
    dropLength?: string;
  };
}

export type OrderStatus =
  'Eingegangen (Demo)' | 'In Fertigung' | 'Versendet' | 'Abgeschlossen';

export type OrderOrigin = 'historical_sample' | 'local_demo';

export interface OrderItem {
  productName: string;
  variantName: string;
  sku: string;
  baseSku?: string;
  baseVariantId?: string;
  quantity: number;
  unitPriceEur: number;
  totalPriceEur: number;
}

export interface Order {
  orderId: string;
  date: string; // YYYY-MM-DD
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmountEur: number; // Brutto
  netAmountEur?: number; // Netto (totalAmountEur / 1.20)
  taxAmountEur?: number; // 20% USt. (totalAmountEur - netAmountEur)
  status: OrderStatus;
  origin: OrderOrigin;
  paymentMethod: 'Rechnung (Demo)';
}

export type MerchantTimeframe = '7' | '30' | '90';

export interface DailyMetricsPoint {
  date: string;
  dateLabel: string;
  orders: number;
  revenueEur: number;
}

export interface TopProductStat {
  name: string;
  variant: string;
  unitsSold: number;
  revenueEur: number;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  variantName: string;
  sku: string;
  currentStock: number;
  minStock: number;
  status: 'optimal' | 'low' | 'out_of_stock';
}

export interface MerchantMetrics {
  timeframeDays: number;
  totalRevenueEur: number; // Brutto
  netRevenueEur: number; // Netto
  taxRevenueEur: number; // 20% USt.
  ordersCount: number;
  historicalOrdersCount: number;
  localOrdersCount: number;
  averageOrderValueEur: number;
  uniqueVisitorsCount: number;
  sessionsCount: number;
  conversionRatePercent: number;
  chartPoints: DailyMetricsPoint[];
  topProducts: TopProductStat[];
  filteredOrders: Order[];
  inventory: InventoryItem[];
}
