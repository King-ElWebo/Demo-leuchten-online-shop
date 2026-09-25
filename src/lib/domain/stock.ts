import type { Order, CartItem, ProductVariant } from './types';
import { products } from '@/data/products';

/**
 * Checks if an ordered item or cart item corresponds to a specific physical product variant
 * (either directly via catalog SKU / variantId or indirectly via baseSku / baseVariantId from Konfigurator).
 */
export function itemMatchesVariant(
  item: {
    sku: string;
    baseSku?: string;
    baseVariantId?: string;
    variantId?: string;
    productId?: string;
  },
  variant: ProductVariant,
  productId: string,
): boolean {
  if (item.baseSku && item.baseSku === variant.sku) return true;
  if (item.baseVariantId && item.baseVariantId === variant.id) return true;
  if (item.sku === variant.sku) return true;
  if (item.variantId === variant.id) return true;

  // Fallback for KORONA I configurator SKU pattern: LW-KOR-XXXXK-[FINISH]-...
  if (productId === 'korona-i') {
    if (variant.sku === 'LW-KOR-BRS-01' && item.sku.includes('-BRS-'))
      return true;
    if (variant.sku === 'LW-KOR-BST-02' && item.sku.includes('-BST-'))
      return true;
    if (variant.sku === 'LW-KOR-STL-03' && item.sku.includes('-STL-'))
      return true;
  }

  return false;
}

/**
 * Computes actual remaining physical stock after deducting all items from stored local demo orders.
 * Historical sample orders already represent past sales and do not deduct from current remaining inventory.
 */
export function getRemainingStock(
  productId: string,
  variantIdOrBase: string,
  orders: Order[],
): number {
  const product = products.find((p) => p.id === productId);
  if (!product) return 0;

  const variant = product.variants.find(
    (v) => v.id === variantIdOrBase || v.sku === variantIdOrBase,
  );
  const initialStock = variant?.stock ?? product.stock ?? 10;

  if (!variant) {
    return initialStock;
  }

  const localSold = orders
    .filter((o) => o.origin === 'local_demo')
    .flatMap((o) => o.items)
    .filter((it) => itemMatchesVariant(it, variant, productId))
    .reduce((sum, it) => sum + it.quantity, 0);

  return Math.max(0, initialStock - localSold);
}

/**
 * Computes how many additional units can be added to the cart right now,
 * considering remaining stock minus what is already in the current cart.
 */
export function getAvailableForCart(
  productId: string,
  variantIdOrBase: string,
  cart: CartItem[],
  orders: Order[],
): number {
  const remaining = getRemainingStock(productId, variantIdOrBase, orders);
  const product = products.find((p) => p.id === productId);
  const variant = product?.variants.find(
    (v) => v.id === variantIdOrBase || v.sku === variantIdOrBase,
  );

  const inCartQty = cart
    .filter((item) => {
      if (variant) {
        return itemMatchesVariant(item, variant, productId);
      }
      return item.productId === productId;
    })
    .reduce((sum, item) => sum + item.quantity, 0);

  return Math.max(0, remaining - inCartQty);
}
