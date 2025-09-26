import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';
import { useAuthStore } from '@/store/auth';

interface CartState {
  itemsByUserId: Record<string, Record<string, CartItem>>;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  decrement: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  getQuantity: (productId: string) => number;
  clear: () => void;
  itemCount: () => number;
  total: () => number;
}

const getActiveUserId = (): string => useAuthStore.getState().currentUser?.id ?? 'guest';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      itemsByUserId: {},
      add: (product, quantity = 1) =>
        set((state) => {
          const userId = getActiveUserId();
          const items = state.itemsByUserId[userId] ?? {};
          const existing = items[product.id];
          const max = Math.max(0, product.quantity ?? 0);
          if (max === 0) {
            return state;
          }
          const desired = (existing?.quantity ?? 0) + quantity;
          const nextQty = Math.min(desired, max);
          const nextItems = { ...items } as Record<string, CartItem>;
          if (nextQty <= 0) {
            delete nextItems[product.id];
          } else {
            nextItems[product.id] = { product, quantity: nextQty };
          }
          return {
            itemsByUserId: { ...state.itemsByUserId, [userId]: nextItems },
          };
        }),
      remove: (productId) =>
        set((state) => {
          const userId = getActiveUserId();
          const items = { ...(state.itemsByUserId[userId] ?? {}) } as Record<string, CartItem>;
          delete items[productId];
          return { itemsByUserId: { ...state.itemsByUserId, [userId]: items } };
        }),
      decrement: (productId, quantity = 1) =>
        set((state) => {
          const userId = getActiveUserId();
          const items = { ...(state.itemsByUserId[userId] ?? {}) } as Record<string, CartItem>;
          const item = items[productId];
          if (!item) return {} as Pick<CartState, never>;
          const nextQty = item.quantity - quantity;
          if (nextQty <= 0) {
            delete items[productId];
          } else {
            items[productId] = { ...item, quantity: nextQty };
          }
          return { itemsByUserId: { ...state.itemsByUserId, [userId]: items } };
        }),
      setQuantity: (productId, quantity) =>
        set((state) => {
          const userId = getActiveUserId();
          const items = { ...(state.itemsByUserId[userId] ?? {}) } as Record<string, CartItem>;
          const item = items[productId];
          if (quantity <= 0) {
            delete items[productId];
            return { itemsByUserId: { ...state.itemsByUserId, [userId]: items } };
          }
          if (!item) return state;
          const max = Math.max(0, item.product.quantity ?? 0);
          const clamped = Math.min(quantity, max);
          items[productId] = { ...item, quantity: clamped };
          return { itemsByUserId: { ...state.itemsByUserId, [userId]: items } };
        }),
      getQuantity: (productId) => {
        const userId = getActiveUserId();
        return get().itemsByUserId[userId]?.[productId]?.quantity ?? 0;
      },
      clear: () => {
        const userId = getActiveUserId();
        set((state) => ({ itemsByUserId: { ...state.itemsByUserId, [userId]: {} } }));
      },
      itemCount: () => {
        const userId = getActiveUserId();
        return Object.values(get().itemsByUserId[userId] ?? {}).reduce((acc, it) => acc + it.quantity, 0);
      },
      total: () => {
        const userId = getActiveUserId();
        return Object.values(get().itemsByUserId[userId] ?? {}).reduce((acc, it) => acc + it.product.price * it.quantity, 0);
      },
    }),
    {
      name: 'okimart-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ itemsByUserId: state.itemsByUserId }),
    }
  )
);


