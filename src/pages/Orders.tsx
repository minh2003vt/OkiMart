import React from 'react';

const Orders: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Orders</h1>
        <p className="text-gray-600">No orders yet. Start shopping to see your orders here!</p>
      </div>
    </div>
  );
};

export default Orders;
