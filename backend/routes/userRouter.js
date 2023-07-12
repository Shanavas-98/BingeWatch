const express = require('express');
const router=express.Router();
const authUser = require('../middlewares/authUser');
const {register, home, verifyOtp, login, userAuth}=require('../controllers/userController');
const { fetchMovies, fetchGenreMovies, fetchMovieDetails, movieRating, fetchRating }=require('../controllers/movieController');

router.get('/',home);
router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.get('/auth-user',userAuth);
router.get('/movies',fetchMovies);
router.get('/movies/:genreName',fetchGenreMovies);
router.get('/movies/view-movie/:movieId',fetchMovieDetails);
router.get('/movies/view-movie/set-rating/:movieId',authUser,movieRating);
router.get('/movies/view-movie/get-rating/:movieId',authUser,fetchRating);

module.exports = router;