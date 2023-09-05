import React from 'react';
import SeriesCarousal from '../../components/SeriesCarousal/SeriesCarousal';

function SeriesPage() {
  const genresArray = ['Drama'];
  return (
    <div className="w-auto m-2">
      {genresArray.map((showGenre) => (
        <>
          <strong className="text-white">{showGenre}</strong>
          <SeriesCarousal genre={showGenre} />
        </>
      ))}
    </div>
  );
}

export default SeriesPage;
