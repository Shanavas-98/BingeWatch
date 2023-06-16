import React from 'react';
import SideBar from '../../components/SideBar/SideBar';

function HomePage() {
  return (
    <div className="grid grid-cols-8">
      <div className="col-span-2">
        <SideBar userType="admin" />
      </div>
      <div className="col-span-6" />
    </div>
  );
}

export default HomePage;
