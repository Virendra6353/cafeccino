import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { CATEGORIES } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/utils';
import { Button } from '../ui/button';

export const ProductCard = ({ product }) => {
  const { items, addItem, updateQuantity } = useCart();

  // Find category color
  const category = CATEGORIES.find((c) => c.id === product.category);
  const catColor = category ? category.color : '#F0EDE8';

  // Check if item is in cart
  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(245,166,35,0.15)' }}
      transition={{ duration: 0.18 }}
      className="relative flex flex-col justify-between bg-cafe-surface border border-cafe-border rounded-xl pt-5 pb-4 px-4 h-full select-none"
    >
      {/* Top Accent Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ backgroundColor: catColor }}
      />

      {/* Main card info */}
      <div className="flex-1 flex flex-col mb-4">
        {/* Category Dot */}
        <div className="flex justify-end mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: catColor }}
            title={category ? category.name : ''}
          />
        </div>

        {/* Product Title */}
        <h3 className="font-display font-semibold text-sm text-cafe-text-primary line-clamp-2 min-h-[40px] leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-sans font-normal text-xs text-cafe-text-secondary line-clamp-2 mt-1.5 leading-normal flex-1">
          {product.description}
        </p>
      </div>

      {/* Pricing and Action */}
      <div className="space-y-3 mt-auto">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="price text-base font-medium text-cafe-accent">
            {formatINR(product.price)}
          </span>
          <span className="font-sans font-normal text-[11px] text-cafe-text-secondary uppercase tracking-wider">
            {product.unit}
          </span>
        </div>

        {/* Button or Quantity Selector */}
        {quantity > 0 ? (
          <div className="flex items-center justify-between w-full h-[34px] bg-cafe-accent-dim border border-cafe-accent text-cafe-accent rounded-lg overflow-hidden px-1">
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center w-7 h-7 hover:bg-cafe-accent/20 rounded transition-colors focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="price text-sm font-semibold mx-2 select-none min-w-[16px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-7 h-7 hover:bg-cafe-accent/20 rounded transition-colors focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <Button
            onClick={handleAdd}
            className="w-full h-[34px] bg-cafe-surface-raised border border-cafe-border hover:border-cafe-accent text-cafe-text-secondary hover:text-cafe-text-primary font-sans font-medium text-[13px] rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};
export default ProductCard;
