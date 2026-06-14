import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('odoo_cafe_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    if (password && password.length >= 6) {
      const isAdmin = email.toLowerCase().includes('admin');
      const mockUser = {
        name: isAdmin ? 'Admin User' : 'Rohan Mehta',
        email: email,
        role: isAdmin ? 'admin' : 'cashier',
        avatar: isAdmin ? 'AD' : 'RM',
      };
      setUser(mockUser);
      localStorage.setItem('odoo_cafe_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('odoo_cafe_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
