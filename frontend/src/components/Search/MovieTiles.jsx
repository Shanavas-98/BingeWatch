import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IMG_URL } from '../../axios/apiUrls';

function MovieTiles({ results }) {
  MovieTiles.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };
  const navigate = useNavigate();
  const viewMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  const handleKeyPress = (event, movieId) => {
    if (event.key === 'Enter') {
      viewMovie(movieId);
    }
  };
  return (
    <div className="grid grid-cols-2">
      {results && results?.map((movie) => (
        <div className="flex justify-between col-span-2 lg:col-span-1">
          <div
            role="button"
            tabIndex={0}
            key={movie?.id}
            className="flex"
            onClick={() => viewMovie(movie?._id)}
            onKeyDown={(event) => handleKeyPress(event, movie?._id)}
          >
            <img className="h-40 w-26 m-2" src={IMG_URL + movie.images[0]} alt="" />
            <div>
              <h2 className="text-white">{movie?.title}</h2>
              <h4 className="text-white">{movie?.releaseDate}</h4>
              <h4 className="text-white">{movie?.language}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieTiles;
