import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PaymentPage from './pages/PaymentPage';
import { Toaster } from './components/ui/toaster';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Navigation redirects to login page by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Authentication page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Main POS selection dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Customer billing checkout page */}
        <Route path="/payment" element={<PaymentPage />} />

        {/* Fallback navigation guard */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AnimatedRoutes />
          {/* Toast notifications alert center */}
          <Toaster />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
