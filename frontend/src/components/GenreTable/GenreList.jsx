/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { fetchGenres } from '../../services/adminApi';
import DataTable from '../Table/DataTable';

function GenreList() {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenres = async () => {
      try {
        const { data } = await fetchGenres();
        setGenres(data);
        setLoading(false);
      } catch (err) {
        console.error('Error while fetching genres', err);
        setLoading(false);
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
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (rows.length < 1) {
    return (
      <div>
        <h1 className="text-white">Genres List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white m-2">Genres List</h1>
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

export default GenreList;
