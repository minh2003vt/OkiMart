import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '@/components/ui/SearchBar';
import { categories, products } from '@/services/data';
import { Product, ProductCategory } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import ProductDetailModal from '@/components/ui/ProductDetailModal';

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Search: React.FC = () => {
  const qs = useQuery();
  const [query, setQuery] = useState<string>(qs.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered: Product[] = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !normalizedQuery
        || p.name.toLowerCase().includes(normalizedQuery)
        || p.category.name.toLowerCase().includes(normalizedQuery)
        || (p.description ?? '').toLowerCase().includes(normalizedQuery);
      const matchesCategory = selectedCategory === 'all' || p.category.id === selectedCategory;
      const matchesPrice = maxPrice === '' || p.price <= Number(maxPrice);
      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, selectedCategory, maxPrice]);

  return (
    <div className="min-h-screen bg-white">
      <SearchBar value={query} onChange={setQuery} placeholder="Search products" navigateOnChange />

      <div className="px-4 py-3 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-3">
          <select
            className="w-full bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c: ProductCategory) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            placeholder="Max price"
            className="w-full bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
          />
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} layout="grid" onAddToCart={(prod) => setSelectedProduct(prod)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-12">No products match your filters.</div>
        )}
      </div>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};

export default Search;


