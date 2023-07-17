/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import DataTable from '../Table/DataTable';
import { fetchActors } from '../../services/adminApi';

function ActorsList() {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);
  useEffect(() => {
    const getActors = async () => {
      try {
        const { data } = await fetchActors();
        setActors(data);
        setLoading(false);
      } catch (err) {
        console.error('Error while fetching actors', err);
        setLoading(false);
      }
    };
    getActors();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'profile', headerName: 'Profile', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'popularity', headerName: 'Popularity', width: 100 },
    { field: '_id', headerName: 'Action', width: 100 },
  ];
  const rows = actors.map((person) => ({
    id: person.actorId,
    profile: person.profile,
    name: person.name,
    gender: person.gender,
    popularity: person.popularity,
    _id: person._id,
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
        <h1 className="text-white">Actors List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white m-2">Actors List</h1>
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

export default ActorsList;
