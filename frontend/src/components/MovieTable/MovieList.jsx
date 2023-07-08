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
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'duration', headerName: 'Duration', width: 100 },
    { field: 'language', headerName: 'Language', width: 100 },
    { field: 'releaseDate', headerName: 'Release date', width: 150 },
    {
      field: 'view',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => viewMovie(params.row.id)}
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
  return (
    <DataTable rows={movies} columns={columns} />
  );
}
