/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  ADMIN_URL, MOVIE_URL, SEARCH_MOVIE_URL, SEARCH_SHOW_URL, SHOW_URL, TMDB_URL, USER_URL,
} from './apiUrls';
// import { getAdminToken, getUserToken } from './constants';

const USER_DATA = JSON.parse(localStorage.getItem('userInfo'));
console.log('user data', USER_DATA, typeof (USER_DATA));
const ADMIN_DATA = JSON.parse(localStorage.getItem('adminInfo'));
console.log('admin data', ADMIN_DATA, typeof (ADMIN_DATA));
const TMDB_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

const userInstance = axios.create({
  baseURL: USER_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: USER_DATA?.token ? `Bearer ${USER_DATA?.token}` : undefined,
  },
});

const adminInstance = axios.create({
  baseURL: ADMIN_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: ADMIN_DATA?.token ? `Bearer ${ADMIN_DATA?.token}` : undefined,
  },
});

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
