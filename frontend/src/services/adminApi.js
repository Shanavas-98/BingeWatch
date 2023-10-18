import { adminInstance } from '../axios/axiosInstance';

// export const adminSignup = (values) => adminInstance.post('/register', { ...values });
// export const verifyOtp = (otp) => adminInstance.post('/verify', { otp });
// export const adminAuth = () => adminInstance.get('/auth-admin');
export const adminLogin = (values) => adminInstance.post('/login', { ...values });

export const fetchUsers = (page, limit, search, field, order) => adminInstance.get(`/users?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}`);
export const blockUser = (userId) => adminInstance.patch(`/users/block-user/${userId}`);
export const getUserGrowth = () => adminInstance.get('/users/growth');
export const fetchUserCounts = () => adminInstance.get('/users/counts');
export const fetchMonthlyUsers = () => adminInstance.get('/users/monthly');
export const getMovieGrowth = () => adminInstance.get('/movies/growth');
export const fetchMonthlyMovies = () => adminInstance.get('/movies/monthly');
export const getShowGrowth = () => adminInstance.get('/shows/growth');
export const fetchMonthlyShows = () => adminInstance.get('/shows/monthly');

export const addMovie = (movieId) => adminInstance.post(`/movie/add/${movieId}`);
export const fetchMovie = (movieId) => adminInstance.get(`/movie/view/${movieId}`);
export const editMovie = (values) => adminInstance.put(`/movie/edit/${values.id}`, { ...values });
export const fetchMovies = (page, limit, search, year, field, order, genreId) => adminInstance.get(`/movies?page=${page}&limit=${limit}&search=${search}&year=${year}&field=${field}&order=${order}&genre=${genreId}`);

export const addShow = (showId) => adminInstance.post(`/show/add/${showId}`);
export const fetchShow = (showId) => adminInstance.get(`/show/view/${showId}`);
export const editShow = (values) => adminInstance.put(`/show/edit/${values.id}`, { ...values });
export const fetchSeries = (page, limit, search, year, field, order, genreId) => adminInstance.get(`/series?page=${page}&limit=${limit}&search=${search}&year=${year}&field=${field}&order=${order}&genre=${genreId}`);

export const addSeason = (showId, seasonId, seasonNum) => adminInstance.post(`/season/add/${showId}?seasonId=${seasonId}&season=${seasonNum}`);
export const fetchSeason = (seasonId) => adminInstance.get(`/season/view/${seasonId}`);
export const editSeason = (values) => adminInstance.put(`/season/edit/${values.id}`, { ...values });

export const addEpisode = (showId, seasonId, episodeId, seasonNum, episodeNum) => adminInstance.post(`/episode/add/${showId}?seasonId=${seasonId}&season=${seasonNum}&episodeId=${episodeId}&episode=${episodeNum}`);
export const fetchEpisode = (episodeId) => adminInstance.get(`/episode/view/${episodeId}`);
export const editEpisode = (values) => adminInstance.put(`/episode/edit/${values.id}`, { ...values });

export const fetchGenres = (page, limit, search, field, order) => adminInstance.get(`/genres?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}`);
export const editGenre = (values) => adminInstance.patch(`/genre/edit/${values.id}`, { ...values });

export const fetchActors = (page, limit, search, field, order, gender) => adminInstance.get(`/actors?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}&gender=${gender}`);
export const fetchActor = (actorId) => adminInstance.get(`/actor/view/${actorId}`);
export const editActor = (values) => adminInstance.put(`/actor/edit/${values.id}`, { ...values });

export const fetchCrews = (page, limit, search, field, order, gender) => adminInstance.get(`/crews?page=${page}&limit=${limit}&search=${search}&field=${field}&order=${order}&gender=${gender}`);
export const fetchCrew = (actorId) => adminInstance.get(`/crew/view/${actorId}`);
export const editCrew = (values) => adminInstance.put(`/crew/edit/${values.id}`, { ...values });
