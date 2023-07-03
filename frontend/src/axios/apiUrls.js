/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const userUrl = process.env.REACT_APP_SERVER_URL;
const adminUrl = `${process.env.REACT_APP_SERVER_URL}/admin`;
const tmdbUrl = 'https://api.themoviedb.org/3';
const movieUrl = 'https://api.themoviedb.org/3/movie';
const tmdbKey = process.env.REACT_APP_TMDB_KEY;
const imgUrl = 'https://image.tmdb.org/t/p/original';

const searchUrl = `/search/movie?api_key=${tmdbKey}&include_adult=false&language=en-US&page=1&query=`;

const trendingUrl = `/trending/all/day?api_key=${tmdbKey}&language=en-US`;

export {
  userUrl, adminUrl, tmdbUrl, trendingUrl, imgUrl, searchUrl, movieUrl,
};
