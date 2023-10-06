/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  ADMIN_URL, MOVIE_URL, SEARCH_MOVIE_URL, SEARCH_SHOW_URL, SHOW_URL, TMDB_URL, USER_URL,
} from './apiUrls';
// import { getAdminToken, getUserToken } from './constants';

const TMDB_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

const userInstance = axios.create({
  baseURL: USER_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define a request interceptor to add the authorization token
userInstance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData?.token) {
      config.headers.Authorization = `Bearer ${userData?.token}`;
    }
    console.log('interceptor config', config);
    return config;
  },
  (error) => {
    console.log('interceptor error', error);
    Promise.reject(error);
  },
);

const adminInstance = axios.create({
  baseURL: ADMIN_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define a request interceptor to add the authorization token
adminInstance.interceptors.request.use(
  (config) => {
    const adminData = JSON.parse(localStorage.getItem('adminInfo'));
    if (adminData?.token) {
      config.headers.Authorization = `Bearer ${adminData?.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const tmdbInstance = axios.create({
  baseURL: TMDB_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

const movieInstance = axios.create({
  baseURL: MOVIE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

const searchMovieInstance = axios.create({
  baseURL: `${SEARCH_MOVIE_URL}?api_key=${TMDB_KEY}&include_adult=false&language=en-US`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

const showInstance = axios.create({
  baseURL: SHOW_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

const searchShowInstance = axios.create({
  baseURL: `${SEARCH_SHOW_URL}?api_key=${TMDB_KEY}&include_adult=false&language=en-US`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

export {
  userInstance, adminInstance, tmdbInstance, movieInstance,
  searchMovieInstance, showInstance, searchShowInstance,
};
