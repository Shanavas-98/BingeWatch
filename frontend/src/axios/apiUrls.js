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

// url = " https://api.themoviedb.org/3/search/movie?api_key=468f03cf926f8de90194b9e77de68c92&query=Inception&include_adult=false&language=en-US&page=1 "
