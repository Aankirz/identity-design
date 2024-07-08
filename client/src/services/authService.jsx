// src/services/authService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const register = (name, email, password) => {
  return axios.post(`${API_URL}/register`, { name, email, password });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

const loadUser = () => {
  return axios.get(`${API_URL}/user`);
};

const logout = () => {
  localStorage.removeItem('token');
  return Promise.resolve();
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const authService = {
  register,
  login,
  loadUser,
  logout,
  setAuthToken
};

export default authService;
