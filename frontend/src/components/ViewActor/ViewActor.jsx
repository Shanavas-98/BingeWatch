import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchActor, fetchCrew } from '../../services/userApi';
import CardCarousal from '../CardCarousal/CardCarousal';
import { IMG_URL } from '../../axios/apiUrls';
import PersonBar from '../NavigationBar/PersonBar';

function ViewActor({ personId, type }) {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [knownFor, setKnownFor] = useState([]);
  useEffect(() => {
    if (type === 'cast') {
      const getActor = async (id) => {
        await fetchActor(id)
          .then((res) => {
            setPerson(res.data?.actor);
            setKnownFor(res.data?.knownFor);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.message, {
              position: 'top-center',
            });
          });
      };
      getActor(personId);
    }
    if (type === 'crew') {
      const getCrew = async (id) => {
        await fetchCrew(id)
          .then((res) => {
            setPerson(res.data?.crew);
            setKnownFor(res.data?.knownFor);
            setLoading(false);
          })
          .catch((err) => {
            toast.error(err.message, {
              position: 'top-center',
            });
            setLoading(false);
          });
      };
      getCrew(personId);
    }
  }, [personId]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (person) {
    const {
      crewId, actorId, name, profile,
      biography, birthday, deathday,
      gender, department, placeOfBirth,
    } = person;
    const movieCards = knownFor?.map((movie) => ({
      id: movie?._id,
      key: movie?.id,
      title: movie?.title,
      subtitle: movie?.releaseDate.slice(0, 4),
      image: movie?.images[0],
    }));
    const cardStyle = {
      wd: 'w-28',
      ht: 'h-44',
    };
    return (
      <div className="grid grid-cols-4">
        <div className="col-span-4">
          <PersonBar
            key={actorId || crewId}
            data={{ name, gender, department }}
          />
        </div>
        <div className="col-span-1 mt-2 ml-3">
          <img src={IMG_URL + profile} alt="" />
        </div>
        <div className="col-span-3 mx-2">
          <h2 className="text-white text-xl font-bold mb-2">Biography</h2>
          <p className="text-gray-200 mb-2 text-lg">{biography}</p>
          <p className="text-gray-200 mb-2 text-lg">
            {`Born on : ${birthday}`}
          </p>
          <p className="text-gray-200 mb-2 text-lg">{deathday}</p>
          <p className="text-gray-200 mb-2 text-lg">
            {`Born at : ${placeOfBirth}`}
          </p>
        </div>
        <div className="col-span-4 ml-2">
          <h2 className="text-white text-lg font-bold mb-2">Popular for</h2>
          <CardCarousal cards={movieCards} baseLink="/movie" style={cardStyle} />
        </div>
      </div>
    );
  }
}

ViewActor.propTypes = {
  personId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ViewActor;
