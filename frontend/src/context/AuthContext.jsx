import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, getStoredUser, getStoredToken, logout as logoutService } from '../services/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = getStoredToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const userData = await getMe();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch {
        setUser(null);
        logoutService();
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const loginSuccess = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginSuccess, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
