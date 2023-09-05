import React from 'react';
import Watchlist from '../../components/Watchlist/Watchlist';

function WatchlistPage() {
  return (
    <div className="w-auto h-screen m-2">
      <h2 className="text-lg text-white font-bold py-2">Watchlist</h2>
      <Watchlist />
    </div>
  );
}

export default WatchlistPage;
