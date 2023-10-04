/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/user/HomePage';
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
import UserLayout from '../layouts/UserLayout';
import MoviesLayout from '../layouts/MoviesLayout';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/user/ProfilePage';
import ChatPage from '../pages/user/ChatPage';
import UserAuth from '../utils/UserAuth';
import UserLogin from '../components/Login/UserLogin';

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="register" element={<Signup />} />
        <Route path="verify" element={<Otp />} />
        <Route path="movies" element={<MoviesLayout />}>
          <Route index element={<MoviesPage />} />
          <Route path="view-movie">
            <Route path=":movieId" element={<ViewMoviePage />} />
            <Route element={<UserAuth />}>
              <Route path="reviews/:movieId" element={<ReviewsPage />} />
            </Route>
          </Route>
          <Route path="actor/:personId" element={<ActorDetailsPage type="cast" />} />
          <Route path="crew/:personId" element={<ActorDetailsPage type="crew" />} />
        </Route>
        <Route path="series" element={<MoviesLayout />}>
          <Route index element={<SeriesPage />} />
          <Route path="view-series/:showId" element={<ViewSeriesPage />} />
          <Route path="view-season/:seasonId" element={<ViewSeasonPage />} />
          <Route path="view-episode/:episodeId" element={<ViewEpisodePage />} />
        </Route>
        <Route element={<UserAuth />}>
          <Route path="watchlist" element={<WatchlistPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chats" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default UserRouter;
