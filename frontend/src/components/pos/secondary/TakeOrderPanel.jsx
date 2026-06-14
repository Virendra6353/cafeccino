import React from 'react';
import { CATEGORIES, PRODUCTS } from '../../../data/dummyData';
import { useCart } from '../../../context/CartContext';
import { cn, formatINR } from '../../../lib/utils';
import { Separator } from '../../ui/separator';

export const TakeOrderPanel = ({ activeCategory, setActiveCategory }) => {
  const { items } = useCart();

  // Calculate product count for each category
  const getProductCount = (categoryId) => {
    if (categoryId === 'all') {
      return PRODUCTS.length;
    }
    return PRODUCTS.filter((p) => p.category === categoryId).length;
  };

  // Helper to convert hex to rgba for backgrounds
  const hexToRgbA = (hex, alpha) => {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return `rgba(${(c >> 16) & 255}, ${(c >> 8) & 255}, ${c & 255}, ${alpha})`;
    }
    return hex;
  };

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Preview calculation
  const displayedCartItems = items.slice(0, 4);
  const remainingCartItemsCount = items.length - 4;

  return (
    <div className="flex flex-col h-full select-none">
      {/* Header Area */}
      <div className="px-4 pt-5 pb-3">
        <h3 className="font-display font-bold text-[15px] text-cafe-text-primary">
          Menu
        </h3>
        <p className="font-sans font-normal text-xs text-cafe-text-secondary mt-0.5">
          Select a category
        </p>
      </div>

      <Separator className="bg-cafe-border mb-3" />

      {/* Category List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getProductCount(cat.id);
          const activeBg = hexToRgbA(cat.color, 0.15);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center justify-between py-2.5 px-3 w-full rounded-lg text-left transition-all border-l-[3px] border-transparent cursor-pointer",
                isActive
                  ? "font-sans font-semibold text-[13px]"
                  : "font-sans font-medium text-[13px] text-cafe-text-secondary hover:bg-cafe-surface-raised hover:text-cafe-text-primary"
              )}
              style={{
                backgroundColor: isActive ? activeBg : 'transparent',
                borderColor: isActive ? cat.color : 'transparent',
                color: isActive ? cat.color : undefined,
              }}
              aria-label={`Select category ${cat.name}`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span className="font-sans font-normal text-[11px] bg-cafe-surface-raised text-cafe-text-secondary px-1.5 py-0.5 rounded-full shrink-0">
                {count}
              </span>
            </button>
          );
        })}

        {/* Cart Preview Section (shows only when cart is not empty) */}
        {items.length > 0 && (
          <div className="pt-3">
            <Separator className="bg-cafe-border my-3" />

            {/* In Cart Header */}
            <div className="flex justify-between items-center px-3 mb-2">
              <span className="font-display font-semibold text-[13px] text-cafe-text-primary">
                In Cart
              </span>
              <span className="font-sans font-medium text-[10px] bg-cafe-accent-dim border border-cafe-accent/30 text-cafe-accent px-2 py-0.5 rounded-full">
                {totalQty} {totalQty === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* In Cart preview rows */}
            <div className="space-y-1 bg-cafe-surface-raised/40 p-2 rounded-xl border border-cafe-border/30">
              {displayedCartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center px-2 py-1 text-xs">
                  <span className="font-sans font-medium text-cafe-text-primary truncate max-w-[110px]" title={item.product.name}>
                    {item.product.name}
                  </span>
                  <span className="price text-[11px] text-cafe-text-secondary">
                    {item.quantity} &times; {formatINR(item.product.price)}
                  </span>
                </div>
              ))}

              {remainingCartItemsCount > 0 && (
                <div className="font-sans font-normal text-[11px] text-cafe-text-secondary px-2 py-1 italic">
                  +{remainingCartItemsCount} more {remainingCartItemsCount === 1 ? 'item' : 'items'}...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TakeOrderPanel;
