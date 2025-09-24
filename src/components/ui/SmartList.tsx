import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SmartListTag } from '@/types';
import Button from './Button';

interface SmartListProps {
  tags: SmartListTag[];
  onTagClick?: (tag: SmartListTag) => void;
  onTrySmartList?: () => void;
}

const SmartList: React.FC<SmartListProps> = ({
  tags,
  onTagClick,
  onTrySmartList,
}) => {
  return (
    <div className="bg-primary-600 rounded-lg p-4 mx-4 my-4">
      <div className="text-center space-y-3">
        <h2 className="text-lg font-bold text-white">From list to cart</h2>
        <p className="text-white text-sm opacity-90">
          Shop all your groceries in one search
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagClick?.(tag)}
              className="flex items-center space-x-1 bg-white bg-opacity-20 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:bg-opacity-30 transition-colors"
            >
              <span className={tag.color}>{tag.icon}</span>
              <span>{tag.name}</span>
            </button>
          ))}
        </div>
        
        {/* Try Smart List Button */}
        <Button
          onClick={onTrySmartList}
          className="bg-primary-500 text-white hover:bg-primary-600 font-medium"
        >
          Try Smart List
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SmartList;
