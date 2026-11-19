import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menu';

const CART_STORAGE_KEY = 'italian_pizza_cart_v1';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  lastAddedMessage: string | null;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: MenuItem, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<{ id: string; quantity: number }>;
    if (!Array.isArray(parsed)) return [];
    const hydrated: CartItem[] = [];
    for (const entry of parsed) {
      const product = MENU_ITEMS.find((item) => item.id === entry.id);
      if (product && typeof entry.quantity === 'number' && entry.quantity > 0) {
        hydrated.push({ product, quantity: Math.min(25, Math.floor(entry.quantity)) });
      }
    }
    return hydrated;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadStoredCart());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedMessage, setLastAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const compact = items.map((entry) => ({
        id: entry.product.id,
        quantity: entry.quantity,
      }));
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Ignore storage quota errors in restricted iframe environments
    }
  }, [items]);

  useEffect(() => {
    if (!lastAddedMessage) return;
    const timer = window.setTimeout(() => {
      setLastAddedMessage(null);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [lastAddedMessage]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback((product: MenuItem, quantity = 1) => {
    const safeQty = Math.max(1, Math.min(25, Math.floor(quantity)));
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(25, item.quantity + safeQty) }
            : item
        );
      }
      return [...prev, { product, quantity: safeQty }];
    });
    setLastAddedMessage(`Added ${safeQty} × ${product.name}`);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    const clamped = Math.min(25, Math.floor(quantity));
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: clamped } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.samplePricePkr * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isDrawerOpen,
      lastAddedMessage,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isDrawerOpen,
      lastAddedMessage,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
