import React from 'react';
import { Product } from '@/types';
import { formatCurrency } from '@/utils';
import { useCartStore } from '@/store/cart';
import Card from './Card';
import Button from './Button';
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  layout?: 'carousel' | 'grid';
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  layout = 'carousel',
}) => {
  const add = useCartStore((s) => s.add);
  const getQuantity = useCartStore((s) => s.getQuantity);

  const handleOpenDetails = () => {
    if (onAddToCart) onAddToCart(product);
  };

  const handleQuickAdd = () => {
    add(product, 1);
  };
  

  return (
    <Card className={layout === 'carousel' ? 'w-36 flex-none p-3' : 'w-full p-3'}>
      <button
        type="button"
        onClick={handleOpenDetails}
        className="w-full text-left"
        aria-label={`View details for ${product.name}`}
      >
      <div className="aspect-square rounded-lg mb-2 overflow-hidden bg-gray-50 flex items-center justify-center">
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
        ) : (
          <div className="w-full h-full text-gray-400 text-sm flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-center text-gray-900 truncate">
          {product.name}
        </h3>
        <div className="text-center">
          <span className="text-red-600 font-medium text-sm">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
      </button>

      <div className="flex justify-end mt-2">
          <Button
            size="sm"
            variant="ghost"
            className="w-10 h-10 p-0 rounded-full bg-white text-black hover:bg-gray-100 hover:rounded-full"
            onClick={handleQuickAdd}
            aria-label={`Add 1 ${product.name} to cart`}
            title={`Add 1 ${product.name} to cart`}
            disabled={getQuantity(product.id) >= (product.quantity ?? Number.MAX_SAFE_INTEGER)}
          >
            <Plus className="h-4 w-4" />
          </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
