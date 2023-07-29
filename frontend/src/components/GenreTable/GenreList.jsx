/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { fetchGenres } from '../../services/adminApi';

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
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (genres.length < 1) {
    return (
      <div>
        <h1 className="text-white">Genres List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Genres List</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {genres.map((item) => (
            <tr>
              <td>{item.genreId}</td>
              <td>{item.genreName}</td>
              <td>{item._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GenreList;
