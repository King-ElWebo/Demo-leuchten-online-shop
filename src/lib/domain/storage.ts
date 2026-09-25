import type { CartItem, Order } from './types';
import { baselineHistoricalOrders } from '@/data/merchant';

const CART_STORAGE_KEY = 'lumenwerk_cart_v1';
const ORDERS_STORAGE_KEY = 'lumenwerk_demo_orders_v1';

export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Check if localStorage is genuinely available and writeable */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/** Load cart items from localStorage */
export function loadCart(): StorageResult<CartItem[]> {
  if (typeof window === 'undefined') return { success: true, data: [] };
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { success: true, data: [] };
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return { success: true, data: parsed };
    }
    return { success: true, data: [] };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Unbekannter Speicherfehler';
    return {
      success: false,
      data: [],
      error: `Warenkorb konnte nicht geladen werden: ${message}`,
    };
  }
}

/** Save cart items to localStorage */
export function saveCart(items: CartItem[]): StorageResult<CartItem[]> {
  if (typeof window === 'undefined')
    return { success: false, error: 'Kein Browserkontext' };
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    return { success: true, data: items };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Speicher voll oder blockiert';
    return {
      success: false,
      error: `Warenkorb konnte nicht gespeichert werden: ${message}`,
    };
  }
}

/** Load all orders: baseline historical orders + local demo orders */
export function loadOrders(): StorageResult<Order[]> {
  if (typeof window === 'undefined') {
    return { success: true, data: [...baselineHistoricalOrders] };
  }
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    const localOrders: Order[] = raw ? JSON.parse(raw) : [];
    const combined = [...localOrders, ...baselineHistoricalOrders];
    return { success: true, data: combined };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ladefehler';
    return {
      success: false,
      data: [...baselineHistoricalOrders],
      error: `Lokale Demo-Bestellungen konnten nicht geladen werden: ${message}`,
    };
  }
}

/** Save a new local demo order */
export function saveLocalDemoOrder(order: Order): StorageResult<Order> {
  if (typeof window === 'undefined')
    return { success: false, error: 'Kein Browserkontext' };
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    const existing: Order[] = raw ? JSON.parse(raw) : [];
    const updated = [order, ...existing];
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, data: order };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Speicherfehler';
    return {
      success: false,
      error: `Demo-Bestellung konnte nicht lokal gespeichert werden: ${message}. Bitte versuchen Sie es erneut.`,
    };
  }
}

/** Reset all local demo orders and restore pristine baseline data */
export function resetDemoOrders(): StorageResult<Order[]> {
  if (typeof window === 'undefined') {
    return { success: true, data: [...baselineHistoricalOrders] };
  }
  try {
    window.localStorage.removeItem(ORDERS_STORAGE_KEY);
    return { success: true, data: [...baselineHistoricalOrders] };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Reset-Fehler';
    return {
      success: false,
      error: `Demo-Zurücksetzung fehlgeschlagen: ${message}`,
    };
  }
}
