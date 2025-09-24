import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: Record<string, CartItem>;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  decrement: (productId: string, quantity?: number) => void;
  clear: () => void;
  itemCount: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items[product.id];
          const nextQty = (existing?.quantity ?? 0) + quantity;
          return {
            items: {
              ...state.items,
              [product.id]: { product, quantity: nextQty },
            },
          };
        }),
      remove: (productId) =>
        set((state) => {
          const { [productId]: _, ...rest } = state.items;
          return { items: rest } as Pick<CartState, 'items'>;
        }),
      decrement: (productId, quantity = 1) =>
        set((state) => {
          const item = state.items[productId];
          if (!item) return {} as Pick<CartState, never>;
          const nextQty = item.quantity - quantity;
          if (nextQty <= 0) {
            const { [productId]: _, ...rest } = state.items;
            return { items: rest } as Pick<CartState, 'items'>;
          }
          return {
            items: {
              ...state.items,
              [productId]: { ...item, quantity: nextQty },
            },
          };
        }),
      clear: () => set({ items: {} }),
      itemCount: () => Object.values(get().items).reduce((acc, it) => acc + it.quantity, 0),
      total: () => Object.values(get().items).reduce((acc, it) => acc + it.product.price * it.quantity, 0),
    }),
    {
      name: 'okimart-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);


