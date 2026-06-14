import React from 'react';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { AnimatePresence } from 'framer-motion';

export const CartSidebar = ({ isOpen, onClose, onCheckout }) => {
  const { items, updateQuantity, removeItem } = useCart();
  const isEmpty = items.length === 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[400px] bg-cafe-surface border-l border-cafe-border p-0 flex flex-col h-full focus-visible:outline-none"
      >
        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b border-cafe-border flex flex-row items-center gap-2 space-y-0">
          <ShoppingCart className="h-5 w-5 text-cafe-accent" />
          <SheetTitle className="font-display font-bold text-lg text-cafe-text-primary">
            Your Order
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Items list */}
        <div className="flex-1 overflow-y-auto px-5">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <ShoppingBag className="h-12 w-12 text-cafe-border mb-3" />
              <p className="font-sans font-medium text-sm text-cafe-text-secondary">
                Nothing added yet
              </p>
              <p className="font-sans font-normal text-xs text-cafe-text-secondary/60 mt-1 max-w-[200px]">
                Browse the menu and add items to your cart.
              </p>
            </div>
          ) : (
            <div className="py-2">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Sticky Footer Cart Calculations */}
        <CartSummary onCheckout={onCheckout} />
      </SheetContent>
    </Sheet>
  );
};
export default CartSidebar;
