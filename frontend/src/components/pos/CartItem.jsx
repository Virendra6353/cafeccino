import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../data/dummyData';
import { formatINR } from '../../lib/utils';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity } = item;

  // Find category color and name
  const category = CATEGORIES.find((c) => c.id === product.category);
  const catColor = category ? category.color : '#9A9590';
  const catName = category ? category.name : 'Unknown';

  const lineTotal = product.price * quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex items-center justify-between py-4 border-b border-cafe-border gap-4 select-none"
    >
      {/* Left section: Name and Category */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-semibold text-sm text-cafe-text-primary truncate">
          {product.name}
        </h4>
        <span
          className="font-sans font-normal text-[11px] uppercase tracking-wider block mt-0.5"
          style={{ color: catColor }}
        >
          {catName}
        </span>
      </div>

      {/* Center section: Stepper controls */}
      <div className="flex items-center bg-cafe-accent-dim border border-cafe-accent text-cafe-accent rounded-lg p-0.5 shrink-0">
        <button
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          className="flex items-center justify-center w-6 h-6 hover:bg-cafe-accent/20 rounded transition-colors focus:outline-none"
          aria-label="Decrease quantity"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="price text-[13px] font-semibold mx-1.5 min-w-[14px] text-center">
          {quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="flex items-center justify-center w-6 h-6 hover:bg-cafe-accent/20 rounded transition-colors focus:outline-none"
          aria-label="Increase quantity"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right section: Price & Delete */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="price text-sm font-medium text-cafe-accent min-w-[64px] text-right">
          {formatINR(lineTotal)}
        </span>
        <button
          onClick={() => onRemove(product.id)}
          className="flex items-center justify-center p-1.5 text-cafe-text-secondary hover:text-cafe-danger hover:bg-cafe-danger/10 rounded-md transition-all focus:outline-none"
          aria-label={`Remove ${product.name} from cart`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};
export default CartItem;
