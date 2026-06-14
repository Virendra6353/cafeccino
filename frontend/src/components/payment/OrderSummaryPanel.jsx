import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/dummyData';
import { formatINR } from '../../lib/utils';
import { Separator } from '../ui/separator';

const iconMap = {
  cash: Banknote,
  card: CreditCard,
  upi: QrCode,
};

const labelMap = {
  cash: 'Cash Payment',
  card: 'Card Terminal',
  upi: 'UPI Transfer',
};

export const OrderSummaryPanel = ({ paymentMethod = 'cash' }) => {
  const navigate = useNavigate();
  const { items, subtotal, taxAmount, discountAmount, total, coupon } = useCart();

  const MethodIcon = iconMap[paymentMethod] || Banknote;
  const methodLabel = labelMap[paymentMethod] || 'Cash';

  return (
    <div className="sticky top-20 bg-cafe-surface border border-cafe-border rounded-xl p-6 space-y-6 select-none shadow-card">
      <h3 className="font-display font-bold text-lg text-cafe-text-primary">
        Order Summary
      </h3>

      {/* Cart Items List */}
      <div className="max-h-[280px] overflow-y-auto pr-1 space-y-3">
        {items.map((item, idx) => {
          const cat = CATEGORIES.find((c) => c.id === item.product.category);
          const catColor = cat ? cat.color : '#F0EDE8';

          return (
            <div
              key={item.product.id}
              className={`flex items-center justify-between pb-3 ${
                idx !== items.length - 1 ? 'border-b border-cafe-border' : ''
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Category indicator dot */}
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: catColor }}
                />
                <span className="font-sans font-medium text-sm text-cafe-text-primary truncate max-w-[160px]">
                  {item.product.name}
                </span>
                <span className="font-sans font-normal text-xs text-cafe-text-secondary">
                  &times;{item.quantity}
                </span>
              </div>
              <span className="price text-sm font-medium text-cafe-text-primary shrink-0">
                {formatINR(item.product.price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Totals Table */}
      <div className="space-y-2.5 pt-2 border-t border-cafe-border">
        <div className="flex justify-between items-center text-sm font-sans font-medium text-cafe-text-secondary">
          <span>Subtotal</span>
          <span className="price text-cafe-text-primary">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-sans font-medium text-cafe-text-secondary">
          <span>Tax</span>
          <span className="price text-cafe-text-primary">{formatINR(taxAmount)}</span>
        </div>

        {coupon && (
          <div className="flex justify-between items-center text-sm font-sans font-medium text-cafe-success">
            <span>Discount ({coupon.code})</span>
            <span className="price">-{formatINR(discountAmount)}</span>
          </div>
        )}

        <Separator className="bg-cafe-border my-3" />

        <div className="flex justify-between items-end font-display">
          <span className="font-bold text-base text-cafe-text-primary">Total</span>
          <span className="price text-xl font-bold text-cafe-accent leading-none">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Live Payment Method Badge */}
      <div className="pt-2 flex justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={paymentMethod}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1.5 bg-cafe-surface-raised border border-cafe-border px-3.5 py-1.5 rounded-full"
          >
            <MethodIcon className="h-4 w-4 text-cafe-text-secondary" />
            <span className="font-sans font-medium text-xs text-cafe-text-secondary">
              {methodLabel}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Return triggers */}
      <div className="pt-2 text-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="font-sans font-normal text-xs text-cafe-text-secondary hover:text-cafe-text-primary underline cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cafe-text-secondary rounded"
        >
          &larr; Edit order
        </button>
      </div>
    </div>
  );
};
export default OrderSummaryPanel;
