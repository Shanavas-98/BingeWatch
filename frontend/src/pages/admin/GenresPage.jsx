import React from 'react';
import GenreList from '../../components/GenreTable/GenreList';
import SideBar from '../../components/SideBar/SideBar';

function GenresPage() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="admin" />
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8">
        <GenreList />
      </div>
    </div>
  );
}

export default GenresPage;
