import React from 'react';
import AddMovie from '../../components/AddMovie/AddMovie';
import SideBar from '../../components/SideBar/SideBar';

function MoviesPage() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="admin" />
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8">
        <AddMovie />
      </div>
    </div>
  );
}

export default MoviesPage;
