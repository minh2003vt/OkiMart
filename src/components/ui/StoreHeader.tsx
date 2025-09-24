import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Store } from '@/types';
import { formatRating, formatReviewCount } from '@/utils';

interface StoreHeaderProps {
  store: Store;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ store }) => {
  return (
    <div className="bg-primary-50 px-4 py-6">
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Store Logo */}
        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-2xl">⚡</span>
        </div>
        
        {/* Store Name */}
        <h1 className="text-xl font-bold text-gray-900">{store.name}</h1>
        
        {/* Rating and Status */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">
              {formatRating(store.rating)} ({formatReviewCount(store.reviewCount)})
            </span>
          </div>
          
          <div className="w-1 h-1 bg-primary-500 rounded-full" />
          
          <span className="text-sm text-primary-600 font-medium">
            {store.isInStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
        
        {/* Address */}
        <div className="flex items-center space-x-1 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{store.address}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
