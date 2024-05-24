import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/common';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL: 'https://honglinhhatinhfc.monoinfinity.net/',

  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;