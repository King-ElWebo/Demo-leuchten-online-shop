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
} from './storage';
import { products } from '@/data/products';

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
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  orders: Order[];
  createDemoOrder: (details: {
    customerName: string;
    customerEmail: string;
    customerCompany?: string;
    shippingAddress: string;
    shippingSpeed: string;
  }) => { success: boolean; order?: Order; error?: string };
  resetDemoData: () => void;
  refreshOrders: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
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

  const cartSubtotalEur = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.unitPriceEur * item.quantity,
      0,
    );
  }, [cart]);

  // 20% Austrian VAT standard rate
  const cartTaxEur = useMemo(() => {
    return Math.round(cartSubtotalEur * 0.2 * 100) / 100;
  }, [cartSubtotalEur]);

  const cartTotalEur = useMemo(() => {
    return Math.round((cartSubtotalEur + cartTaxEur) * 100) / 100;
  }, [cartSubtotalEur, cartTaxEur]);

  const addToCart = (
    newItem: Omit<CartItem, 'id'>,
  ): { success: boolean; error?: string } => {
    // Find stock limit
    const prod = products.find((p) => p.id === newItem.productId);
    const variant = prod?.variants.find((v) => v.id === newItem.variantId);
    const availableStock = variant?.stock ?? prod?.stock ?? 10;

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
      if (desiredQty > availableStock) {
        return {
          success: false,
          error: `Maximale Stückzahl für ${newItem.productName} (${newItem.variantName}) erreicht. Verfügbar: ${availableStock} Stück.`,
        };
      }
      nextCart = [...cart];
      nextCart[existingIndex] = {
        ...nextCart[existingIndex],
        quantity: desiredQty,
      };
    } else {
      if (newItem.quantity > availableStock) {
        return {
          success: false,
          error: `Nicht genügend Bestand für ${newItem.productName}. Verfügbar: ${availableStock} Stück.`,
        };
      }
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
      removeFromCart(cartItemId);
      return { success: true };
    }

    const targetItem = cart.find((i) => i.id === cartItemId);
    if (!targetItem) return { success: false, error: 'Artikel nicht gefunden' };

    const prod = products.find((p) => p.id === targetItem.productId);
    const variant = prod?.variants.find((v) => v.id === targetItem.variantId);
    const availableStock = variant?.stock ?? prod?.stock ?? 10;

    if (newQty > availableStock) {
      return {
        success: false,
        error: `Maximale Stückzahl für dieses Modell überschritten. Maximal verfügbar: ${availableStock} Stück.`,
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

  const removeFromCart = (cartItemId: string) => {
    const nextCart = cart.filter((item) => item.id !== cartItemId);
    saveCart(nextCart);
    setCart(nextCart);
  };

  const clearCart = () => {
    saveCart([]);
    setCart([]);
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

    const orderItems: OrderItem[] = cart.map((item) => ({
      productName: item.productName,
      variantName: item.variantName,
      sku: item.sku,
      quantity: item.quantity,
      unitPriceEur: item.unitPriceEur,
      totalPriceEur: item.unitPriceEur * item.quantity,
    }));

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `LW-2026-${randomSuffix}`;
    // Always use reference date 2026-09-25 or current day formatted YYYY-MM-DD
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
      status: 'Eingegangen (Demo)',
      origin: 'local_demo',
      paymentMethod: 'Rechnung (Demo)',
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
    clearCart();
    setStorageError(null);
    return { success: true, order: newOrder };
  };

  const resetDemoData = () => {
    const res = resetDemoOrders();
    if (res.success && res.data) {
      setOrders(res.data);
    }
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
