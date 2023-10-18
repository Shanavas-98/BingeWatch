import React from 'react';
import Databox from '../Charts/Databox';
import MovieDataProvider from './MovieDataProvider';

function MovieBox() {
  return (
    <MovieDataProvider>
      {({ movieCount, moviePercent, movieProfit }) => (
        <Databox title="movies" qty={movieCount} percent={moviePercent} profit={movieProfit} />
      )}
    </MovieDataProvider>
  );
}

export default MovieBox;
