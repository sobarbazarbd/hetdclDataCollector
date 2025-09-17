import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hetdcldatacollector-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // Temporarily false to test CORS
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Success:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const contractorsAPI = {
  getAll: () => api.get('/contractors'),
  create: (data: any) => api.post('/contractors', data),
  update: (id: string, data: any) => api.put(`/contractors/${id}`, data),
  delete: (id: string) => api.delete(`/contractors/${id}`),
};

export const suppliersAPI = {
  getAll: () => api.get('/suppliers'),
  create: (data: any) => api.post('/suppliers', data),
  update: (id: string, data: any) => api.put(`/suppliers/${id}`, data),
  delete: (id: string) => api.delete(`/suppliers/${id}`),
};

export default api;