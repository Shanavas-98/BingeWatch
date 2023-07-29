/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { fetchActors } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

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
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (actors.length < 1) {
    return (
      <div>
        <h1 className="text-white">Actors List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Actors List</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Popularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {actors.map((person) => (
            <tr className="">
              <td>{person.actorId}</td>
              <td><img src={IMG_URL + person.profile} alt="" className="w-15 h-20" /></td>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.popularity}</td>
              <td>{person._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ActorsList;
