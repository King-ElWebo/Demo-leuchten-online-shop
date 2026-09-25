import type { Order, CartItem, ProductVariant } from './types';
import { products } from '@/data/products';

export interface PhysicalVariantDescriptor {
  productId: string;
  variantId: string;
  sku: string;
  name: string;
}

/**
 * Resolves any catalog item, configurator selection or ordered item
 * to its underlying physical inventory variant.
 */
export function resolvePhysicalVariant(item: {
  productId?: string;
  variantId?: string;
  sku?: string;
  baseSku?: string;
  baseVariantId?: string;
  productName?: string;
}): PhysicalVariantDescriptor | null {
  let product = item.productId
    ? products.find((p) => p.id === item.productId)
    : undefined;

  if (!product && (item.baseSku || item.sku)) {
    const targetSku = item.baseSku || item.sku;
    product = products.find((p) => p.variants.some((v) => v.sku === targetSku));
  }

  if (!product && item.productName) {
    product = products.find(
      (p) =>
        p.name === item.productName ||
        item.productName?.toLowerCase().includes(p.name.toLowerCase()),
    );
  }

  // Fallback to korona-i for configurator items with custom SKUs
  if (!product && item.sku && item.sku.startsWith('LW-KOR-')) {
    product = products.find((p) => p.id === 'korona-i');
  }

  if (!product) return null;

  // 1. Explicit baseSku / baseVariantId mapping from Konfigurator
  if (item.baseSku) {
    const v = product.variants.find((variant) => variant.sku === item.baseSku);
    if (v) {
      return {
        productId: product.id,
        variantId: v.id,
        sku: v.sku,
        name: v.name,
      };
    }
  }
  if (item.baseVariantId) {
    const v = product.variants.find(
      (variant) => variant.id === item.baseVariantId,
    );
    if (v) {
      return {
        productId: product.id,
        variantId: v.id,
        sku: v.sku,
        name: v.name,
      };
    }
  }

  // 2. Direct variantId match
  if (item.variantId) {
    const v = product.variants.find((variant) => variant.id === item.variantId);
    if (v) {
      return {
        productId: product.id,
        variantId: v.id,
        sku: v.sku,
        name: v.name,
      };
    }
  }

  // 3. Direct SKU match
  if (item.sku) {
    const v = product.variants.find((variant) => variant.sku === item.sku);
    if (v) {
      return {
        productId: product.id,
        variantId: v.id,
        sku: v.sku,
        name: v.name,
      };
    }
  }

  // 4. Fallback pattern for KORONA I configurator SKU: LW-KOR-XXXXK-[FINISH]-...
  if (product.id === 'korona-i' && item.sku) {
    if (item.sku.includes('-BRS-')) {
      const v = product.variants.find(
        (variant) => variant.sku === 'LW-KOR-BRS-01',
      );
      if (v) {
        return {
          productId: product.id,
          variantId: v.id,
          sku: v.sku,
          name: v.name,
        };
      }
    }
    if (item.sku.includes('-BST-')) {
      const v = product.variants.find(
        (variant) => variant.sku === 'LW-KOR-BST-02',
      );
      if (v) {
        return {
          productId: product.id,
          variantId: v.id,
          sku: v.sku,
          name: v.name,
        };
      }
    }
    if (item.sku.includes('-STL-')) {
      const v = product.variants.find(
        (variant) => variant.sku === 'LW-KOR-STL-03',
      );
      if (v) {
        return {
          productId: product.id,
          variantId: v.id,
          sku: v.sku,
          name: v.name,
        };
      }
    }
  }

  // Fallback to first variant if product exists
  if (product.variants.length > 0) {
    const v = product.variants[0];
    return {
      productId: product.id,
      variantId: v.id,
      sku: v.sku,
      name: v.name,
    };
  }

  return null;
}

