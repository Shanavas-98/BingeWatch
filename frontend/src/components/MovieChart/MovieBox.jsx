import React from 'react';
import PropTypes from 'prop-types';

import Databox from '../Charts/Databox';
import MovieDataProvider from './MovieDataProvider';

function MovieBox({ handleTab }) {
  MovieBox.propTypes = {
    handleTab: PropTypes.func.isRequired,
  };
  const selectTab = () => {
    handleTab(2);
  };
  return (
    <MovieDataProvider>
      {({ movieCount, moviePercent, movieProfit }) => (
        <Databox title="movies" qty={movieCount} percent={moviePercent} profit={movieProfit} selectTab={selectTab} />
      )}
    </MovieDataProvider>
  );
}

export default MovieBox;
