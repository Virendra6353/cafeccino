import React from 'react';
import { CATEGORIES, PRODUCTS } from '../../data/dummyData';
import { cn } from '../../lib/utils';

export const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
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

  return (
    <>
      {/* Desktop Category Sidebar */}
      <aside className="hidden md:flex flex-col w-[200px] h-[calc(100vh-64px)] overflow-y-auto bg-cafe-surface border-r border-cafe-border p-3 space-y-1.5 shrink-0 select-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getProductCount(cat.id);
          const activeBg = hexToRgbA(cat.color, 0.15);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center justify-between py-2.5 px-3 w-full rounded-lg text-left transition-all border-l-[3px] border-transparent",
                isActive
                  ? "font-sans font-semibold text-sm"
                  : "font-sans font-medium text-sm text-cafe-text-secondary hover:text-cafe-text-primary"
              )}
              style={{
                backgroundColor: isActive ? activeBg : 'transparent',
                borderColor: isActive ? cat.color : 'transparent',
                color: isActive ? cat.color : undefined,
              }}
              aria-label={`Category ${cat.name}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span className="font-sans font-normal text-[11px] bg-cafe-surface-raised border border-cafe-border/50 text-cafe-text-secondary px-1.5 py-0.5 rounded-full shrink-0">
                {count}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Mobile Horizontal Scroll Tab Bar */}
      <nav className="flex md:hidden w-full overflow-x-auto bg-cafe-surface border-b border-cafe-border px-4 py-3 gap-2.5 scrollbar-none whitespace-nowrap shrink-0 select-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = getProductCount(cat.id);
          const activeBg = hexToRgbA(cat.color, 0.15);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 py-1.5 px-3 rounded-full text-xs font-sans font-medium transition-all border border-cafe-border",
                isActive
                  ? "border-transparent"
                  : "bg-cafe-surface-raised text-cafe-text-secondary hover:text-cafe-text-primary"
              )}
              style={{
                backgroundColor: isActive ? activeBg : undefined,
                borderColor: isActive ? cat.color : undefined,
                color: isActive ? cat.color : undefined,
              }}
              aria-label={`Category ${cat.name}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75 font-normal">
                ({count})
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
export default CategoryTabs;
