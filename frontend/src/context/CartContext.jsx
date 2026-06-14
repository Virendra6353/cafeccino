import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [linkedCustomer, setLinkedCustomer] = useState(null);

  const addItem = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setLinkedCustomer(null);
  };

  const applyCoupon = (newCoupon) => {
    setCoupon(newCoupon);
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const linkCustomer = (customer) => {
    setLinkedCustomer(customer);
  };

  const unlinkCustomer = () => {
    setLinkedCustomer(null);
  };

  // Derive values using useMemo
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const taxAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const itemTax = item.product.price * item.quantity * (item.product.tax / 100);
      return sum + itemTax;
    }, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === 'percentage') {
      return (subtotal * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
      return coupon.value;
    }
    return 0;
  }, [coupon, subtotal]);

  const total = useMemo(() => {
    const calculated = subtotal + taxAmount - discountAmount;
    return calculated < 0 ? 0 : calculated;
  }, [subtotal, taxAmount, discountAmount]);

  return (
    <CartContext.Provider
      value={{
        items,
        coupon,
        linkedCustomer,
        subtotal,
        taxAmount,
        discountAmount,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        linkCustomer,
        unlinkCustomer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
