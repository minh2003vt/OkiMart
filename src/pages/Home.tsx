import React, { useState } from 'react';
import { Product, ProductCategory, SmartListTag } from '@/types';
import { storeData, deliveryInfo, smartListTags, categories, getProductsByCategory } from '@/services/data';
import SearchBar from '@/components/ui/SearchBar';
import StoreHeader from '@/components/ui/StoreHeader';
import SmartList from '@/components/ui/SmartList';
import DeliveryBanner from '@/components/ui/DeliveryBanner';
import ProductSection from '@/components/ui/ProductSection';
import ProductDetailModal from '@/components/ui/ProductDetailModal';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (_product: Product) => {};

  const handleSmartListTagClick = (tag: SmartListTag) => {
    // TODO: Implement smart list tag functionality
    console.log('Smart list tag clicked:', tag);
  };

  const handleTrySmartList = () => {
    // TODO: Implement try smart list functionality
    console.log('Try smart list clicked');
  };

  const handleSeeAll = (category: ProductCategory) => {
    // TODO: Implement see all functionality
    console.log('See all clicked for category:', category);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* App Title */}
      <div className="text-center py-2 bg-white border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">
          Okimart Store - Fast Essentials
        </h1>
      </div>

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Oki Mart"
      />

      {/* Store Header fixed under search */}
      <div className="sticky top-[56px] z-30">
        <StoreHeader store={storeData} />
      </div>

      {/* Smart List */}
      <SmartList
        tags={smartListTags}
        onTagClick={handleSmartListTagClick}
        onTrySmartList={handleTrySmartList}
      />

      {/* Delivery Banner */}
      <DeliveryBanner deliveryInfo={deliveryInfo} />

      {/* Product Categories (dynamic search) */}
      <div className="space-y-6">
        {categories.map((category) => (
          <ProductSection
            key={category.id}
            category={category}
            products={getProductsByCategory(category.id, searchQuery)}
            onAddToCart={(p) => setSelectedProduct(p)}
            onSeeAll={handleSeeAll}
          />
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Home;
