import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Bookmarks, Forum, Home, LiveTv, Login, Logout, PersonAddAlt, Theaters,
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import Sidebar, { SidebarItem } from './Sidebar';
import { setUserDetails, setUserLogout } from '../redux/features/userSlice';
import useAuth from '../hooks/useAuth';
import { userAuth } from '../services/userApi';
import { AVATAR } from '../axios/apiUrls';
import useExpand from '../hooks/useExpand';

export default function UserSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userData = useSelector(selectUser);
  const { user, setUser } = useAuth();
  const { expand } = useExpand();

  useEffect(() => {
    userAuth().then((res) => {
      const { success, userData } = res.data;
      if (success) {
        setUser(userData);
        dispatch(setUserDetails(userData));
      } else {
        navigate('/login');
      }
    });
  }, []);
  const userLogout = () => {
    localStorage.removeItem('userJwt');
    localStorage.removeItem('userInfo');
    setUser({});
    dispatch(setUserLogout());
    navigate('/');
  };
  return (
    <Sidebar>
      <NavLink to="/">
        <SidebarItem icon={<Home />} text="Home" />
      </NavLink>
      <NavLink to="/chats">
        <SidebarItem icon={<Forum />} text="Chats" />
      </NavLink>
      <NavLink to="/movies">
        <SidebarItem icon={<Theaters />} text="Movies" />
      </NavLink>
      <NavLink to="/series">
        <SidebarItem icon={<LiveTv />} text="Series" />
      </NavLink>
      <NavLink to="/watchlist">
        <SidebarItem icon={<Bookmarks />} text="Watchlist" />
      </NavLink>
      {user
        ? (
          <div
            role="button"
            tabIndex={0}
            onClick={userLogout}
            onKeyDown={userLogout}
          >
            <SidebarItem icon={<Logout />} text="Logout" />
          </div>
        )
        : (
          <>
            <NavLink to="/login">
              <SidebarItem icon={<Login />} text="Login" />
            </NavLink>
            <NavLink to="/register">
              <SidebarItem icon={<PersonAddAlt />} text="Signup" />
            </NavLink>
          </>
        )}
      <NavLink to="/profile">
        <div className="border-t flex justify-center py-2 text-white">
          <img
            src={user?.picture?.url || AVATAR}
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expand ? 'w-32 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user?.name}</h4>
              <span className="text-xs text-gray-200">{user?.email}</span>
            </div>
          </div>
        </div>
      </NavLink>
    </Sidebar>
  );
}
