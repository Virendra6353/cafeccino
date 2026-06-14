import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/utils';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export const CartSummary = ({ onCheckout }) => {
  const { items, subtotal, taxAmount, total, clearCart } = useCart();
  const isEmpty = items.length === 0;

  return (
    <div className="bg-cafe-surface border-t border-cafe-border p-5 space-y-4 select-none">
      {/* Price Details */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-sm font-sans font-medium text-cafe-text-secondary">
          <span>Subtotal</span>
          <span className="price text-cafe-text-primary">{formatINR(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-sans font-medium text-cafe-text-secondary">
          <span>Tax (avg)</span>
          <span className="price text-cafe-text-primary">{formatINR(taxAmount)}</span>
        </div>
        
        <Separator className="bg-cafe-border" />

        <div className="flex justify-between items-center font-display font-bold text-base text-cafe-accent">
          <span>Total</span>
          <span className="price text-[17px]">{formatINR(total)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onCheckout}
          disabled={isEmpty}
          className="w-full h-12 bg-cafe-accent hover:bg-[#e09820] text-cafe-bg font-display font-bold text-[15px] rounded-lg transition-colors flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Clear Order confirmation using Alert Dialog */}
        {!isEmpty && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full text-center font-sans font-normal text-sm text-cafe-danger hover:underline cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cafe-danger rounded mt-1">
                Clear Order
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-cafe-surface-raised border border-cafe-border text-cafe-text-primary">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-display text-lg">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-cafe-text-secondary text-sm">
                  This action cannot be undone. This will remove all items from your current order cart.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2">
                <AlertDialogCancel className="bg-cafe-surface border-cafe-border text-cafe-text-secondary hover:bg-cafe-surface-raised hover:text-cafe-text-primary cursor-pointer rounded-lg">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearCart}
                  className="bg-cafe-danger hover:bg-cafe-danger/90 text-white cursor-pointer rounded-lg font-semibold"
                >
                  Clear Order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
export default CartSummary;
