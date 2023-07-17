const USER_URL = process.env.REACT_APP_SERVER_URL;
const ADMIN_URL = `${process.env.REACT_APP_SERVER_URL}/admin`;
const TMDB_URL = 'https://api.themoviedb.org/3';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie';
const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

// search `?api_key=${TMDB_KEY}&include_adult=false&page=1&query=`;

// const TRENDING_URL = `/trending/all/day?api_key=${TMDB_KEY}&language=en-US`;

export {
  USER_URL, ADMIN_URL, TMDB_URL, IMG_URL, SEARCH_MOVIE_URL, MOVIE_URL,
};
