/* eslint-disable no-undef */
const axios = require('axios');
const { tmdbUrl, movieUrl } = require('./tmdbUrls');
const tmdbToken = process.env.TMDB_ACCESS_TOKEN;

const tmdbInstance = axios.create({
    baseURL: tmdbUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tmdbToken}`,
    }
});

const movieInstance = axios.create({
    baseURL: movieUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tmdbToken}`,
    }
});

module.exports = {tmdbInstance, movieInstance};