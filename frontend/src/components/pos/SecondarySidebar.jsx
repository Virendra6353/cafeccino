import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TakeOrderPanel from './secondary/TakeOrderPanel';
import OrderHistoryPanel from './secondary/OrderHistoryPanel';
import TableInfoPanel from './secondary/TableInfoPanel';
import CustomersPanel from './secondary/CustomersPanel';

export const SecondarySidebar = ({
  activeNav,
  activeCategory,
  setActiveCategory,
  selectedOrderId,
  setSelectedOrderId,
  activeFloorId,
  setActiveFloorId,
}) => {
  return (
    <aside className="hidden md:block w-[220px] h-[calc(100vh-64px)] border-r border-cafe-border bg-cafe-surface shrink-0 select-none overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNav}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="h-full w-full"
        >
          {activeNav === 'take-order' && (
            <TakeOrderPanel
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}

          {activeNav === 'order-history' && (
            <OrderHistoryPanel
              selectedOrderId={selectedOrderId}
              setSelectedOrderId={setSelectedOrderId}
            />
          )}

          {activeNav === 'customers' && (
            <CustomersPanel />
          )}

          {activeNav === 'table-info' && (
            <TableInfoPanel
              activeFloorId={activeFloorId}
              setActiveFloorId={setActiveFloorId}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </aside>
  );
};
export default SecondarySidebar;
