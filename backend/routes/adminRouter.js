const express = require('express');
const router=express.Router();
const {dashboard, login, adminAuth, fetchUsers, blockUser}=require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');
const { fetchMovies, fetchMovie, editMovie, fetchGenres, fetchActors, fetchCrews, getMovieDetails } = require('../controllers/movieController');
const { fetchSeries, getShowDetails, getSeasonDetails, getEpisodeDetails } = require('../controllers/seriesController');

router.get('/dashboard',authAdmin,dashboard);
// router.post('/register',register);
router.post('/login',login);
router.get('/auth-admin',adminAuth);
router.get('/users',authAdmin,fetchUsers);
router.get('/users/block-user/:userId',authAdmin,blockUser);
router.get('/movies',authAdmin,fetchMovies);
router.get('/movie/add/:movieId',authAdmin,getMovieDetails);
router.get('/movie/view/:movieId',authAdmin,fetchMovie);
router.post('/movie/edit/:movieId',authAdmin,editMovie);
router.get('/genres',authAdmin,fetchGenres);
router.get('/actors',authAdmin,fetchActors);
router.get('/crews',authAdmin,fetchCrews);
router.get('/series',authAdmin,fetchSeries);
router.get('/series/add-show/:showId',authAdmin,getShowDetails);
router.get('/series/add-season/:showId',authAdmin,getSeasonDetails);
router.get('/series/add-episode/:showId',authAdmin,getEpisodeDetails);


module.exports = router;