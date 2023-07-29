/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
        .catch((error) => {
          console.error('error fetching related movies', error);
        });
    };
    getRelatedMovies(movieId);
  }, [movieId]);
  return (
    <div className="m-1">
      <h1 className="text-white">RelatedMovies</h1>
      {relatedMovies.length > 0
      && relatedMovies?.map((movie) => (
        <div className="flex justify-between m-2 border border-white p-2">
          <div className="flex" onClick={() => navigate(`/movies/view-movie/${movie._id}`)}>
            <img src={IMG_URL + movie.images[0]} alt="" className="w-15 h-20" />
            <Stack spacing={1} className="ml-2">
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

export default RelatedMovies;
