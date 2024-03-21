import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../constants/common';
import { handleLoggout, isTokenExpired } from '../utils/helpers';
let reTry = false;

const api = axios.create({
  baseURL: 'http://localhost:8080/',
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
api.interceptors.response.use(
  (res) => {
    reTry = false;
    return res;
  },
  (error) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.token)
    if(error.response && error.response.status === 401 && !reTry && token && isTokenExpired(token)){
      reTry = true;
    handleLoggout();
    window.location.href = "/"
    } 
    return Promise.reject(error);
  }
);

export default api;