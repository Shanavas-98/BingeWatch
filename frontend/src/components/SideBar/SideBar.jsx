/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, setUserLogout } from '../../redux/features/userSlice';
import { setAdminDetails, setAdminLogout } from '../../redux/features/adminSlice';
import { userAuth } from '../../services/userApi';
import { adminAuth } from '../../services/adminApi';

function SideBar({ userType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  useEffect(() => {
    if (userType === 'admin' && !admin.id) {
      adminAuth().then((res) => {
        console.log('Admin', res.data);
        if (res.data.status) {
          dispatch(setAdminDetails({
            id: res.data.admin._id,
            email: res.data.admin.email,
          }));
        } else {
          localStorage.removeItem('adminJwt');
          dispatch(setAdminLogout());
        }
      });
    }
    if (userType === 'user' && !user.id) {
      userAuth().then((res) => {
        console.log('User', res.data);
        if (res.data.status) {
          dispatch(setUserDetails({
            id: res.data.user._id,
            fullName: res.data.user.fullName,
            email: res.data.user.email,
          }));
        } else {
          localStorage.removeItem('userJwt');
          dispatch(setUserLogout());
        }
      });
    }
  });
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
    <Sidebar aria-label="Sidebar with logo branding example" className="dark h-screen fixed">
      <Sidebar.Logo img="./images/bingewatch_logo.png" imgAlt="logo">
        <p>BingeWatch</p>
      </Sidebar.Logo>
      <Sidebar.Items>
        {userType === 'admin'
          && (
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HomeIcon}>
                <p>Dashboard</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UsersIcon}>
                <p>Users</p>
              </Sidebar.Item>
              <Sidebar.Item icon={FilmIcon} onClick={() => navigate('/admin/movies')}>
                <p>Movies</p>
              </Sidebar.Item>
              <Sidebar.Item icon={TvIcon}>
                <p>Series</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UsersIcon}>
                <p>Actors</p>
              </Sidebar.Item>
              <Sidebar.Item icon={Square3Stack3DIcon}>
                <p>Genres</p>
              </Sidebar.Item>
              <Sidebar.Item icon={ChatBubbleOvalLeftEllipsisIcon}>
                <p>Reports</p>
              </Sidebar.Item>
              <Sidebar.Item icon={ArrowRightOnRectangleIcon} onClick={() => navigate('/admin/login')}>
                <p>Login</p>
              </Sidebar.Item>
              <Sidebar.Item icon={ArrowLeftOnRectangleIcon} onClick={adminLogout}>
                <p>Logout</p>
              </Sidebar.Item>
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
              <Sidebar.Item icon={FilmIcon}>
                <p>Movies</p>
              </Sidebar.Item>
              <Sidebar.Item icon={TvIcon}>
                <p>Series</p>
              </Sidebar.Item>
              <Sidebar.Item icon={BookmarkSquareIcon}>
                <p>Watchlist</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UserIcon}>
                <p>Profile</p>
              </Sidebar.Item>
              <Sidebar.Item icon={ArrowRightOnRectangleIcon} onClick={() => navigate('/login')}>
                <p>Login</p>
              </Sidebar.Item>
              <Sidebar.Item icon={ArrowLeftOnRectangleIcon} onClick={userLogout}>
                <p>Logout</p>
              </Sidebar.Item>
              <Sidebar.Item icon={UserPlusIcon} onClick={() => navigate('/register')}>
                <p>Signup</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          )}
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
