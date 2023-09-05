const USER_URL = process.env.REACT_APP_SERVER_URL;
const ADMIN_URL = `${process.env.REACT_APP_SERVER_URL}/admin`;
const TMDB_URL = 'https://api.themoviedb.org/3';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie';
const SHOW_URL = 'https://api.themoviedb.org/3/tv';
const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie';
const SEARCH_SHOW_URL = 'https://api.themoviedb.org/3/search/tv';

const IMG_URL = 'https://image.tmdb.org/t/p/original';
const YT_IMG_URL = 'https://img.youtube.com/vi';
const AVATAR = 'https://www.clipartmax.com/png/small/97-978328_avatar-icon-free-fa-user-circle-o.png';

// search `?api_key=${TMDB_KEY}&include_adult=false&page=1&query=`;

// const TRENDING_URL = `/trending/all/day?api_key=${TMDB_KEY}&language=en-US`;

export {
  USER_URL, ADMIN_URL, TMDB_URL, IMG_URL,
  SEARCH_MOVIE_URL, MOVIE_URL, SHOW_URL,
  SEARCH_SHOW_URL, YT_IMG_URL, AVATAR,
};

// ?query=money&first_air_date_year=2015&include_adult=false&page=1';
