'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import type { CartItem, Order, OrderItem } from './types';
import {
  loadCart,
  saveCart,
  loadOrders,
  saveLocalDemoOrder,
  resetDemoOrders,
  getOrCreateCartSessionId,
  rotateCartSessionId,
  isCartSessionCompleted,
} from './storage';
import { baselineHistoricalOrders } from '@/data/merchant';
import {
  getRemainingStock,
  getAvailableForCart,
  validateCartStockAgainstRemaining,
} from './stock';

interface ShopContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotalEur: number;
  cartTaxEur: number;
  cartTotalEur: number;
  storageError: string | null;
  addToCart: (item: Omit<CartItem, 'id'>) => {
    success: boolean;
    error?: string;
  };
  updateQuantity: (
    cartItemId: string,
    quantity: number,
  ) => { success: boolean; error?: string };
  removeFromCart: (cartItemId: string) => { success: boolean; error?: string };
  clearCart: () => { success: boolean; error?: string };
  orders: Order[];
  createDemoOrder: (details: {
    customerName: string;
    customerEmail: string;
    customerCompany?: string;
    shippingAddress: string;
    shippingSpeed: string;
  }) => { success: boolean; order?: Order; error?: string };
  resetDemoData: () => { success: boolean; error?: string };
  refreshOrders: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Initialize with baseline historical orders immediately to prevent 0 € / empty state flash during SSR/prerender
  const [orders, setOrders] = useState<Order[]>(() => [
    ...baselineHistoricalOrders,
  ]);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Initialize from storage
  useEffect(() => {
    const animId = requestAnimationFrame(() => {
      const cartRes = loadCart();
      if (cartRes.success && cartRes.data) {
        setCart(cartRes.data);
      } else if (cartRes.error) {
        setStorageError(cartRes.error);
      }

      const ordersRes = loadOrders();
      if (ordersRes.success && ordersRes.data) {
        setOrders(ordersRes.data);
      } else if (ordersRes.error) {
        setStorageError(ordersRes.error);
      }
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Gross total: Advertised catalog prices are final customer prices (Bruttopreise inkl. 20 % USt.)
  const cartTotalEur = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.unitPriceEur * item.quantity,
      0,
    );
  }, [cart]);

  // 20% Austrian VAT standard rate: Netto = Gross / 1.20, Tax = Gross - Netto
  const cartSubtotalEur = useMemo(() => {
    return Math.round((cartTotalEur / 1.2) * 100) / 100;
  }, [cartTotalEur]);

  const cartTaxEur = useMemo(() => {
    return Math.round((cartTotalEur - cartSubtotalEur) * 100) / 100;
  }, [cartTotalEur, cartSubtotalEur]);

  const addToCart = (
    newItem: Omit<CartItem, 'id'>,
  ): { success: boolean; error?: string } => {
    // If the active cart session was marked completed by a prior checkout, rotate to a fresh session
    if (isCartSessionCompleted(getOrCreateCartSessionId())) {
      rotateCartSessionId();
    }

    const variantIdOrBase = newItem.baseVariantId || newItem.variantId;
    const availableForCart = getAvailableForCart(
      newItem.productId,
      variantIdOrBase,
      cart,
      orders,
    );

    if (newItem.quantity > availableForCart) {
      const remaining = getRemainingStock(
        newItem.productId,
        variantIdOrBase,
        orders,
      );
      return {
        success: false,
        error:
          availableForCart === 0
            ? `Der Artikel ${newItem.productName} (${newItem.variantName}) ist mit der gewählten Stückzahl bereits im Warenkorb oder im Atelier ausverkauft (Verfügbar: ${remaining} Stück).`
            : `Nicht genügend freier Bestand für ${newItem.productName}. Sie können noch maximal ${availableForCart} Stück in den Warenkorb legen.`,
      };
    }

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.variantId === newItem.variantId &&
        item.sku === newItem.sku,
    );

    let nextCart: CartItem[];
    if (existingIndex >= 0) {
      const currentQty = cart[existingIndex].quantity;
      const desiredQty = currentQty + newItem.quantity;
      nextCart = [...cart];
      nextCart[existingIndex] = {
        ...nextCart[existingIndex],
        quantity: desiredQty,
      };
    } else {
      const createdItem: CartItem = {
        ...newItem,
        id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      nextCart = [...cart, createdItem];
    }

    const saveRes = saveCart(nextCart);
    if (!saveRes.success) {
      setStorageError(saveRes.error || 'Fehler beim Speichern des Warenkorbs');
      return { success: false, error: saveRes.error };
    }

    setCart(nextCart);
    setStorageError(null);
    return { success: true };
  };

  const updateQuantity = (
    cartItemId: string,
    newQty: number,
  ): { success: boolean; error?: string } => {
    if (newQty <= 0) {
      return removeFromCart(cartItemId);
    }

    const targetItem = cart.find((i) => i.id === cartItemId);
    if (!targetItem) return { success: false, error: 'Artikel nicht gefunden' };

    const variantIdOrBase = targetItem.baseVariantId || targetItem.variantId;
    const remainingStock = getRemainingStock(
      targetItem.productId,
      variantIdOrBase,
      orders,
    );

    // Calculate maximum allowed quantity considering other items sharing this physical variant
    const maxAllowed = getAvailableForCart(
      targetItem.productId,
      variantIdOrBase,
      cart,
      orders,
      cartItemId,
    );

    if (newQty > maxAllowed) {
      return {
        success: false,
        error: `Maximale Stückzahl für dieses Modell überschritten. Maximal bestellbar: ${maxAllowed} Stück (Lagerbestand: ${remainingStock}).`,
      };
    }

    const nextCart = cart.map((item) =>
      item.id === cartItemId ? { ...item, quantity: newQty } : item,
    );

    const saveRes = saveCart(nextCart);
    if (!saveRes.success) {
      setStorageError(saveRes.error || 'Fehler beim Speichern des Warenkorbs');
      return { success: false, error: saveRes.error };
    }

    setCart(nextCart);
    setStorageError(null);
    return { success: true };
  };

  const removeFromCart = (
    cartItemId: string,
  ): { success: boolean; error?: string } => {
    const nextCart = cart.filter((item) => item.id !== cartItemId);
    const saveRes = saveCart(nextCart);
    if (!saveRes.success) {
      setStorageError(
        saveRes.error || 'Fehler beim Aktualisieren des Warenkorbs',
      );
      return { success: false, error: saveRes.error };
    }
    setCart(nextCart);
    setStorageError(null);
    return { success: true };
  };

  const clearCart = (): { success: boolean; error?: string } => {
    const saveRes = saveCart([]);
    if (!saveRes.success) {
      setStorageError(saveRes.error || 'Fehler beim Leeren des Warenkorbs');
      return { success: false, error: saveRes.error };
    }
    setCart([]);
    setStorageError(null);
    return { success: true };
  };

  const refreshOrders = () => {
    const res = loadOrders();
    if (res.success && res.data) {
      setOrders(res.data);
    }
  };

  const createDemoOrder = (details: {
    customerName: string;
    customerEmail: string;
    customerCompany?: string;
    shippingAddress: string;
    shippingSpeed: string;
  }): { success: boolean; order?: Order; error?: string } => {
    if (cart.length === 0) {
      return { success: false, error: 'Der Warenkorb ist leer.' };
    }

    const cartSessionId = getOrCreateCartSessionId();
    if (isCartSessionCompleted(cartSessionId)) {
      saveCart([]);
      setCart([]);
      return {
        success: false,
        error:
          'Dieser Warenkorb wurde bereits in einer früheren Demo-Bestellung verbucht.',
      };
    }

    // Verify aggregate physical stock across all cart positions before accepting order
    const stockValidation = validateCartStockAgainstRemaining(cart, orders);
    if (!stockValidation.valid) {
      return {
        success: false,
        error: stockValidation.error,
      };
    }

    const orderItems: OrderItem[] = cart.map((item) => ({
      productName: item.productName,
      variantName: item.variantName,
      sku: item.sku,
      baseSku: item.baseSku,
      baseVariantId: item.baseVariantId,
      quantity: item.quantity,
      unitPriceEur: item.unitPriceEur,
      totalPriceEur: item.unitPriceEur * item.quantity,
    }));

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `LW-2026-${randomSuffix}`;
    const todayStr = '2026-09-25';

    const newOrder: Order = {
      orderId,
      date: todayStr,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      customerCompany: details.customerCompany,
      shippingAddress: details.shippingAddress,
      items: orderItems,
      totalAmountEur: cartTotalEur,
      netAmountEur: cartSubtotalEur,
      taxAmountEur: cartTaxEur,
      status: 'Eingegangen (Demo)',
      origin: 'local_demo',
      paymentMethod: 'Rechnung (Demo)',
      cartSessionId,
    };

    const saveRes = saveLocalDemoOrder(newOrder);
    if (!saveRes.success) {
      setStorageError(
        saveRes.error || 'Fehler beim Erstellen der Demo-Bestellung',
      );
      return { success: false, error: saveRes.error };
    }

    // Update state
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart: even if localStorage write fails, empty in-memory cart to prevent duplicate submission
    const clearRes = saveCart([]);
    setCart([]);
    if (!clearRes.success) {
      setStorageError(
        'Bestellung erfolgreich angelegt, aber der lokale Warenkorb konnte im Browser nicht geleert werden.',
      );
    } else {
      rotateCartSessionId();
      setStorageError(null);
    }

    return { success: true, order: newOrder };
  };

  const resetDemoData = (): { success: boolean; error?: string } => {
    const res = resetDemoOrders();
    if (res.success && res.data) {
      setOrders(res.data);
      setStorageError(null);
      return { success: true };
    }
    setStorageError(res.error || 'Fehler beim Zurücksetzen der Demodaten');
    return { success: false, error: res.error };
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotalEur,
        cartTaxEur,
        cartTotalEur,
        storageError,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        createDemoOrder,
        resetDemoData,
        refreshOrders,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
