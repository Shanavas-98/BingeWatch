import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';
import useExpand from '../hooks/useExpand';

function UserLayout() {
  const { expand } = useExpand();
  return (
    <div className="user-layout flex w-full">
      <div className="fixed z-10">
        <UserSidebar />
      </div>
      <main className={`${expand ? 'pl-52' : 'pl-24'} w-full`}>
        <Outlet />
      </main>
    </div>
  );
}
// pl-52

export default UserLayout;
