import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { FEATURED_PRODUCTS } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedColor?: string,
    selectedSize?: string,
    customNote?: string
  ) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'aristrocraft_cart_v2';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      // Seed with initial 2 items matching existing preview state
      const p1 = FEATURED_PRODUCTS[0];
      const p2 = FEATURED_PRODUCTS[2];
      if (p1 && p2) {
        return [
          {
            id: `${p1.id}-default`,
            productId: p1.id,
            product: p1,
            quantity: 1,
            selectedColor: p1.colors?.[0] || 'Default',
            selectedSize: p1.sizes?.[0] || 'Standard',
            unitPrice: p1.price,
          },
          {
            id: `${p2.id}-default`,
            productId: p2.id,
            product: p2,
            quantity: 1,
            selectedColor: p2.colors?.[0] || 'Default',
            selectedSize: p2.sizes?.[0] || 'Standard',
            unitPrice: p2.price,
          },
        ];
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string,
    customNote?: string
  ) => {
    const color = selectedColor || product.colors?.[0] || 'Standard';
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const noteKey = customNote ? customNote.trim() : '';
    const itemKey = `${product.id}-${color}-${size}-${noteKey}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      const newItem: CartItem = {
        id: itemKey,
        productId: product.id,
        product,
        quantity,
        selectedColor: color,
        selectedSize: size,
        customNote: customNote?.trim() || undefined,
        unitPrice: product.price,
      };
      return [newItem, ...prevItems];
    });

    setToastMessage(`Added "${product.name}" (${quantity}) to cart!`);
    setTimeout(() => {
      setToastMessage((curr) => (curr?.includes(product.name) ? null : curr));
    }, 3000);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItems,
        toastMessage,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
