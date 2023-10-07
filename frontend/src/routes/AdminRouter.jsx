/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/admin/HomePage';
import MoviesPage from '../pages/admin/MoviesPage';
import AddMoviePage from '../pages/admin/AddMoviePage';
import EditMoviePage from '../pages/admin/EditMoviePage';
import UsersPage from '../pages/admin/UsersPage';
import GenresPage from '../pages/admin/GenresPage';
import ActorsPage from '../pages/admin/ActorsPage';
import CrewsPage from '../pages/admin/CrewsPage';
import AddSeriesPage from '../pages/admin/AddSeriesPage';
import SeriesPage from '../pages/admin/SeriesPage';
import AdminLayout from '../layouts/AdminLayout';
import NotFound from '../pages/NotFound';
import AdminAuth from '../utils/AdminAuth';
import AdminLogin from '../components/Login/AdminLogin';

function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminLogin />} />
        <Route element={<AdminAuth />}>
          <Route path="dashboard" element={<HomePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movie">
            <Route path="add" element={<AddMoviePage />} />
            <Route path="view/:movieId" element={<EditMoviePage />} />
          </Route>
          <Route path="series/">
            <Route index element={<SeriesPage />} />
            <Route path="add-show" element={<AddSeriesPage />} />
          </Route>
          <Route path="genres" element={<GenresPage />} />
          <Route path="actors" element={<ActorsPage />} />
          <Route path="crews" element={<CrewsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
