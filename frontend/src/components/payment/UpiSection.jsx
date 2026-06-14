import React, { useState } from 'react';
import { AtSign } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { FormField, FormItem, FormControl } from '../ui/form';
import { Input } from '../ui/input';
import { UPI_ID } from '../../data/dummyData';
import { formatINR } from '../../lib/utils';

export const UpiSection = ({ form }) => {
  const [upiTab, setUpiTab] = useState('enter'); // 'enter' | 'qr'
  const { total } = useCart();

  return (
    <div className="space-y-4 pt-3 border-t border-cafe-border/50 select-none">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex bg-cafe-surface-raised p-1 rounded-lg border border-cafe-border/50">
          <button
            type="button"
            onClick={() => setUpiTab('enter')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold font-sans transition-all focus:outline-none ${
              upiTab === 'enter'
                ? 'bg-cafe-accent text-cafe-bg shadow-sm'
                : 'text-cafe-text-secondary hover:text-cafe-text-primary'
            }`}
          >
            Enter UPI
          </button>
          <button
            type="button"
            onClick={() => setUpiTab('qr')}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold font-sans transition-all focus:outline-none ${
              upiTab === 'qr'
                ? 'bg-cafe-accent text-cafe-bg shadow-sm'
                : 'text-cafe-text-secondary hover:text-cafe-text-primary'
            }`}
          >
            Show QR
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {upiTab === 'enter' ? (
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="upiId"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cafe-text-secondary pointer-events-none" />
                  <FormControl>
                    <Input
                      placeholder="e.g. customer@ybl"
                      className="bg-cafe-surface-raised border-cafe-border focus:border-cafe-accent focus:ring-cafe-accent/20 pl-9 h-10 text-cafe-text-primary text-sm"
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="font-sans text-cafe-text-secondary">
              Ask the customer for their UPI ID to initiate transfer.
            </span>
            <div className="flex items-center gap-1.5 self-start sm:self-auto bg-cafe-surface-raised border border-cafe-border px-3 py-1 rounded-full text-cafe-accent font-mono text-[11px]">
              Cafe UPI: <span className="font-bold">{UPI_ID}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 bg-cafe-surface-raised/40 border border-cafe-border/50 rounded-xl space-y-4">
          {/* QR Code Container */}
          <div className="bg-white rounded-xl p-2.5 flex items-center justify-center shadow-card shrink-0">
            <svg width="150" height="150" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" className="w-[140px] h-[140px]">
              {/* Position Detection Patterns */}
              <rect x="0" y="0" width="160" height="160" fill="white"/>
              <rect x="4" y="4" width="44" height="44" rx="2" fill="black"/>
              <rect x="8" y="8" width="36" height="36" rx="1" fill="white"/>
              <rect x="12" y="12" width="28" height="28" rx="1" fill="black"/>
              <rect x="112" y="4" width="44" height="44" rx="2" fill="black"/>
              <rect x="116" y="8" width="36" height="36" rx="1" fill="white"/>
              <rect x="120" y="12" width="28" height="28" rx="1" fill="black"/>
              <rect x="4" y="112" width="44" height="44" rx="2" fill="black"/>
              <rect x="8" y="116" width="36" height="36" rx="1" fill="white"/>
              <rect x="12" y="120" width="28" height="28" rx="1" fill="black"/>
              {/* Data modules (fake, decorative) */}
              <rect x="60" y="4" width="8" height="8" fill="black"/>
              <rect x="72" y="4" width="8" height="8" fill="black"/>
              <rect x="60" y="16" width="8" height="8" fill="black"/>
              <rect x="84" y="16" width="8" height="8" fill="black"/>
              <rect x="72" y="28" width="8" height="8" fill="black"/>
              <rect x="60" y="40" width="8" height="8" fill="black"/>
              <rect x="84" y="40" width="8" height="8" fill="black"/>
              <rect x="4" y="60" width="8" height="8" fill="black"/>
              <rect x="16" y="60" width="8" height="8" fill="black"/>
              <rect x="4" y="72" width="8" height="8" fill="black"/>
              <rect x="28" y="72" width="8" height="8" fill="black"/>
              <rect x="16" y="84" width="8" height="8" fill="black"/>
              <rect x="4" y="96" width="8" height="8" fill="black"/>
              <rect x="60" y="60" width="8" height="8" fill="black"/>
              <rect x="72" y="60" width="8" height="8" fill="black"/>
              <rect x="84" y="60" width="8" height="8" fill="black"/>
              <rect x="96" y="60" width="8" height="8" fill="black"/>
              <rect x="60" y="72" width="8" height="8" fill="black"/>
              <rect x="84" y="72" width="8" height="8" fill="black"/>
              <rect x="72" y="84" width="8" height="8" fill="black"/>
              <rect x="96" y="84" width="8" height="8" fill="black"/>
              <rect x="60" y="96" width="8" height="8" fill="black"/>
              <rect x="84" y="96" width="8" height="8" fill="black"/>
              <rect x="112" y="60" width="8" height="8" fill="black"/>
              <rect x="124" y="60" width="8" height="8" fill="black"/>
              <rect x="148" y="60" width="8" height="8" fill="black"/>
              <rect x="112" y="72" width="8" height="8" fill="black"/>
              <rect x="136" y="72" width="8" height="8" fill="black"/>
              <rect x="124" y="84" width="8" height="8" fill="black"/>
              <rect x="148" y="84" width="8" height="8" fill="black"/>
              <rect x="112" y="96" width="8" height="8" fill="black"/>
              <rect x="136" y="96" width="8" height="8" fill="black"/>
              <rect x="60" y="112" width="8" height="8" fill="black"/>
              <rect x="72" y="124" width="8" height="8" fill="black"/>
              <rect x="84" y="112" width="8" height="8" fill="black"/>
              <rect x="96" y="124" width="8" height="8" fill="black"/>
              <rect x="60" y="136" width="8" height="8" fill="black"/>
              <rect x="84" y="148" width="8" height="8" fill="black"/>
              <rect x="108" y="112" width="8" height="8" fill="black"/>
              <rect x="120" y="120" width="8" height="8" fill="black"/>
              <rect x="132" y="112" width="8" height="8" fill="black"/>
              <rect x="144" y="124" width="8" height="8" fill="black"/>
              <rect x="108" y="136" width="8" height="8" fill="black"/>
              <rect x="132" y="148" width="8" height="8" fill="black"/>
            </svg>
          </div>

          <div className="text-center space-y-1">
            <span className="font-sans font-medium text-xs text-cafe-text-secondary">Scan to pay</span>
            <div className="price text-xl font-bold text-cafe-accent">{formatINR(total)}</div>
            <span className="font-sans text-[11px] text-cafe-text-secondary block font-mono">{UPI_ID}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpiSection;
