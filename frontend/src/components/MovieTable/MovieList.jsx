/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

import { fetchMovies } from '../../services/adminApi';
import DataTable from '../Table/DataTable';

export default function MovieTable() {
  const navigate = useNavigate();
  const viewMovie = (movieId) => {
    navigate(`/admin/movies/view-movie/${movieId}`);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', width: 240 },
    { field: 'genres', headerName: 'Genres', width: 300 },
    { field: 'duration', headerName: 'Duration', width: 100 },
    { field: 'language', headerName: 'Language', width: 80 },
    { field: 'releaseDate', headerName: 'Release date', width: 100 },
    {
      field: 'view',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => viewMovie(params.row._id)}
        >
          View
        </Button>
      ),
    },
  ];
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await fetchMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setLoading(false);
      }
    };
    getMovies();
  }, []);
  const rows = movies?.map((movie) => {
    const genresData = movie.genres?.map((genre) => genre.genreName).join(', ');
    return ({
      id: movie?.id,
      title: movie?.title,
      genres: genresData,
      duration: movie?.duration,
      language: movie?.language,
      releaseDate: movie?.releaseDate,
      _id: movie?._id,
    });
  });
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (movies.length < 1) {
    return (
      <div>
        <h1 className="text-white">Movies List is Empty</h1>
      </div>
    );
  }
  if (movies.length > 0) {
    return (
      <DataTable rows={rows} columns={columns} />
    );
  }
}
