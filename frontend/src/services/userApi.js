/* eslint-disable max-len */
import { userInstance } from '../axios/axiosInstance';

export const userLogin = (values) => userInstance.post('/login', { ...values });
export const userSignup = (values) => userInstance.post('/register', { ...values });
export const verifyOtp = (otp) => userInstance.post('/verifyOtp', { otp });
export const userAuth = () => userInstance.get('/auth-user');
export const fetchGenreMovies = (genreName) => userInstance.get(`/movies/${genreName}`);
export const fetchMovie = (movieId) => userInstance.get(`/movies/view-movie/${movieId}`);
export const addRating = (value, movieId) => userInstance.get(`/movies/view-movie/add-rating/${movieId}?rating=${value}`);
export const addToWatchlist = (movieId) => userInstance.get(`/movies/view-movie/add-watchlist/${movieId}`);
export const fetchReview = (movieId) => userInstance.get(`/movies/view-movie/get-review/${movieId}`);
export const addReview = (movieId, review) => userInstance.post(`/movies/view-movie/add-review/${movieId}`, { review });
export const fetchActor = (actorId) => userInstance.get(`/movies/view-movie/actor/${actorId}`);
export const fetchCrew = (crewId) => userInstance.get(`/movies/view-movie/crew/${crewId}`);
export const fetchUserReviews = (movieId) => userInstance.get(`/movies/view-movie/reviews/${movieId}`);
export const fetchRelatedMovies = (movieId) => userInstance.get(`/movies/view-movie/related-movies/${movieId}`);
export const fetchGenreSeries = (genreName) => userInstance.get(`/series/${genreName}`);
export const fetchSeries = (showId) => userInstance.get(`/series/view-series/${showId}`);
export const fetchSeason = (seasonId) => userInstance.get(`/series/view-season/${seasonId}`);
export const fetchEpisode = (episodeId) => userInstance.get(`/series/view-episode/${episodeId}`);
