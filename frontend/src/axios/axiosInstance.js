/* eslint-disable linebreak-style */
import axios from 'axios';
import {
  ADMIN_URL, MOVIE_URL, SEARCH_MOVIE_URL, TMDB_URL, USER_URL,
} from './apiUrls';

const USER_TOKEN = localStorage.getItem('userJwt');
const ADMIN_TOKEN = localStorage.getItem('adminJwt');
const TMDB_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

const userInstance = axios.create({
  baseURL: USER_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${USER_TOKEN}`,
  },
});

const adminInstance = axios.create({
  baseURL: ADMIN_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_TOKEN}`,
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

export {
  userInstance, adminInstance, tmdbInstance, movieInstance, searchMovieInstance,
};
