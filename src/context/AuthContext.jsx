import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await apiService.login(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser({ email });
        navigate('/users');
        setError(null);
      }
    } catch (err) {
      setError(err.error || 'Login failed');
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (token) {
      // Optional: Add token validation logic here
      setUser({ email: 'user@example.com' });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      error 
    }}>
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