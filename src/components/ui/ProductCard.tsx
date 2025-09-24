import React from 'react';
import { Product } from '@/types';
import { formatCurrency } from '@/utils';
import { useCartStore } from '@/store/cart';
import Card from './Card';
import Button from './Button';
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  layout?: 'carousel' | 'grid';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, layout = 'carousel' }) => {
  const add = useCartStore((s) => s.add);
  const handleAddToCart = () => {
    add(product, 1);
    onAddToCart?.(product);
  };

  return (
    <Card className={layout === 'carousel' ? 'p-3 min-w-[120px] flex-shrink-0' : 'p-3 w-full'}>
      <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
        {product.emoji ? (
          <span className="text-2xl">{product.emoji}</span>
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="font-medium text-sm text-gray-900 truncate">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-red-600 font-medium text-sm">
            {formatCurrency(product.price)}
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="p-1 h-6 w-6 rounded-full hover:bg-primary-100 text-primary-600"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>

        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
