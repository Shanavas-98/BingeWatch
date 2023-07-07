const express = require('express');
const router=express.Router();
const {register, home, verifyOtp, login, userAuth}=require('../controllers/userController');
const { fetchMovies }=require('../controllers/movieController');

router.get('/',home);
router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.get('/auth-user',userAuth);
router.get('/movies',fetchMovies);

module.exports = router;