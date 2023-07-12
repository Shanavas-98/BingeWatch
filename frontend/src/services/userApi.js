/* eslint-disable max-len */
import { userInstance } from '../axios/axiosInstance';

export const userLogin = (values) => userInstance.post('/login', { ...values });
export const userSignup = (values) => userInstance.post('/register', { ...values });
export const verifyOtp = (otp) => userInstance.post('/verifyOtp', { otp });
export const userAuth = () => userInstance.get('/auth-user');
export const fetchGenreMovies = (genreName) => userInstance.get(`/movies/${genreName}`);
export const fetchMovieDetails = (movieId) => userInstance.get(`/movies/view-movie/${movieId}`);
export const movieRating = (value, movieId) => userInstance.get(`/movies/view-movie/set-rating/${movieId}?rating=${value}`);
export const fetchRating = (movieId) => userInstance.get(`/movies/view-movie/get-rating/${movieId}`);
export const addReview = (movieId, review) => userInstance.post(`/movies/view-movie/add-review/${movieId}`, { review });
