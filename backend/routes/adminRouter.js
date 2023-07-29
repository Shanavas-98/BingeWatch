const express = require('express');
const router=express.Router();
const {dashboard, login, adminAuth, fetchUsers, blockUser}=require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');
const { fetchMovies, fetchMovie, editMovie, fetchGenres, fetchActors, fetchCrews, getMovieDetails } = require('../controllers/movieController');
const { fetchSeries, getShowDetails, getSeasonDetails, getEpisodeDetails } = require('../controllers/seriesController');
const pagination = require('../middlewares/pagination');
const movieModel = require('../models/movieModel');

router.get('/dashboard',authAdmin,dashboard);
router.post('/login',login);
router.get('/auth-admin',adminAuth);
router.get('/users',authAdmin,fetchUsers);
router.get('/users/block-user/:userId',authAdmin,blockUser);
router.get('/movies',authAdmin,pagination(movieModel),fetchMovies);
router.get('/movies/add-movie/:movieId',authAdmin,getMovieDetails);
router.get('/movies/view-movie/:movieId',authAdmin,fetchMovie);
router.post('/movies/edit-movie/:movieId',authAdmin,editMovie);
router.get('/genres',authAdmin,fetchGenres);
router.get('/actors',authAdmin,fetchActors);
router.get('/crews',authAdmin,fetchCrews);
router.get('/series',authAdmin,fetchSeries);
router.get('/series/add-series/:showId',authAdmin,getShowDetails);
router.get('/series/add-season/:showId',authAdmin,getSeasonDetails);
router.get('/series/add-episode/:showId',authAdmin,getEpisodeDetails);


module.exports = router;