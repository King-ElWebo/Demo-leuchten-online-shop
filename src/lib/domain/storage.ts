import type { CartItem, Order } from './types';
import { baselineHistoricalOrders } from '@/data/merchant';

const CART_STORAGE_KEY = 'lumenwerk_cart_v1';
const CART_SESSION_ID_KEY = 'lumenwerk_cart_session_id_v1';
const ORDERS_STORAGE_KEY = 'lumenwerk_demo_orders_v1';
const COMPLETED_CARTS_STORAGE_KEY = 'lumenwerk_completed_carts_v1';

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

/** Generate a unique ID for a cart lifecycle session */
function generateCartSessionId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Retrieve or initialize the unique ID for the current active cart session */
export function getOrCreateCartSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  try {
    let sessionId = window.localStorage.getItem(CART_SESSION_ID_KEY);
    if (!sessionId) {
      sessionId = generateCartSessionId();
      window.localStorage.setItem(CART_SESSION_ID_KEY, sessionId);
    }
    return sessionId;
  } catch {
    return 'fallback_session';
  }
}

/** Force creation of a fresh cart session ID after order completion */
export function rotateCartSessionId(): string {
  const newId = generateCartSessionId();
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CART_SESSION_ID_KEY, newId);
    } catch {
      // ignore storage write errors during rotation
    }
  }
  return newId;
}

/** Check if a given cart session ID was already converted into a completed order */
export function isCartSessionCompleted(sessionId: string): boolean {
  if (!sessionId || typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(COMPLETED_CARTS_STORAGE_KEY);
    if (raw) {
      const completedList: string[] = JSON.parse(raw);
      if (Array.isArray(completedList) && completedList.includes(sessionId)) {
        return true;
      }
    }
    const ordersRaw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (ordersRaw) {
      const ordersList: Order[] = JSON.parse(ordersRaw);
      if (
        Array.isArray(ordersList) &&
        ordersList.some((o) => o.cartSessionId === sessionId)
      ) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

/** Mark a cart session ID as irrevocably completed */
export function markCartSessionCompleted(sessionId: string): void {
  if (!sessionId || typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(COMPLETED_CARTS_STORAGE_KEY);
    const completedList: string[] = raw ? JSON.parse(raw) : [];
    if (!completedList.includes(sessionId)) {
      completedList.push(sessionId);
      window.localStorage.setItem(
        COMPLETED_CARTS_STORAGE_KEY,
        JSON.stringify(completedList),
      );
    }
  } catch {
    // ignore
  }
}

/** Load cart items from localStorage with reload-safe stale cart detection */
export function loadCart(): StorageResult<CartItem[]> {
  if (typeof window === 'undefined') return { success: true, data: [] };
  try {
    const currentSessionId = window.localStorage.getItem(CART_SESSION_ID_KEY);

    // If the cart session is recorded as already completed in an order, purge it to prevent duplicate orders
    if (currentSessionId && isCartSessionCompleted(currentSessionId)) {
      try {
        window.localStorage.removeItem(CART_STORAGE_KEY);
        rotateCartSessionId();
      } catch {
        // ignore
      }
      return { success: true, data: [] };
    }

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
    if (items.length === 0) {
      // When emptying cart, try removeItem as well for quota resilience
      try {
        window.localStorage.removeItem(CART_STORAGE_KEY);
      } catch {
        // continue to setItem attempt
      }
    }
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

    // If order has an associated cartSessionId, mark it as completed immediately
    if (order.cartSessionId) {
      markCartSessionCompleted(order.cartSessionId);
    }

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
    window.localStorage.removeItem(COMPLETED_CARTS_STORAGE_KEY);
    return { success: true, data: [...baselineHistoricalOrders] };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Reset-Fehler';
    return {
      success: false,
      error: `Demo-Zurücksetzung fehlgeschlagen: ${message}`,
    };
  }
}
