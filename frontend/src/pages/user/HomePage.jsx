import React from 'react';
import SideBar from '../../components/SideBar/SideBar';

function HomePage() {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <h1 className="text-white">Home Page Contents</h1>
      </div>
    </div>
  );
}

export default HomePage;
