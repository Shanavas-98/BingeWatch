/* eslint-disable linebreak-style */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/admin/HomePage';
import Login from '../components/Login/Login';

function AdminRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/" element={<Login userType="admin" />} />
    </Routes>
  );
}

export default AdminRouter;
