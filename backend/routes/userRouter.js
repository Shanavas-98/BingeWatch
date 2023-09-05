const express = require('express');
const router=express.Router();
const authUser = require('../middlewares/authUser');
const {register, home, verifyOtp, login, userAuth, fetchUserWatchlist, fetchUserDetails, updateProfile, updateAvatar, addFriend, allUsers}=require('../controllers/userController');
const { fetchMovies, fetchGenreMovies, fetchMovieDetails, addRating, fetchReview, addReview, fetchActorDetails, fetchCrewDetails, fetchAllReviews, fetchRelatedMovies, addToWatchlist }=require('../controllers/movieController');
const { fetchGenreSeries, fetchSeriesDetails, fetchSeasonDetails, fetchEpisodeDetails } = require('../controllers/seriesController');
const uploadImage = require('../utils/imageUpload');

router.get('/',home);
router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.get('/auth-user',userAuth);
router.get('/movies',fetchMovies);
router.get('/movies/:genreName',fetchGenreMovies);
router.get('/movies/view-movie/:movieId',fetchMovieDetails);
router.get('/content/add-rating/:contentId',authUser,addRating);
router.get('/content/add-watchlist/:contentId',authUser,addToWatchlist);
router.get('/movies/view-movie/get-review/:movieId',authUser,fetchReview);
router.post('/content/add-review/:contentId',authUser,addReview);
router.get('/movies/view-movie/actor/:actorId',fetchActorDetails);
router.get('/movies/view-movie/crew/:crewId',fetchCrewDetails);
router.get('/content/reviews/:movieId',authUser,fetchAllReviews);
router.get('/movies/view-movie/related-movies/:movieId',authUser,fetchRelatedMovies);
router.get('/series/:genreName',fetchGenreSeries);
router.get('/series/view-series/:showId',fetchSeriesDetails);
router.get('/series/view-season/:seasonId',fetchSeasonDetails);
router.get('/series/view-episode/:episodeId',fetchEpisodeDetails);
router.get('/watchlist',authUser,fetchUserWatchlist);
router.get('/profile',authUser,fetchUserDetails);
router.get('/users',authUser,allUsers);
router.patch('/update-profile',authUser,updateProfile);
router.patch('/update-avatar',authUser,uploadImage,updateAvatar);
router.patch('/add-friend',authUser,addFriend);


module.exports = router;
