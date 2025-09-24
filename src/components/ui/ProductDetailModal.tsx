import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import Button from './Button';
import { formatCurrency } from '@/utils';
import { useCartStore } from '@/store/cart';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const add = useCartStore((s) => s.add);
  if (!product) return null;

  const handleAdd = () => {
    add(product, 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md sm:rounded-xl p-4">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
            {product.emoji ? <span className="text-3xl">{product.emoji}</span> : null}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description ?? 'No description provided.'}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-red-600 font-semibold">{formatCurrency(product.price)}</span>
              <Button className="bg-primary-600 text-white hover:bg-primary-700" onClick={handleAdd}>
                <ShoppingCart className="h-4 w-4 mr-1" /> Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;


