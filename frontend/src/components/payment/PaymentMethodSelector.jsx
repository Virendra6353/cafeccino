import React from 'react';
import { CreditCard, Banknote, QrCode, Info, Hash } from 'lucide-react';
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import UpiSection from './UpiSection';

const METHODS = [
  { id: 'cash', label: 'Cash', icon: Banknote },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: QrCode },
];

export const PaymentMethodSelector = ({ form }) => {
  // Watch selection value to update layout reactively
  const currentMethod = form.watch('paymentMethod');

  return (
    <div className="bg-cafe-surface border border-cafe-border rounded-xl p-6 space-y-5 select-none">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-cafe-border pb-3">
        <CreditCard className="h-4.5 w-4.5 text-cafe-accent" />
        <h3 className="font-display font-semibold text-base text-cafe-text-primary">
          Payment Method
        </h3>
      </div>

      <div className="space-y-4">
        {/* Method Grid */}
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="grid grid-cols-3 gap-3">
                {METHODS.map((method) => {
                  const Icon = method.icon;
                  const isSelected = currentMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => field.onChange(method.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer focus:outline-none ${
                        isSelected
                          ? 'bg-cafe-accent-dim border-cafe-accent text-cafe-accent shadow-sm'
                          : 'bg-cafe-surface-raised border-cafe-border text-cafe-text-secondary hover:border-cafe-accent/40 hover:text-cafe-text-primary'
                      }`}
                    >
                      <Icon className="h-6 w-6 mb-2.5" />
                      <span className="font-sans font-medium text-xs">
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <FormMessage className="text-cafe-danger text-xs font-normal mt-1" />
            </FormItem>
          )}
        />

        {/* Conditional Sections */}
        {currentMethod === 'cash' && (
          <div className="flex items-start gap-2 bg-cafe-surface-raised/40 p-3 rounded-lg border border-cafe-border/30">
            <Info className="h-4 w-4 text-cafe-text-secondary mt-0.5 shrink-0" />
            <span className="font-sans font-normal text-xs text-cafe-text-secondary leading-relaxed">
              Collect exact amount or calculate change at billing.
            </span>
          </div>
        )}

        {currentMethod === 'card' && (
          <FormField
            control={form.control}
            name="transactionReference"
            render={({ field }) => (
              <FormItem className="space-y-1.5 pt-3 border-t border-cafe-border/50">
                <FormLabel className="text-[13px] font-medium text-cafe-text-secondary">
                  Transaction Reference
                </FormLabel>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cafe-text-secondary pointer-events-none" />
                  <FormControl>
                    <Input
                      placeholder="e.g. TXN0012345"
                      className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 pl-9 h-10 text-cafe-text-primary text-sm"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-cafe-danger text-xs font-normal" />
              </FormItem>
            )}
          />
        )}

        {currentMethod === 'upi' && <UpiSection form={form} />}
      </div>
    </div>
  );
};
export default PaymentMethodSelector;
