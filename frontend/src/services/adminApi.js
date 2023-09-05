import { adminInstance } from '../axios/axiosInstance';

export const adminLogin = (values) => adminInstance.post('/login', { ...values });
export const adminSignup = (values) => adminInstance.post('/register', { ...values });
export const verifyOtp = (otp) => adminInstance.post('/verify', { otp });
export const adminAuth = () => adminInstance.get('/auth-admin');
export const fetchUsers = (page, limit, search, field, order) => adminInstance.get(`/users?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}`);
export const blockUser = (userId) => adminInstance.get(`/users/block-user/${userId}`);
export const fetchMovies = (page, limit, search, year, field, order, genreId) => adminInstance.get(`/movies?page=${page}&limit=${limit}&search=${search}&year=${year}&field=${field}&order=${order}&genre=${genreId}`);
export const addMovie = (movieId) => adminInstance.get(`/movies/add-movie/${movieId}`);
export const editMovie = (values) => adminInstance.post(`/movies/edit-movie/${values.id}`, { ...values });
export const fetchMovie = (movieId) => adminInstance.get(`/movies/view-movie/${movieId}`);
export const fetchGenres = (page, limit, search, field, order) => adminInstance.get(`/genres?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}`);
export const fetchActors = (page, limit, search, field, order, gender) => adminInstance.get(`/actors?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}&gender=${gender}`);
export const fetchCrews = (page, limit, search, field, order, gender) => adminInstance.get(`/crews?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}&gender=${gender}`);
export const fetchSeries = (page, limit, search, year, field, order, genreId) => adminInstance.get(`/series?page=${page}&limit=${limit}&search=${search}&year=${year}&field=${field}&order=${order}&genre=${genreId}`);
export const addShow = (showId) => adminInstance.get(`/series/add-series/${showId}`);
export const addSeason = (showId, seasonId, seasonNum) => adminInstance.get(`/series/add-season/${showId}?seasonId=${seasonId}&season=${seasonNum}`);
export const addEpisode = (showId, seasonId, episodeId, seasonNum, episodeNum) => adminInstance.get(`/series/add-episode/${showId}?seasonId=${seasonId}&season=${seasonNum}&episodeId=${episodeId}&episode=${episodeNum}`);
