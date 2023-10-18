import React from 'react';
import MovieDataProvider from './MovieDataProvider';
import Bar from '../Charts/Bar';

function MovieBar() {
  return (
    <MovieDataProvider>
      {({ moviePercent, movieProfit }) => (
        <Bar title="movies" value={moviePercent} profit={movieProfit} />
      )}
    </MovieDataProvider>
  );
}

export default MovieBar;
