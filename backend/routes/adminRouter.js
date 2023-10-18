const express = require('express');
const router=express.Router();
const authAdmin = require('../middlewares/authAdmin');
const {
    login,
    fetchUsers, 
    blockUser,
    getUserCounts,
    getUserGrowth,
    getUsersOfYear
}=require('../controllers/adminController');
const { 
    fetchMovies, 
    fetchMovie, 
    editMovie, 
    fetchGenres, 
    fetchActors, 
    fetchCrews, 
    getMovieDetails, 
    editGenre,
    fetchActor,
    editActor,
    fetchCrew,
    editCrew,
    getMoviesGrowth,
    getMoviesOfYear
} = require('../controllers/movieController');
const { 
    fetchSeries, 
    getShowDetails, 
    getSeasonDetails, 
    getEpisodeDetails, 
    fetchShow,
    editShow,
    fetchSeason,
    editSeason,
    fetchEpisode,
    editEpisode,
    getShowsGrowth,
    getShowsOfYear
} = require('../controllers/seriesController');

// router.post('/register',register);
// router.get('/auth-admin',adminAuth);
router.post('/login',login);

router.get('/users',authAdmin,fetchUsers);
router.patch('/users/block-user/:userId',authAdmin,blockUser);
router.get('/users/growth',authAdmin,getUserGrowth);
router.get('/users/counts',authAdmin,getUserCounts);
router.get('/users/monthly',authAdmin,getUsersOfYear);
router.get('/movies/growth',authAdmin,getMoviesGrowth);
router.get('/movies/monthly',authAdmin,getMoviesOfYear);
router.get('/shows/growth',authAdmin,getShowsGrowth);
router.get('/shows/monthly',authAdmin,getShowsOfYear);

router.get('/movies',authAdmin,fetchMovies);
router.post('/movie/add/:movieId',authAdmin,getMovieDetails);
router.get('/movie/view/:movieId',authAdmin,fetchMovie);
router.put('/movie/edit/:movieId',authAdmin,editMovie);

router.get('/series',authAdmin,fetchSeries);
router.post('/show/add/:showId',authAdmin,getShowDetails);
router.get('/show/view/:showId',authAdmin,fetchShow);
router.put('/show/edit/:showId',authAdmin,editShow);

router.post('/season/add/:showId',authAdmin,getSeasonDetails);
router.get('/season/view/:seasonId',authAdmin,fetchSeason);
router.put('/season/edit/:seasonId',authAdmin,editSeason);

router.post('/episode/add/:showId',authAdmin,getEpisodeDetails);
router.get('/episode/view/:episodeId',authAdmin,fetchEpisode);
router.put('/episode/edit/:episodeId',authAdmin,editEpisode);

router.get('/genres',authAdmin,fetchGenres);
router.patch('/genre/edit/:genreId',authAdmin,editGenre);

router.get('/actors',authAdmin,fetchActors);
router.get('/actor/view/:actorId',authAdmin,fetchActor);
router.put('/actor/edit/:actorId',authAdmin,editActor);

router.get('/crews',authAdmin,fetchCrews);
router.get('/crew/view/:crewId',authAdmin,fetchCrew);
router.put('/crew/edit/:crewId',authAdmin,editCrew);

module.exports = router;