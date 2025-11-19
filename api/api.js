'use client'

import axios from "axios";


// instance أساسي
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// interceptor لإضافة توكن JWT تلقائياً
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) config.headers = {}; 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
