/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { fetchGenres } from '../../services/adminApi';
import DataTable from '../Table/DataTable';

function GenreList() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await fetchGenres();
        setGenres(data);
      } catch (err) {
        console.error('Error while fetching genres', err);
      }
    };
    getGenres();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'genreName', headerName: 'Genre', width: 150 },
    { field: '_id', headerName: 'Action', width: 100 },
  ];
  const rows = genres.map((genre) => ({
    id: genre.genreId,
    genreName: genre.genreName,
    _id: genre._id,
  }));
  return (
    <>
      <h1 className="text-white m-2">Genres List</h1>
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

export default GenreList;
