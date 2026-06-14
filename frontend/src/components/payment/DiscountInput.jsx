import React, { useState, useEffect } from 'react';
import { Tag, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { COUPONS } from '../../data/dummyData';
import { formatINR } from '../../lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const DiscountInput = () => {
  const { coupon, applyCoupon, removeCoupon, discountAmount } = useCart();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Synchronize input code if coupon changes (e.g. cleared externally)
  useEffect(() => {
    if (!coupon) {
      setCode('');
      setError('');
    } else {
      setCode(coupon.code);
    }
  }, [coupon]);

  const handleApply = (e) => {
    e.preventDefault();
    setError('');

    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode) {
      setError('Please enter a coupon code.');
      return;
    }

    const foundCoupon = COUPONS.find((c) => c.code === trimmedCode);
    if (foundCoupon) {
      applyCoupon(foundCoupon);
      setError('');
    } else {
      setError('Invalid coupon code.');
      removeCoupon();
    }
  };

  const handleClear = () => {
    removeCoupon();
    setCode('');
    setError('');
  };

  return (
    <div className="bg-cafe-surface border border-cafe-border rounded-xl p-6 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-cafe-border pb-3">
        <Tag className="h-4.5 w-4.5 text-cafe-accent" />
        <h3 className="font-display font-semibold text-base text-cafe-text-primary">
          Apply Discount
        </h3>
      </div>

      <div className="space-y-3">
        {/* Input & Action buttons row */}
        <form onSubmit={handleApply} className="flex gap-2.5">
          <Input
            type="text"
            placeholder="Enter coupon code (e.g. WELCOME10)"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError('');
            }}
            disabled={!!coupon}
            style={{ textTransform: 'uppercase' }}
            className="flex-1 bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 h-10 text-cafe-text-primary text-sm uppercase"
          />

          {coupon ? (
            <Button
              type="button"
              onClick={handleClear}
              className="bg-cafe-surface border border-cafe-border hover:border-cafe-danger hover:text-cafe-danger h-10 px-4 rounded-lg font-sans font-medium text-xs text-cafe-text-secondary transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <X className="h-3.5 w-3.5" />
              <span>Remove</span>
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-cafe-surface-raised border border-cafe-border hover:border-cafe-accent h-10 px-5 rounded-lg font-sans font-semibold text-[13px] text-cafe-text-primary hover:text-cafe-text-primary transition-all cursor-pointer"
            >
              Apply
            </Button>
          )}
        </form>

        {/* Validation States display */}
        {coupon && (
          <div className="flex items-center justify-between text-xs font-sans font-medium text-cafe-success bg-cafe-success/10 border border-cafe-success/20 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>
                {coupon.description}
              </span>
            </div>
            <span className="font-mono font-bold">
              -{formatINR(discountAmount)}
            </span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-cafe-danger bg-cafe-danger/10 border border-cafe-danger/20 px-3 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo coupon helper hint text */}
        {!coupon && !error && (
          <p className="font-sans font-normal text-xs text-cafe-text-secondary">
            Try: <span className="text-cafe-accent font-medium">WELCOME10</span> (10% off) &middot;{' '}
            <span className="text-cafe-accent font-medium">FLAT50</span> (₹50 off) &middot;{' '}
            <span className="text-cafe-accent font-medium">CAFE20</span> (20% off)
          </p>
        )}
      </div>
    </div>
  );
};
export default DiscountInput;
