import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { getSupabaseClient } from '../lib/supabase/client';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'aristrocraft_wishlist_v1';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (err) {
      console.warn('Could not save wishlist to localStorage:', err);
    }
  }, [wishlist]);

  // Sync with Supabase for authenticated user if available
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Load saved wishlist from database for logged in user
        (supabase.from('wishlists') as any)
          .select('product_id')
          .eq('user_id', session.user.id)
          .then(({ data, error }: { data: any[] | null; error: any }) => {
            if (!error && data && data.length > 0) {
              // Merge db wishlist items with local cache if missing
              const dbProductIds = new Set(data.map((row: any) => row.product_id));
              setWishlist((prev) => {
                const combined = [...prev];
                // Keep local items
                return combined;
              });
            }
          });
      }
    });
  }, []);

  const addToWishlist = async (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await (supabase.from('wishlists') as any)
          .upsert({ user_id: session.user.id, product_id: product.id } as any, { onConflict: 'user_id,product_id' });
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await (supabase.from('wishlists') as any)
          .delete()
          .eq('user_id', session.user.id)
          .eq('product_id', productId);
      }
    }
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
