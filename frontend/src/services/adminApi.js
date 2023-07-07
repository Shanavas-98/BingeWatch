import { adminInstance } from '../axios/axiosInstance';

export const adminLogin = (values) => adminInstance.post('/login', { ...values });
export const adminSignup = (values) => adminInstance.post('/register', { ...values });
export const verifyOtp = (otp) => adminInstance.post('/verify', { otp });
export const adminAuth = () => adminInstance.get('/auth-admin');
export const fetchUsers = () => adminInstance.get('/users');
export const blockUser = (userId) => adminInstance.get(`/users/block-user/${userId}`);
export const fetchMovies = () => adminInstance.get('/movies');
export const addMovie = (movieId) => adminInstance.get(`/movies/add-movie/${movieId}`);
export const editMovie = (values) => adminInstance.post(`/movies/edit-movie/${values.id}`, { ...values });
export const fetchMovie = (movieId) => adminInstance.get(`/movies/view-movie/${movieId}`);
export const fetchGenres = () => adminInstance.get('/genres');
export const fetchActors = () => adminInstance.get('/actors');
export const fetchCrews = () => adminInstance.get('/crews');
