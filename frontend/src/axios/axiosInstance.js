/* eslint-disable linebreak-style */
import axios from 'axios';
import { adminUrl, tmdbUrl, userUrl } from './apiUrls';

const userInstance = axios.create({
  baseURL: userUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// user instance request interceptor
userInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem('userJwt');
  request.headers.authorization = `Bearer ${token}`;
  return request;
});

const adminInstance = axios.create({
  baseURL: adminUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// admin instance request interceptor
adminInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem('adminJwt');
  request.headers.authorization = `Bearer ${token}`;
  return request;
});

const tmdbInstance = axios.create({
  baseURL: tmdbUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { userInstance, adminInstance, tmdbInstance };
