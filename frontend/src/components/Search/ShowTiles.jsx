import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IMG_URL } from '../../axios/apiUrls';

function ShowTiles({ results }) {
  ShowTiles.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };
  const navigate = useNavigate();
  const viewShow = (showId) => {
    navigate(`/series/show/${showId}`);
  };
  const handleKeyPress = (event, movieId) => {
    if (event.key === 'Enter') {
      viewShow(movieId);
    }
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      {results && results?.map((show) => (
        <div className="flex col-span-2 md:col-span-1">
          <div
            role="button"
            tabIndex={0}
            key={show?.id}
            className="flex"
            onClick={() => viewShow(show?._id)}
            onKeyDown={(event) => handleKeyPress(event, show?._id)}
          >
            <img className="h-40 w-26 m-2" src={IMG_URL + show.poster} alt="" />
            <div className="flex-col justify-around flex">
              <div>
                <h2 className="text-white text-base h-12 overflow-hidden">{show?.title}</h2>
                <h4 className="text-white">{show?.airDate}</h4>
                <h4 className="text-white">{show?.language}</h4>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowTiles;
