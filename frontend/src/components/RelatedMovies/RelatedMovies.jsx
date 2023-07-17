/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { fetchRelatedMovies } from '../../services/userApi';

function RelatedMovies({ movieId }) {
  const [relatedMovies, setRelatedMovies] = useState([]);
  useEffect(() => {
    console.log('related movies of id', movieId);
    const getRelatedMovies = async (movie) => {
      await fetchRelatedMovies(movie)
        .then((res) => {
          setRelatedMovies(res.data);
          console.log('related movies', res.data, relatedMovies);
        })
        .catch((error) => {
          console.error('error fetching related movies', error);
        });
    };
    getRelatedMovies(movieId);
  }, [movieId]);
  return (
    <div>RelatedMovies</div>
  );
}

export default RelatedMovies;
