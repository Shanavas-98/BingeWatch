/* eslint-disable no-undef */
const axios = require('axios');
const { TMDB_URL, MOVIE_URL, SEARCH_PERSON_URL, PERSON_URL } = require('./tmdbUrls');
const TMDB_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_KEY = process.env.TMDB_KEY;

const tmdbInstance = axios.create({
    baseURL: TMDB_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`,
    }
});

const movieInstance = axios.create({
    baseURL: MOVIE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`,
    }
});

const personInstance = axios.create({
    baseURL: PERSON_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`,
    }
});

const searchPersonInstance = axios.create({
    baseURL: `${SEARCH_PERSON_URL}?api_key=${TMDB_KEY}&include_adult=false&language=en-US`,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`,
    }
});

module.exports = { tmdbInstance, movieInstance, personInstance, searchPersonInstance };