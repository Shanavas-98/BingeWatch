const express = require('express');
const router=express.Router();
const authUser = require('../middlewares/authUser');
const { 
    register, 
    verifyOtp, 
    login, 
    userAuth, 
    fetchUserWatchlist, 
    fetchUserDetails, 
    updateProfile, 
    updateAvatar, 
    addFriend, 
    allUsers, 
    resendOtp, 
    forgotPassword, 
    forgotOtp
}=require('../controllers/userController');
const { 
    fetchMovies, 
    fetchGenreMovies, 
    fetchMovieDetails, 
    addRating, 
    fetchReview, 
    addReview, 
    fetchActorDetails, 
    fetchCrewDetails, 
    fetchAllReviews, 
    fetchRelatedMovies, 
    addToWatchlist, 
    fetchContents, 
    getRandomGenres
}=require('../controllers/movieController');
const { 
    fetchGenreSeries, 
    fetchSeriesDetails, 
    fetchSeasonDetails, 
    fetchEpisodeDetails 
} = require('../controllers/seriesController');
const uploadImage = require('../utils/imageUpload');

router.post('/register',register);
router.get('/resend-otp',resendOtp);
router.post('/verify',verifyOtp);
router.post('/forgot-otp',forgotOtp);
router.post('/forgot',forgotPassword);
router.post('/login',login);
router.get('/auth-user',userAuth);
router.get('/search',fetchContents);
router.get('/movies',fetchMovies);
router.get('/genres',getRandomGenres);
router.get('/movies/:genreId',fetchGenreMovies);
router.get('/movie/:movieId',fetchMovieDetails);
router.get('/add-rating/:contentId',authUser,addRating);
router.get('/add-watchlist/:contentId',authUser,addToWatchlist);
router.get('/movie/get-review/:movieId',authUser,fetchReview);
router.post('/add-review/:contentId',authUser,addReview);
router.get('/actor/:actorId',fetchActorDetails);
router.get('/crew/:crewId',fetchCrewDetails);
router.get('/reviews/:movieId',authUser,fetchAllReviews);
router.get('/related-movies/:movieId',authUser,fetchRelatedMovies);
router.get('/series/:genreId',fetchGenreSeries);
router.get('/show/:showId',fetchSeriesDetails);
router.get('/season/:seasonId',fetchSeasonDetails);
router.get('/episode/:episodeId',fetchEpisodeDetails);
router.get('/watchlist',authUser,fetchUserWatchlist);
router.get('/profile',authUser,fetchUserDetails);
router.get('/users',authUser,allUsers);
router.patch('/update-profile',authUser,updateProfile);
router.patch('/update-avatar',authUser,uploadImage,updateAvatar);
router.patch('/add-friend',authUser,addFriend);


module.exports = router;
