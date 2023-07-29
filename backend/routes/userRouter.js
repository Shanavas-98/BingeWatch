const express = require('express');
const router=express.Router();
const authUser = require('../middlewares/authUser');
const {register, home, verifyOtp, login, userAuth}=require('../controllers/userController');
const { fetchMovies, fetchGenreMovies, fetchMovieDetails, addRating, fetchReview, addReview, fetchActorDetails, fetchCrewDetails, fetchUserReviews, fetchRelatedMovies }=require('../controllers/movieController');
const { fetchGenreSeries, fetchSeriesDetails } = require('../controllers/seriesController');

router.get('/',home);
router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.get('/auth-user',userAuth);
router.get('/movies',fetchMovies);
router.get('/movies/:genreName',fetchGenreMovies);
router.get('/movies/view-movie/:movieId',fetchMovieDetails);
router.get('/movies/view-movie/add-rating/:movieId',authUser,addRating);
router.get('/movies/view-movie/get-review/:movieId',authUser,fetchReview);
router.post('/movies/view-movie/add-review/:movieId',authUser,addReview);
router.get('/movies/view-movie/actor/:actorId',fetchActorDetails);
router.get('/movies/view-movie/crew/:crewId',fetchCrewDetails);
router.get('/movies/view-movie/reviews/:movieId',authUser,fetchUserReviews);
router.get('/movies/view-movie/related-movies/:movieId',authUser,fetchRelatedMovies);
router.get('/series/:genreName',fetchGenreSeries);
router.get('/series/view-series/:showId',fetchSeriesDetails);



module.exports = router;
