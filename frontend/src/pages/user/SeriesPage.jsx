import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import SeriesCarousal from '../../components/SeriesCarousal/SeriesCarousal';

function SeriesPage() {
  const genresArray = ['Drama'];
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <div className="w-auto m-2">
          {genresArray.map((showGenre) => (
            <>
              <strong className="text-white">{showGenre}</strong>
              <SeriesCarousal genre={showGenre} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeriesPage;
