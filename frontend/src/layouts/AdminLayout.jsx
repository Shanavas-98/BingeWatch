import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import useExpand from '../hooks/useExpand';

export default function AdminLayout() {
  const { expand } = useExpand();
  return (
    <div className="admin-layout flex w-full">
      <div className="fixed">
        <AdminSidebar />
      </div>
      <main className={`${expand ? 'pl-52' : 'pl-28'} w-full`}>
        <Outlet />
      </main>
    </div>
  );
}
