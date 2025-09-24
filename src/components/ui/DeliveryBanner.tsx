import React from 'react';
import { DeliveryInfo } from '@/types';

interface DeliveryBannerProps {
  deliveryInfo: DeliveryInfo;
}

const DeliveryBanner: React.FC<DeliveryBannerProps> = ({ deliveryInfo }) => {
  return (
    <div className="bg-accent-yellow rounded-lg mx-4 mb-4 p-3">
      <div className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-900">
        <span className="text-lg">⚡</span>
        <span>Fastest Delivery</span>
        <span>•</span>
        <span>No Minimum Order</span>
        <span>•</span>
        <span>Delivers in {deliveryInfo.deliveryTime}</span>
      </div>
    </div>
  );
};

export default DeliveryBanner;
