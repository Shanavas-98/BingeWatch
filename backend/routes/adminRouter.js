const express = require('express');
const router=express.Router();
const {dashboard, login, addMovie, adminAuth}=require('../controllers/adminController');
const authAdmin = require('../middlewares/authAdmin');

router.get('/dashboard',authAdmin,dashboard);
router.post('/login',login);
router.get('/auth-admin',adminAuth);
router.post('/add-movie/:movieId',authAdmin,addMovie);

module.exports = router;