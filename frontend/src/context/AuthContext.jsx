import { createContext, useContext, useState } from 'react';
import apiClient from '../api/axiosInstance';
const AuthContext=createContext(null);
export const AuthProvider=({ children })=> {
  const [user, setUser]=useState(()=> {
    const storedUser=localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const persistSession=(token, authenticatedUser)=> {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(authenticatedUser));
    setUser(authenticatedUser);
  };
  const register=async (name, email, password)=> {
    const response=await apiClient.post('/auth/register', { name, email, password });
    persistSession(response.data.token, response.data.user);
  };
  const login=async (email, password)=> {
    const response=await apiClient.post('/auth/login', { email, password });
    persistSession(response.data.token, response.data.user);
  };
  const logout=()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth=()=> useContext(AuthContext);
