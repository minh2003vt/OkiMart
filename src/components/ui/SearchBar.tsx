import React from 'react';
import { Search, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { cn } from '@/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBack?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search Oki Mart',
  value = '',
  onChange,
  onBack,
  className,
}) => {
  const itemCount = useCartStore((s) => s.itemCount());
  return (
    <div className={cn('flex items-center space-x-3 px-4 py-3 bg-white sticky top-0 z-40 border-b border-gray-100', className)}>
      {onBack && (
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
      )}
      
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
        />
      </div>

      {/* Cart icon with badge */}
      <div className="relative">
        <ShoppingCart className="h-5 w-5 text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full px-1.5 py-0.5">
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
