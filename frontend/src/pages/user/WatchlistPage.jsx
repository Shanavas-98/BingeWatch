import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import Watchlist from '../../components/Watchlist/Watchlist';

function WatchlistPage() {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <Watchlist />
      </div>
    </div>
  );
}

export default WatchlistPage;
