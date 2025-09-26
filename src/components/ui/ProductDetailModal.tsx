import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { X, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import Button from './Button';
import { formatCurrency } from '@/utils';
import { useCartStore } from '@/store/cart';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const InnerModal: React.FC<{ product: Product; onClose: () => void }> = ({ product, onClose }) => {
  const add = useCartStore((s) => s.add);
  const [selectedQty, setSelectedQty] = useState<number>(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleAdd = () => {
    add(product, selectedQty);
    onClose();
  };

  const decrease = () => setSelectedQty((q) => Math.max(0, q - 1));
  const increase = () => setSelectedQty((q) => Math.min(product.quantity ?? 99, q + 1));

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.classList.add('overflow-hidden');
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [onClose]);

  const content = (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative bg-white w-full sm:max-w-md sm:rounded-xl p-4 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
        aria-describedby="product-detail-description"
      >
        <button
          ref={closeBtnRef}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect width=%22400%22 height=%22400%22 fill=%22%23f3f4f6%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2220%22%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            ) : product.emoji ? (
              <span className="text-3xl">{product.emoji}</span>
            ) : (
              <div className="w-full h-full text-gray-400 text-sm flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3
              id="product-detail-title"
              className="text-lg font-semibold text-gray-900"
            >
              {product?.name ?? 'No Name'}
            </h3>
            <p
              id="product-detail-description"
              className="text-sm text-gray-600 mt-1"
            >
              {product?.description ?? 'No description provided.'}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-red-600 font-semibold">{formatCurrency(product.price)}</span>
                <span className="text-xs text-gray-500">In stock: {product.quantity}</span>
              </div>
              <div className="inline-flex items-center rounded-full bg-white shadow-sm">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-9 h-9 p-0 rounded-full text-black hover:bg-gray-100"
                  onClick={decrease}
                  aria-label={`Decrease ${product.name} quantity`}
                  title={`Decrease ${product.name} quantity`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-[2.25rem] text-center text-sm font-medium text-gray-900" aria-live="polite">
                  {selectedQty}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-9 h-9 p-0 rounded-full text-black hover:bg-gray-100"
                  onClick={increase}
                  aria-label={`Increase ${product.name} quantity`}
                  title={`Increase ${product.name} quantity`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 disabled:opacity-50"
                onClick={handleAdd}
                disabled={selectedQty <= 0 || selectedQty > (product.quantity ?? Number.MAX_SAFE_INTEGER)}
                title={selectedQty <= 0 ? 'Select at least 1 item' : selectedQty > (product.quantity ?? Number.MAX_SAFE_INTEGER) ? 'Quantity exceeds stock' : 'Add to cart'}
              >
                <ShoppingCart className="h-4 w-4 mr-1" /> Add {selectedQty} to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const portalTarget = typeof document !== 'undefined' ? document.body : null;
  return portalTarget ? ReactDOM.createPortal(content, portalTarget) : content;
};

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product || typeof product !== 'object') return null;
  return <InnerModal product={product} onClose={onClose} />;
};

export default ProductDetailModal;


