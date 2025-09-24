import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  category: ProductCategory;
  products: Product[];
  onAddToCart?: (product: Product) => void;
  onSeeAll?: (category: ProductCategory) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  category,
  products,
  onAddToCart,
  onSeeAll,
}) => {
  // pagination size by breakpoint (sm, md, lg, xl)
  const pageSizes = {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
  };

  const [page, setPage] = useState(0);

  // compute page size responsively on client
  const pageSize = useMemo(() => {
    if (typeof window === 'undefined') return pageSizes.md;
    const w = window.innerWidth;
    if (w >= 1280) return pageSizes.xl;
    if (w >= 1024) return pageSizes.lg;
    if (w >= 768) return pageSizes.md;
    return pageSizes.sm;
  }, [window?.innerWidth]);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const current = Math.min(page, totalPages - 1);
  const pagedProducts = useMemo(() => {
    const start = current * pageSize;
    return products.slice(start, start + pageSize);
  }, [current, pageSize, products]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-lg font-bold text-gray-900">{category.name}</h2>
        {onSeeAll && (
          <button
            onClick={() => onSeeAll(category)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={`See all ${category.name}`}
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        )}
      </div>
      
      {/* Products - responsive: carousel on small screens, grid with pagination on larger screens */}
      <div className="px-4">
        <div className="flex space-x-3 overflow-x-auto pb-2 sm:hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              layout="carousel"
            />
          ))}
        </div>

        <div className="hidden sm:block">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-start">
            {pagedProducts.map((product) => (
              <div key={product.id} className="min-w-0">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  layout="grid"
                />
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end mt-3 space-x-2">
              <button
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
                onClick={goPrev}
                disabled={current === 0}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700" />
              </button>
              <span className="text-xs text-gray-600">
                Page {current + 1} / {totalPages}
              </span>
              <button
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
                onClick={goNext}
                disabled={current >= totalPages - 1}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
