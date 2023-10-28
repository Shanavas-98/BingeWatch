const express = require('express');
const router=express.Router();
const authUser = require('../middlewares/authUser');
const { 
    register, 
    verifyOtpSend, 
    login, 
    userAuth, 
    fetchUserWatchlist, 
    fetchUserDetails, 
    updateAvatar, 
    addFriend,
    resendOtp, 
    forgotPassword,
    getRequests,
    cancelFriend,
    acceptFriend,
    rejectFriend,
    allFriends,
    unfriend,
    verifyEmail,
    updateName,
    updateEmail,
    updateMobile,
    resendLink,
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
router.post('/resend-otp',resendOtp);
router.post('/resend-link',authUser,resendLink);
router.post('/verify-otp',verifyOtpSend);
router.get('/verify-email/:token',verifyEmail);
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
router.get('/friends',authUser,allFriends);
router.patch('/unfriend/:friendId',authUser,unfriend);
router.patch('/update-picture',authUser,uploadImage,updateAvatar);
router.patch('/update-name',authUser,updateName);
router.patch('/update-email',authUser,updateEmail);
router.patch('/update-mobile',authUser,updateMobile);
router.post('/add-friend/:friendId',authUser,addFriend);
router.get('/friend-requests',authUser,getRequests);
router.put('/friend-requests/cancel/:reqId',authUser,cancelFriend);
router.patch('/friend-requests/accept/:reqId',authUser,acceptFriend);
router.patch('/friend-requests/reject/:reqId',authUser,rejectFriend);


module.exports = router;
