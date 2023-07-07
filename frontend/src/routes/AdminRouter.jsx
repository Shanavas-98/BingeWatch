import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/admin/HomePage';
import Login from '../components/Login/Login';
import MoviesPage from '../pages/admin/MoviesPage';
import AddMoviePage from '../pages/admin/AddMoviePage';
import EditMoviePage from '../pages/admin/EditMoviePage';
import UsersPage from '../pages/admin/UsersPage';
import GenresPage from '../pages/admin/GenresPage';
import ActorsPage from '../pages/admin/ActorsPage';
import CrewsPage from '../pages/admin/CrewsPage';

function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/" element={<Login userType="admin" />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/add-movie" element={<AddMoviePage />} />
      <Route path="/movies/view-movie/:movieId" element={<EditMoviePage />} />
      <Route path="/genres" element={<GenresPage />} />
      <Route path="/actors" element={<ActorsPage />} />
      <Route path="/crews" element={<CrewsPage />} />
    </Routes>
  );
}

export default AdminRouter;
