import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/user/HomePage';
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';
import Otp from '../components/Otp/Otp';
import MoviesPage from '../pages/user/MoviesPage';
import ViewMoviePage from '../pages/user/ViewMoviePage';

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login userType="user" />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/verify" element={<Otp />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/view-movie/:movieId" element={<ViewMoviePage />} />
    </Routes>
  );
}

export default UserRouter;
