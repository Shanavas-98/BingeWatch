const express = require('express');
const router=express.Router();
const {dashboard, login, adminAuth, fetchUsers, blockUser}=require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');
const { fetchMovies, fetchMovie, editMovie, fetchGenres, fetchActors, fetchCrews, getMovieDetails } = require('../controllers/movieController');

router.get('/dashboard',authAdmin,dashboard);
router.post('/login',login);
router.get('/auth-admin',adminAuth);
router.get('/users',authAdmin,fetchUsers);
router.get('/users/block-user/:userId',authAdmin,blockUser);
router.get('/movies',authAdmin,fetchMovies);
router.get('/movies/add-movie/:movieId',authAdmin,getMovieDetails);
router.get('/movies/view-movie/:movieId',authAdmin,fetchMovie);
router.post('/movies/edit-movie/:movieId',authAdmin,editMovie);
router.get('/genres',authAdmin,fetchGenres);
router.get('/actors',authAdmin,fetchActors);
router.get('/crews',authAdmin,fetchCrews);


module.exports = router;