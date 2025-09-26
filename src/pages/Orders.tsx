import React, { useMemo, useState } from 'react';
import { orders } from '@/services/data';
import { useAuthStore } from '@/store/auth';
import { formatCurrency } from '@/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Orders: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const currentUser = useAuthStore((s) => s.currentUser);
  const filteredOrders = useMemo(() => {
    const fromTs = dateFrom ? new Date(dateFrom).getTime() : -Infinity;
    const toTs = dateTo ? new Date(dateTo).getTime() : Infinity;
    return orders.filter((o) => {
      if (currentUser && o.userId !== currentUser.id) return false;
      const ts = new Date(o.createdAt).getTime();
      return ts >= fromTs && ts <= toTs;
    });
  }, [dateFrom, dateTo, currentUser]);

  if (filteredOrders.length === 0) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">No orders yet. Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Your Orders</h1>
      <div className="grid grid-cols-2 gap-5 mb-4">
        <div className="text-sm text-gray-900 mb-4">Start Date<input
          type="date"
          className="w-full bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        /> </div>
        <div className="text-sm text-gray-900 mb-4">End Date<input
          type="date"
          className="w-full bg-gray-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        /> </div>
      </div>
      <div className="space-y-3">
        {filteredOrders
          .slice()
          .reverse()
          .map((o) => {
            const isOpen = !!openIds[o.id];
            return (
              <div key={o.id} className="border border-gray-100 rounded-lg">
                <button
                  className="w-full flex items-center p-3"
                  onClick={() => setOpenIds((s) => ({ ...s, [o.id]: !isOpen }))}
                  aria-expanded={isOpen}
                  aria-controls={`order-${o.id}`}
                >
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                  )}
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-900">Order • {new Date(o.createdAt).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{o.items.length} items</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(o.total)}</div>
                </button>
                {isOpen && (
                  <div id={`order-${o.id}`} className="px-3 pb-3">
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                      {o.items.map((it, idx) => (
                        <div key={idx} className="flex items-center py-3">
                          <div className="w-10 h-10 rounded bg-gray-50 overflow-hidden flex items-center justify-center mr-3">
                            {it.product.image ? (
                              <img src={it.product.image} alt={it.product.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                            ) : it.product.emoji ? (
                              <span className="text-lg">{it.product.emoji}</span>
                            ) : (
                              <div className="text-gray-400 text-[10px]">No Image</div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">{it.product.name}</div>
                            <div className="text-xs text-gray-500">Qty: {it.quantity}</div>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">{formatCurrency(it.lineTotal)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Orders;
