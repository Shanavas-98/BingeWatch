import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/user/HomePage';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Otp from '../components/Otp/Otp';
import MoviesPage from '../pages/user/MoviesPage';
import ViewMoviePage from '../pages/user/ViewMoviePage';
import ActorDetailsPage from '../pages/user/ActorDetailsPage';
import ReviewsPage from '../pages/user/ReviewsPage';
import SeriesPage from '../pages/user/SeriesPage';
import ViewSeriesPage from '../pages/user/ViewSeriesPage';
import ViewSeasonPage from '../pages/user/ViewSeasonPage';
import ViewEpisodePage from '../pages/user/ViewEpisodePage';
import WatchlistPage from '../pages/user/WatchlistPage';

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login userType="user" />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/verify" element={<Otp />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/view-movie/:movieId" element={<ViewMoviePage />} />
      <Route path="/movies/view-movie/actor/:personId" element={<ActorDetailsPage type="cast" />} />
      <Route path="/movies/view-movie/crew/:personId" element={<ActorDetailsPage type="crew" />} />
      <Route path="/movies/view-movie/reviews/:movieId" element={<ReviewsPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/series/view-series/:showId" element={<ViewSeriesPage />} />
      <Route path="/series/view-season/:seasonId" element={<ViewSeasonPage />} />
      <Route path="/series/view-episode/:episodeId" element={<ViewEpisodePage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
    </Routes>
  );
}

export default UserRouter;
