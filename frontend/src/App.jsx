import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// user pages
import HomePage from './pages/user/HomePage';
import Signup from './components/Signup/Signup';
import Otp from './components/Otp/Otp';
import MoviesPage from './pages/user/MoviesPage';
import ViewMoviePage from './pages/user/ViewMoviePage';
import ActorDetailsPage from './pages/user/ActorDetailsPage';
import ReviewsPage from './pages/user/ReviewsPage';
import SeriesPage from './pages/user/SeriesPage';
import ViewSeriesPage from './pages/user/ViewSeriesPage';
import ViewSeasonPage from './pages/user/ViewSeasonPage';
import ViewEpisodePage from './pages/user/ViewEpisodePage';
import WatchlistPage from './pages/user/WatchlistPage';
import UserLayout from './layouts/UserLayout';
import MoviesLayout from './layouts/MoviesLayout';
import ProfilePage from './pages/user/ProfilePage';
import ChatPage from './pages/user/ChatPage';
import UserAuth from './utils/UserAuth';
import UserLogin from './components/Login/UserLogin';
import Search from './components/Search/Search';
import Forgot from './components/Forgot/Forgot';
import EmailVerify from './components/EmailVerify';

// admin pages
import Dashboard from './components/Dashboard/Dashboard';
import MoviesList from './components/MovieTable/MovieList';
import AddMoviePage from './pages/admin/AddMoviePage';
import EditMoviePage from './pages/admin/EditMoviePage';
import UsersPage from './pages/admin/UsersPage';
import GenresPage from './pages/admin/GenresPage';
import ActorsPage from './pages/admin/ActorsPage';
import CrewsPage from './pages/admin/CrewsPage';
import AddSeriesPage from './pages/admin/AddSeriesPage';
import SeriesList from './components/SeriesTable/SeriesList';
import AdminLayout from './layouts/AdminLayout';
import AdminAuth from './utils/AdminAuth';
import AdminLogin from './components/Login/AdminLogin';
import EditShowPage from './pages/admin/EditShowPage';
import EditSeasonPage from './pages/admin/EditSeasonPage';
import EditEpisodePage from './pages/admin/EditEpisodePage';
import EditActorPage from './pages/admin/EditActorPage';
import EditCrewPage from './pages/admin/EditCrewPage';

import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<Signup />} />
          <Route path="verify-otp/:mobile" element={<Otp />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="search" element={<Search />} />
          <Route path="movies" element={<MoviesLayout />}>
            <Route index element={<MoviesPage />} />
          </Route>
          <Route path="movie" element={<MoviesLayout />}>
            <Route path=":movieId" element={<ViewMoviePage />} />
          </Route>
          <Route path="actor/:personId" element={<ActorDetailsPage type="cast" />} />
          <Route path="crew/:personId" element={<ActorDetailsPage type="crew" />} />
          <Route path="series" element={<MoviesLayout />}>
            <Route index element={<SeriesPage />} />
            <Route path="show/:showId" element={<ViewSeriesPage />} />
            <Route path="season/:seasonId" element={<ViewSeasonPage />} />
            <Route path="episode/:episodeId" element={<ViewEpisodePage />} />
          </Route>
          <Route element={<UserAuth />}>
            <Route path="reviews/:contentId" element={<ReviewsPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="chat" element={<ChatPage />} />
          </Route>
          <Route path="verify-email/:token" element={<EmailVerify />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* admin routes */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminLogin />} />
          <Route element={<AdminAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="movies" element={<MoviesList />} />
            <Route path="movie">
              <Route path="add" element={<AddMoviePage />} />
              <Route path="view/:movieId" element={<EditMoviePage />} />
            </Route>
            <Route path="series/">
              <Route index element={<SeriesList />} />
              <Route path="add-show" element={<AddSeriesPage />} />
              <Route path="view-show/:showId" element={<EditShowPage />} />
              <Route path="view-season/:seasonId" element={<EditSeasonPage />} />
              <Route path="view-episode/:episodeId" element={<EditEpisodePage />} />
            </Route>
            <Route path="genres" element={<GenresPage />} />
            <Route path="actors/">
              <Route index element={<ActorsPage />} />
              <Route path="edit/:actorId" element={<EditActorPage />} />
            </Route>
            <Route path="crews/">
              <Route index element={<CrewsPage />} />
              <Route path="edit/:crewId" element={<EditCrewPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
