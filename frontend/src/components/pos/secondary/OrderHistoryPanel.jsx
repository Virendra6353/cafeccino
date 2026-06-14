import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { DUMMY_ORDERS } from '../../../data/dummyData';
import { Input } from '../../ui/input';
import { Separator } from '../../ui/separator';
import { cn, formatINR } from '../../../lib/utils';

export const OrderHistoryPanel = ({ selectedOrderId, setSelectedOrderId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter orders by search query
  const filteredOrders = useMemo(() => {
    return DUMMY_ORDERS.filter((order) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      const matchesNumber = order.number.toLowerCase().includes(query);
      const matchesCustomer = order.customer
        ? order.customer.toLowerCase().includes(query)
        : 'walk-in'.includes(query);
      return matchesNumber || matchesCustomer;
    });
  }, [searchQuery]);

  // Compute session total (sum of Paid orders only)
  const sessionTotal = useMemo(() => {
    return DUMMY_ORDERS
      .filter((o) => o.status === 'Paid')
      .reduce((sum, o) => sum + o.amount, 0);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="font-sans font-medium text-[10px] px-2 py-0.5 bg-cafe-success/15 border border-cafe-success/30 text-cafe-success rounded-full shrink-0">
            Paid
          </span>
        );
      case 'Cancelled':
        return (
          <span className="font-sans font-medium text-[10px] px-2 py-0.5 bg-cafe-danger/15 border border-cafe-danger/30 text-cafe-danger rounded-full shrink-0">
            Cancelled
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="font-sans font-medium text-[10px] px-2 py-0.5 bg-cafe-surface-raised border border-cafe-border text-cafe-text-secondary rounded-full shrink-0">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header Area */}
      <div className="px-4 pt-5 pb-3">
        <h3 className="font-display font-bold text-[15px] text-cafe-text-primary">
          Orders
        </h3>
        <p className="font-sans font-normal text-xs text-cafe-text-secondary mt-0.5">
          This session
        </p>
      </div>

      {/* Search Input */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-cafe-text-secondary pointer-events-none" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 pl-8 h-9 text-xs text-cafe-text-primary rounded-md"
          />
        </div>
      </div>

      <Separator className="bg-cafe-border mb-1" />

      {/* Scrollable Orders List */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5 space-y-1.5">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-sans text-xs text-cafe-text-secondary">
              No orders found
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isSelected = selectedOrderId === order.id;

            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={cn(
                  "p-3 rounded-lg border transition-all cursor-pointer flex flex-col gap-1.5",
                  isSelected
                    ? "bg-cafe-surface-raised border-cafe-border"
                    : "bg-transparent border-transparent hover:bg-cafe-surface-raised/65"
                )}
              >
                {/* Row 1: Order # and Status */}
                <div className="flex justify-between items-center">
                  <span className="font-display font-semibold text-[13px] text-cafe-text-primary">
                    {order.number}
                  </span>
                  {getStatusBadge(order.status)}
                </div>

                {/* Row 2: Customer Name and Amount */}
                <div className="flex justify-between items-center text-xs">
                  {order.customer ? (
                    <span className="font-sans text-cafe-text-secondary">
                      {order.customer}
                    </span>
                  ) : (
                    <span className="font-sans text-cafe-text-secondary/60 italic">
                      Walk-in
                    </span>
                  )}
                  <span className="price font-medium text-cafe-accent text-[13px]">
                    {formatINR(order.amount)}
                  </span>
                </div>

                {/* Row 3: Date */}
                <span className="font-sans text-[10px] text-cafe-text-secondary">
                  {order.date}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Sticky footer session totals */}
      <div className="border-t border-cafe-border px-4 py-3 bg-cafe-surface shrink-0">
        <span className="font-sans font-medium text-xs text-cafe-text-secondary block">
          Session total
        </span>
        <span className="price text-[15px] font-bold text-cafe-accent mt-0.5 block">
          {formatINR(sessionTotal)}
        </span>
      </div>
    </div>
  );
};
export default OrderHistoryPanel;
