import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/admin/HomePage';
import Login from '../components/Login/Login';
import MoviesPage from '../pages/admin/MoviesPage';

function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/" element={<Login userType="admin" />} />
      <Route path="/movies" element={<MoviesPage />} />
    </Routes>
  );
}

export default AdminRouter;
