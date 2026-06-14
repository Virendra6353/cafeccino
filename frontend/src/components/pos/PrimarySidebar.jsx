import { ShoppingCart, ClipboardList, Users, LayoutGrid } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { id: 'take-order', label: 'Order', icon: ShoppingCart },
  { id: 'order-history', label: 'History', icon: ClipboardList },
  { id: 'customers', label: 'Guests', icon: Users },
  { id: 'table-info', label: 'Tables', icon: LayoutGrid },
];

export const PrimarySidebar = ({ activeNav, setActiveNav, onCartClick }) => {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const isCartEmpty = totalItems === 0;

  return (
    <>
      {/* Desktop Column 1 (Primary Sidebar) */}
      <aside className="hidden md:flex flex-col w-16 h-[calc(100vh-64px)] border-r border-cafe-border bg-cafe-surface items-center py-4 select-none shrink-0 justify-between">
        {/* Navigation Buttons Stack */}
        <div className="flex flex-col items-center gap-2 w-full">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={cn(
                  "relative w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer focus:outline-none",
                  isActive
                    ? "bg-cafe-accent-dim text-cafe-accent border-l-[3px] border-l-cafe-accent pl-[3px]"
                    : "bg-transparent text-cafe-text-secondary hover:bg-cafe-surface-raised hover:text-cafe-text-primary"
                )}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="font-sans font-medium text-[9px] tracking-wide uppercase">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Cart Trigger Button */}
        <div className="flex flex-col items-center w-full mt-auto">
          {/* Divider */}
          <div className="w-8 h-[1px] bg-cafe-border mb-3" />

          {/* Cart summary trigger button */}
          <button
            onClick={isCartEmpty ? undefined : onCartClick}
            disabled={isCartEmpty}
            className={cn(
              "relative w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-150 shadow-[0_0_16px_rgba(245,166,35,0.3)] bg-cafe-accent text-cafe-bg hover:bg-[#e09820] cursor-pointer",
              isCartEmpty && "opacity-50 cursor-not-allowed shadow-none"
            )}
            aria-label="Open Cart Sidebar"
          >
            <ShoppingCart className="h-5 w-5 shrink-0 text-cafe-bg" />
            <span className="font-sans font-semibold text-[9px] tracking-wide uppercase text-cafe-bg">
              Cart
            </span>

            {/* Total items badge overlay */}
            {!isCartEmpty && (
              <span className="absolute top-1 right-1 h-[18px] w-[18px] bg-cafe-bg text-cafe-accent rounded-full border border-cafe-border flex items-center justify-center font-mono font-bold text-[9px] select-none">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Tab Bar (< 768px) */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-cafe-surface border-t border-cafe-border items-center justify-around z-50 select-none px-2 shadow-elevated">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={cn(
                "flex-1 h-full flex flex-col items-center justify-center gap-0.5 transition-all duration-150 focus:outline-none",
                isActive
                  ? "text-cafe-accent"
                  : "text-cafe-text-secondary hover:text-cafe-text-primary"
              )}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="font-sans font-medium text-[9px] tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Mobile Cart Trigger Tab */}
        <button
          onClick={isCartEmpty ? undefined : onCartClick}
          disabled={isCartEmpty}
          className={cn(
            "flex-1 h-full flex flex-col items-center justify-center gap-0.5 transition-all duration-150 focus:outline-none relative",
            isCartEmpty ? "text-cafe-text-secondary/40 cursor-not-allowed" : "text-cafe-accent hover:text-[#e09820]"
          )}
          aria-label="Open Cart"
        >
          <ShoppingCart className="h-5 w-5 shrink-0" />
          <span className="font-sans font-medium text-[9px] tracking-wider uppercase">
            Cart
          </span>

          {/* Badge indicator */}
          {!isCartEmpty && (
            <span className="absolute top-1.5 right-6 h-[16px] w-[16px] bg-cafe-accent text-cafe-bg rounded-full flex items-center justify-center font-mono font-bold text-[8px] select-none">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </>
  );
};
export default PrimarySidebar;
