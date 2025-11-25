// Hooks/useAxiosSecure.js
import axios from 'axios';

export default function useAxiosSecure() {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
}