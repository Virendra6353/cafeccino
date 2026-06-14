import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import TopNav from '../components/pos/TopNav';
import CategoryTabs from '../components/pos/CategoryTabs';
import ProductGrid from '../components/pos/ProductGrid';
import CartSidebar from '../components/pos/CartSidebar';

import PrimarySidebar from '../components/pos/PrimarySidebar';
import SecondarySidebar from '../components/pos/SecondarySidebar';
import OrdersView from './OrdersView';
import TableInfoView from './TableInfoView';
import CustomersView from './CustomersView';

export const DashboardPage = () => {
  const navigate = useNavigate();
  
  // Navigation and contextual selections state
  const [activeNav, setActiveNav] = useState('take-order'); // 'take-order' | 'order-history' | 'table-info'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [activeFloorId, setActiveFloorId] = useState('f1');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/payment');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col bg-cafe-bg select-none"
    >
      {/* Top sticky navigation (Search applies on Take Order view) */}
      <TopNav
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showBack={false}
      />

      {/* Main layout container (Dual sidebars + Content grid area) */}
      <div className="flex-1 flex h-[calc(100vh-64px)] flex-col md:flex-row overflow-hidden relative">
        {/* Column 1: Primary Sidebar Navigation */}
        <PrimarySidebar
          activeNav={activeNav}
          setActiveNav={(nav) => {
            setActiveNav(nav);
            // Reset searches or detail popups on navigation switch
            setSelectedOrderId(null);
          }}
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Column 2: Context-aware Secondary Sidebar (Desktop only) */}
        {activeNav === 'take-order' && (
          <SecondarySidebar
            activeNav={activeNav}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            selectedOrderId={selectedOrderId}
            setSelectedOrderId={setSelectedOrderId}
            activeFloorId={activeFloorId}
            setActiveFloorId={setActiveFloorId}
          />
        )}

        {/* Column 3: Scrollable Content viewports */}
        <main className="flex-1 overflow-y-auto bg-cafe-bg p-6 pb-[80px] md:pb-6 relative">
          <AnimatePresence mode="wait">
            {activeNav === 'take-order' && (
              <motion.div
                key="take-order"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full w-full flex flex-col"
              >
                {/* Mobile horizontal category pills list (hidden on desktop) */}
                <div className="block md:hidden -mx-6 -mt-6 mb-4">
                  <CategoryTabs
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                </div>

                {/* Product listing grid */}
                <ProductGrid
                  activeCategory={activeCategory}
                  searchQuery={searchQuery}
                />
              </motion.div>
            )}

            {activeNav === 'order-history' && (
              <motion.div
                key="order-history"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <OrdersView
                  selectedOrderId={selectedOrderId}
                  setSelectedOrderId={setSelectedOrderId}
                />
              </motion.div>
            )}

            {activeNav === 'customers' && (
              <motion.div
                key="customers"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <CustomersView />
              </motion.div>
            )}

            {activeNav === 'table-info' && (
              <motion.div
                key="table-info"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="h-full w-full"
              >
                <TableInfoView
                  activeFloorId={activeFloorId}
                  setActiveFloorId={setActiveFloorId}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Shopping cart slide-out drawer (Sheet) */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </motion.div>
  );
};

export default DashboardPage;
