import React, { createContext, useState, useContext, useCallback } from 'react';
import { apiService } from '../services/api';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 0,
    per_page: 6,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await apiService.getUsers(page);
      setUsers(response.data);
      setPagination({
        page: response.page,
        total_pages: response.total_pages,
        per_page: response.per_page,
        total: response.total
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const updatedUser = await apiService.updateUser(id, userData);
      setUsers(prev => 
        prev.map(user => 
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      await apiService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      pagination, 
      loading, 
      error,
      fetchUsers,
      updateUser,
      deleteUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};