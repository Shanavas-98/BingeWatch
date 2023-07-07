/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import DataTable from '../Table/DataTable';
import { fetchCrews } from '../../services/adminApi';

function CrewsList() {
  const [crews, setCrews] = useState([]);
  useEffect(() => {
    const getCrews = async () => {
      try {
        const { data } = await fetchCrews();
        setCrews(data);
      } catch (err) {
        console.error('Error while fetching actors', err);
      }
    };
    getCrews();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'profile', headerName: 'Profile', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'popularity', headerName: 'Popularity', width: 100 },
    { field: '_id', headerName: 'Action', width: 100 },
  ];
  const rows = crews.map((person) => ({
    id: person.crewId,
    profile: person.profile,
    name: person.name,
    gender: person.gender,
    popularity: person.popularity,
    _id: person._id,
  }));
  return (
    <>
      <h1 className="text-white m-2">Actors List</h1>
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

export default CrewsList;
