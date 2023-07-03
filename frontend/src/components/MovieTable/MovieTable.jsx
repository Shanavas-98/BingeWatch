/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

import { fetchMovies } from '../../services/adminApi';

const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-root': {
      color: 'white', // Set the font color to white
    },
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 'bold',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    '& .MuiDataGrid-footer .MuiDataGrid-pagination': {
      '& .MuiPaginationItem-root': {
        color: 'white', // Set the font color of pagination to white
      },
    },
  },
});

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
  const [movies, setMovies] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await fetchMovies();
        setMovies(data);
      } catch (err) {
        console.error('error while fetching', err);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="h-screen m-2">
      <div className={classes.root}>
        <DataGrid
          rows={movies}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