/**
 * Checks if an ordered item or cart item corresponds to a specific physical product variant.
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
  const resolved = resolvePhysicalVariant({
    productId: item.productId || productId,
    variantId: item.variantId,
    sku: item.sku,
    baseSku: item.baseSku,
    baseVariantId: item.baseVariantId,
  });

  if (!resolved) return false;
  return resolved.productId === productId && resolved.variantId === variant.id;
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
  const resolved = resolvePhysicalVariant({
    productId,
    variantId: variantIdOrBase,
    baseVariantId: variantIdOrBase,
    sku: variantIdOrBase,
    baseSku: variantIdOrBase,
  });

  if (!resolved) {
    const product = products.find((p) => p.id === productId);
    return product?.stock ?? 0;
  }

  const product = products.find((p) => p.id === resolved.productId);
  const variant = product?.variants.find((v) => v.id === resolved.variantId);
  const initialStock = variant?.stock ?? product?.stock ?? 10;

  const localSold = orders
    .filter((o) => o.origin === 'local_demo')
    .flatMap((o) => o.items)
    .filter((it) => {
      const itResolved = resolvePhysicalVariant(it);
      return (
        itResolved !== null &&
        itResolved.productId === resolved.productId &&
        itResolved.variantId === resolved.variantId
      );
    })
    .reduce((sum, it) => sum + it.quantity, 0);

  return Math.max(0, initialStock - localSold);
}

/**
 * Computes how many total units across ALL cart items occupy the same physical variant.
 */
export function getInCartPhysicalQuantity(
  cart: CartItem[],
  productId: string,
  variantIdOrBase: string,
  excludeCartItemId?: string,
): number {
  const target = resolvePhysicalVariant({
    productId,
    variantId: variantIdOrBase,
    baseVariantId: variantIdOrBase,
    sku: variantIdOrBase,
    baseSku: variantIdOrBase,
  });
  if (!target) return 0;

  return cart
    .filter((item) => !excludeCartItemId || item.id !== excludeCartItemId)
    .filter((item) => {
      const itemResolved = resolvePhysicalVariant(item);
      return (
        itemResolved &&
        itemResolved.productId === target.productId &&
        itemResolved.variantId === target.variantId
      );
    })
    .reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Computes how many additional units can be added to the cart right now,
 * considering remaining physical stock minus the sum of ALL positions currently in the cart
 * that share this physical variant.
 */
export function getAvailableForCart(
  productId: string,
  variantIdOrBase: string,
  cart: CartItem[],
  orders: Order[],
  excludeCartItemId?: string,
): number {
  const remaining = getRemainingStock(productId, variantIdOrBase, orders);
  const inCart = getInCartPhysicalQuantity(
    cart,
    productId,
    variantIdOrBase,
    excludeCartItemId,
  );
  return Math.max(0, remaining - inCart);
}

/**
 * Validates the entire cart against remaining physical inventory by summing all
 * cart positions sharing the same physical variant.
 */
export function validateCartStockAgainstRemaining(
  cart: CartItem[],
  orders: Order[],
): { valid: boolean; error?: string } {
  const variantTotals = new Map<
    string,
    { name: string; totalQuantity: number; remainingStock: number }
  >();

  for (const item of cart) {
    const resolved = resolvePhysicalVariant(item);
    const key = resolved
      ? `${resolved.productId}::${resolved.variantId}`
      : `${item.productId}::${item.variantId}`;
    const name = resolved?.name || item.variantName || item.productName;

    const remaining = resolved
      ? getRemainingStock(resolved.productId, resolved.variantId, orders)
      : getRemainingStock(item.productId, item.variantId, orders);

    const existing = variantTotals.get(key) || {
      name,
      totalQuantity: 0,
      remainingStock: remaining,
    };
    existing.totalQuantity += item.quantity;
    variantTotals.set(key, existing);
  }

  for (const [, entry] of variantTotals) {
    if (entry.totalQuantity > entry.remainingStock) {
      return {
        valid: false,
        error: `Bestellabschluss nicht möglich: Der gemeinsame Lagerbestand für Ausführung „${entry.name}“ reicht nicht aus. Verfügbar: ${entry.remainingStock} Stück, insgesamt im Warenkorb: ${entry.totalQuantity} Stück.`,
      };
    }
  }

  return { valid: true };
}
