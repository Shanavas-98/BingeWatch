import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Layers, LiveTv, Login, Logout, People, Theaters,
} from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import Sidebar, { SidebarItem } from './Sidebar';
import useAuth from '../hooks/useAuth';
// import { setAdminDetails, setAdminLogout } from '../redux/features/adminSlice';
// import { adminAuth } from '../services/adminApi';
import { AVATAR } from '../axios/apiUrls';
import useExpand from '../hooks/useExpand';

export default function AdminSidebar() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const adminData = useSelector(selectAdmin);
  const { admin, setAdmin } = useAuth();
  const { expand } = useExpand();

  // useEffect(() => {
  //   adminAuth().then((res) => {
  //     const { success, message, adminData } = res.data;
  //     if (success) {
  //       setAdmin(adminData);
  //       dispatch(setAdminDetails(adminData));
  //     } else {
  //       navigate('/admin');
  //       toast.error(message, {
  //         position: 'top-center',
  //       });
  //     }
  //   });
  // }, []);
  const adminLogout = () => {
    localStorage.removeItem('adminJwt');
    localStorage.removeItem('adminInfo');
    setAdmin(null);
    // dispatch(setAdminLogout());
    navigate('/admin');
  };
  return (
    <Sidebar>
      <NavLink to="/admin/dashboard">
        <SidebarItem icon={<Home />} text="Dashboard" />
      </NavLink>
      <NavLink to="/admin/users">
        <SidebarItem icon={<People />} text="Users" />
      </NavLink>
      <NavLink to="/admin/movies">
        <SidebarItem icon={<Theaters />} text="Movies" />
      </NavLink>
      <NavLink to="/admin/series">
        <SidebarItem icon={<LiveTv />} text="Series" />
      </NavLink>
      <NavLink to="/admin/genres">
        <SidebarItem icon={<Layers />} text="Genres" />
      </NavLink>
      <NavLink to="/admin/actors">
        <SidebarItem icon={<People />} text="Actors" />
      </NavLink>
      <NavLink to="/admin/crews">
        <SidebarItem icon={<People />} text="Crews" />
      </NavLink>
      {admin
        ? (
          <div
            role="button"
            tabIndex={0}
            onClick={adminLogout}
            onKeyDown={adminLogout}
          >
            <SidebarItem icon={<Logout />} text="Logout" />
          </div>
        )
        : (
          <NavLink to="/admin">
            <SidebarItem icon={<Login />} text="Login" />
          </NavLink>
        )}
      <div className="border-t flex py-2 justify-center text-white">
        <img
          src={AVATAR}
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
            <h4 className="font-semibold">Admin</h4>
            <span className="text-xs text-gray-200">{admin?.email}</span>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
