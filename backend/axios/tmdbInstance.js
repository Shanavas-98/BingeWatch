/* eslint-disable no-undef */
const axios = require('axios');
const { tmdbUrl } = require('./tmdbUrls');
const tmdbToken = process.env.TMDB_ACCESS_TOKEN;

module.exports = axios.create({
    baseURL: tmdbUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tmdbToken}`,
    },
});