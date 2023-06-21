/* eslint-disable linebreak-style */
import axios from 'axios';
import { adminUrl, tmdbUrl, userUrl } from './apiUrls';

const userToken = localStorage.getItem('userJwt');
const adminToken = localStorage.getItem('adminJwt');
const tmdbToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const userInstance = axios.create({
  baseURL: userUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
});

const adminInstance = axios.create({
  baseURL: adminUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${adminToken}`,
  },
});

const tmdbInstance = axios.create({
  baseURL: tmdbUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tmdbToken}`,
  },
});

export { userInstance, adminInstance, tmdbInstance };
