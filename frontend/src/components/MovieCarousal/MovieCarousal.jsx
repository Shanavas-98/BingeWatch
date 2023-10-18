import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchGenreMovies } from '../../services/userApi';
import CardCarousal from '../CardCarousal/CardCarousal';

function MovieCarousal({ genreId }) {
  MovieCarousal.propTypes = {
    genreId: PropTypes.string.isRequired,
  };
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();
  useEffect(() => {
    const getMovies = async (genre) => {
      try {
        const { data } = await fetchGenreMovies(genre);
        setMovies(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
        setLoading(false);
      }
    };
    getMovies(genreId);
  }, [genreId]);

  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (Array.isArray(movies)) {
    const movieCards = movies?.map((movie) => ({
      id: movie?._id,
      key: movie?.id,
      title: movie?.title,
      image: movie?.images[0],
    }));
    const cardStyle = {
      wd: 'w-36',
      ht: 'h-60',
    };
    return (
      <CardCarousal cards={movieCards} baseLink="/movie" style={cardStyle} />
    );
  }
  return (
    <h1>movies is not an array</h1>
  );
}

export default MovieCarousal;
