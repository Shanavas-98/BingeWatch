import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function adminAuth() {
  const location = useLocation();
  const { admin } = useAuth();
  return admin ? <Outlet /> : <Navigate to="/admin" state={{ from: location }} replace />;
}

export default adminAuth;
