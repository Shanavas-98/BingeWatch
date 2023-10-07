import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchGenreMovies } from '../../services/userApi';
import CardCarousal from '../CardCarousal/CardCarousal';

function MovieCarousal({ genre }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();
  useEffect(() => {
    const getMovies = async (genreName) => {
      try {
        const { data } = await fetchGenreMovies(genreName);
        setMovies(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
        setLoading(false);
      }
    };
    getMovies(genre);
  }, [genre]);

  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (Array.isArray(movies)) {
    const movieCards = movies?.map((movie) => ({
      id: movie._id,
      key: movie.id,
      title: movie.title,
      image: movie.images[0],
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

MovieCarousal.propTypes = {
  genre: PropTypes.string.isRequired,
};

export default MovieCarousal;
