import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import useAuth from '../hooks/useAuth';

export default function RequireAuth({ link, userType }) {
  RequireAuth.propTypes = {
    link: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
  };
  const location = useLocation();
  const { user, admin } = useAuth();
  if (userType === 'user') {
    return (
      user ? <Outlet /> : <Navigate to={link} state={{ from: location }} replace />
    );
  }
  if (userType === 'admin') {
    return (
      admin ? <Outlet /> : <Navigate to={link} state={{ from: location }} replace />
    );
  }
}
