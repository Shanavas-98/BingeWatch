/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { fetchCrews } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

function CrewsList() {
  const [loading, setLoading] = useState(true);
  const [crews, setCrews] = useState([]);
  useEffect(() => {
    const getCrews = async () => {
      try {
        const { data } = await fetchCrews();
        setCrews(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching crews', err);
        setLoading(false);
      }
    };
    getCrews();
  }, []);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (crews.length < 1) {
    return (
      <div>
        <h1 className="text-white">Crews List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Crews List</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Popularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {crews.map((person) => (
            <tr className="">
              <td>{person.crewId}</td>
              <td><img src={IMG_URL + person.profile} alt="" className="w-15 h-20" /></td>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.department}</td>
              <td>{person.popularity}</td>
              <td>{person._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CrewsList;
