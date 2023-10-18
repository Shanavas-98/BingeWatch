import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAuth } from '../services/userApi';
import useAuth from '../hooks/useAuth';

function UserAuth() {
  const { user, setUser } = useAuth();
  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await userAuth();
        if (data?.success) {
          setUser(data?.userData);
        } else {
          throw Error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUser();
  }, []);
  if (user && !user.blocked) {
    return <Outlet />;
  }
  if (user && user.blocked) {
    localStorage.removeItem('userInfo');
    setUser(null);
    return <Navigate to="/" />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
}

export default UserAuth;
