import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Sidebar } from 'flowbite-react';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  BookmarkSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  FilmIcon, HomeIcon,
  Square3Stack3DIcon,
  TvIcon, UserGroupIcon,
  UserIcon, UserPlusIcon, UsersIcon,
} from '@heroicons/react/24/outline';

import './SideBar.css';
import { setUserDetails, setUserLogout } from '../../redux/features/userSlice';
import { setAdminDetails, setAdminLogout } from '../../redux/features/adminSlice';
import { userAuth } from '../../services/userApi';
import { adminAuth } from '../../services/adminApi';

function SideBar({ userType }) {
  const userData = useSelector((state) => state.user);
  const adminData = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userType === 'admin' && !adminData.id) {
      adminAuth().then((res) => {
        const { success, message, admin } = res.data;
        if (success) {
          dispatch(setAdminDetails({ ...admin }));
        } else {
          localStorage.removeItem('adminJwt');
          dispatch(setAdminLogout());
          toast.error(message, {
            position: 'top-center',
          });
        }
      });
    }
    if (userType === 'user' && !userData.id) {
      userAuth().then((res) => {
        const { success, message, user } = res.data;
        if (success) {
          dispatch(setUserDetails({ ...user }));
        } else {
          localStorage.removeItem('userJwt');
          dispatch(setUserLogout());
          console.error(message);
        }
      });
    }
  }, []);
  const userLogout = () => {
    localStorage.removeItem('userJwt');
    dispatch(setUserLogout());
    navigate('/');
  };
  const adminLogout = () => {
    localStorage.removeItem('adminJwt');
    dispatch(setAdminLogout());
    navigate('/admin');
  };
  return (
    <Sidebar aria-label="Sidebar with logo branding example" className="dark h-screen fixed sidebar">
      {/* img="./images/bingewatch_logo.png" imgAlt="logo" */}
      <Sidebar.Logo>
        <p>BingeWatch</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        {userType === 'admin'
          && (
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HomeIcon}>
                <p>Dashboard</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UsersIcon} onClick={() => navigate('/admin/users')}>
                <p>Users</p>
              </Sidebar.Item>
              <Sidebar.Item icon={FilmIcon} onClick={() => navigate('/admin/movies')}>
                <p>Movies</p>
              </Sidebar.Item>
              <Sidebar.Item icon={FilmIcon} onClick={() => navigate('/admin/series')}>
                <p>Series</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UsersIcon} onClick={() => navigate('/admin/actors')}>
                <p>Actors</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UsersIcon} onClick={() => navigate('/admin/crews')}>
                <p>Crews</p>
              </Sidebar.Item>
              <Sidebar.Item icon={Square3Stack3DIcon} onClick={() => navigate('/admin/genres')}>
                <p>Genres</p>
              </Sidebar.Item>
              <Sidebar.Item icon={ChatBubbleOvalLeftEllipsisIcon}>
                <p>Reports</p>
              </Sidebar.Item>
              {adminData && adminData.id
                ? (
                  <Sidebar.Item icon={ArrowLeftOnRectangleIcon} onClick={adminLogout}>
                    <p>Logout</p>
                  </Sidebar.Item>
                )
                : (
                  <Sidebar.Item icon={ArrowRightOnRectangleIcon} onClick={() => navigate('/admin')}>
                    <p>Login</p>
                  </Sidebar.Item>
                )}
            </Sidebar.ItemGroup>
          )}
        {userType === 'user'
          && (
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HomeIcon}>
                <p>Home</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UserGroupIcon}>
                <p>Groups</p>
              </Sidebar.Item>
              <Sidebar.Item icon={FilmIcon} onClick={() => navigate('/movies')}>
                <p>Movies</p>
              </Sidebar.Item>
              <Sidebar.Item icon={TvIcon} onClick={() => navigate('/series')}>
                <p>Series</p>
              </Sidebar.Item>
              <Sidebar.Item icon={BookmarkSquareIcon} onClick={() => navigate('/watchlist')}>
                <p>Watchlist</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UserIcon}>
                <p>Profile</p>
              </Sidebar.Item>
              {userData && userData.id
                ? (
                  <Sidebar.Item icon={ArrowLeftOnRectangleIcon} onClick={userLogout}>
                    <p>Logout</p>
                  </Sidebar.Item>
                )
                : (
                  <>
                    <Sidebar.Item icon={ArrowRightOnRectangleIcon} onClick={() => navigate('/login')}>
                      <p>Login</p>
                    </Sidebar.Item>
                    <Sidebar.Item icon={UserPlusIcon} onClick={() => navigate('/register')}>
                      <p>Signup</p>
                    </Sidebar.Item>
                  </>
                )}
            </Sidebar.ItemGroup>
          )}
      </Sidebar.Items>
    </Sidebar>
  );
}

SideBar.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default SideBar;
