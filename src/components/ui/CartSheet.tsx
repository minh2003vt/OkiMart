import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatCurrency } from '@/utils';
import { checkout } from '@/services/data';

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ open, onClose }) => {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const add = useCartStore((s) => s.add);
  const decrement = useCartStore((s) => s.decrement);
  const total = useCartStore((s) => s.total());
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.classList.toggle('overflow-hidden', open);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [open, onClose]);

  if (!open) return null;

  const content = (
    <div className="fixed inset-0 z-[200]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close cart">
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Object.values(items).length === 0 ? (
            <div className="text-center text-gray-600 py-12">Your cart is empty.</div>
          ) : (
            Object.values(items).map(({ product, quantity }) => {
              const maxQty = Math.max(0, product.quantity ?? 0);
              const canIncrease = quantity < maxQty;
              const canDecrease = quantity > 1;
              return (
                <div key={product.id} className="flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center mr-3">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                    ) : product.emoji ? (
                      <span className="text-xl">{product.emoji}</span>
                    ) : (
                      <div className="text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(product.price)}</div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="w-9 h-9 p-0 rounded-full hover:bg-gray-100 text-black disabled:opacity-40"
                      onClick={() => decrement(product.id, 1)}
                      disabled={!canDecrease}
                      aria-label={`Decrease ${product.name} quantity`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 min-w-[2rem] text-center text-sm font-medium">{quantity}</span>
                    <button
                      className="w-9 h-9 p-0 rounded-full hover:bg-gray-100 text-black disabled:opacity-40"
                      onClick={() => add(product, 1)}
                      disabled={!canIncrease}
                      aria-label={`Increase ${product.name} quantity`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      className="ml-3 w-9 h-9 p-0 rounded-full hover:bg-red-50 text-red-600"
                      onClick={() => remove(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Total</span>
            <span className="text-base font-semibold text-gray-900">{formatCurrency(total)}</span>
          </div>
          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            disabled={Object.values(items).length === 0}
            onClick={() => {
              const cartItems = Object.values(items);
              if (cartItems.length === 0) return;
              // Validate none are zero stock at checkout time
              const normalized = cartItems.map(({ product, quantity }) => ({ product, quantity }));
              try {
                checkout(normalized);
                clear();
                onClose();
              } catch (err) {
                // eslint-disable-next-line no-alert
                alert(err instanceof Error ? err.message : 'Checkout failed.');
              }
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );

  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  return portalTarget ? ReactDOM.createPortal(content, portalTarget) : content;
};

export default CartSheet;


