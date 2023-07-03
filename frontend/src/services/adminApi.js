import { adminInstance } from '../axios/axiosInstance';

export const adminLogin = (values) => adminInstance.post('/login', { ...values });
export const adminSignup = (values) => adminInstance.post('/register', { ...values });
export const verifyOtp = (otp) => adminInstance.post('/verify', { otp });
export const adminAuth = () => adminInstance.get('/auth-admin');
export const fetchUsers = () => adminInstance.get('/users');
export const blockUser = (userId) => adminInstance.get(`/users/block-user/${userId}`);
export const addMovie = (movieId) => adminInstance.get(`/movies/add-movie/${movieId}`);
export const editMovie = (movieId) => adminInstance.post(`/movies/add-movie/${movieId}`);
export const fetchMovie = (movieId) => adminInstance.get(`/movies/view-movie/${movieId}`);
export const fetchMovies = () => adminInstance.get('/movies');
