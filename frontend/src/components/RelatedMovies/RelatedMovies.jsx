import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Stack } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import { fetchRelatedMovies } from '../../services/userApi';
import { IMG_URL } from '../../axios/apiUrls';

function RelatedMovies({ movieId }) {
  const navigate = useNavigate();
  const [relatedMovies, setRelatedMovies] = useState([]);
  useEffect(() => {
    const getRelatedMovies = async (movie) => {
      await fetchRelatedMovies(movie)
        .then((res) => {
          setRelatedMovies(res.data);
        })
        .catch((err) => {
          toast.error(err.message, {
            position: 'top-center',
          });
        });
    };
    getRelatedMovies(movieId);
  }, [movieId]);
  const viewMovie = (id) => navigate(`/movie/${id}`);
  const handleKeyPress = (event, id) => {
    if (event.key === 'Enter') {
      viewMovie(id);
    }
  };
  return (
    <div className="m-1">
      <h1 className="text-white">RelatedMovies</h1>
      {relatedMovies.length > 0
      && relatedMovies?.map((movie) => (
        <div key={movie._id} className="flex justify-between m-2 border border-white rounded-md p-2">
          <div
            role="button"
            tabIndex={0}
            className="flex"
            onClick={() => viewMovie(movie._id)}
            onKeyDown={(e) => handleKeyPress(e, movie._id)}
          >
            <img src={IMG_URL + movie.images[0]} alt="" className="w-15 h-20" />
            <Stack m={1} className="ml-2">
              <h3 className="text-white">{movie.title}</h3>
              <span className="text-slate-300 text-sm">{`${movie?.releaseDate?.slice(0, 4)} | ${movie?.duration}`}</span>
            </Stack>
          </div>
          <span className="text-slate-300 text-sm self-center">{`${movie?.rating?.toFixed(1)}/10`}</span>
        </div>
      ))}
    </div>
  );
}

RelatedMovies.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default RelatedMovies;
