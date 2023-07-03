const express = require('express');
const router=express.Router();
const {dashboard, login, adminAuth, fetchUsers, blockUser}=require('../controllers/adminController');
// const authAdmin = require('../middlewares/authAdmin');
const { getMovie, fetchMovies, fetchMovie } = require('../controllers/movieController');

router.get('/dashboard',dashboard);
router.post('/login',login);
router.get('/auth-admin',adminAuth);
router.get('/users',fetchUsers);
router.get('/users/block-user/:userId',blockUser);
router.get('/movies',fetchMovies);
router.get('/movies/add-movie/:movieId',getMovie);
router.get('/movies/view-movie/:movieId',fetchMovie);

module.exports = router;