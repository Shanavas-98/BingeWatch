import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchEpisode } from '../../services/userApi';
import NavigBar from '../NavigationBar/NavigBar';
import CardCarousal from '../CardCarousal/CardCarousal';
import StillCarousal from '../StillCarousal/StillCarousal';

function ViewEpisode({ episodeId }) {
  const [loading, setLoading] = useState(true);
  const [episode, setEpisode] = useState({});
  useEffect(() => {
    const getEpisode = async (id) => {
      await fetchEpisode(id)
        .then((res) => {
          setEpisode(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching episode:', error);
          setLoading(false);
        });
    };
    getEpisode(episodeId);
  }, [episodeId]);

  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (episode) {
    const {
      _id, title, id, airDate, rating, duration,
      summary, images, casts, crews, guests,
    } = episode;
    const castCards = casts?.map((person) => ({
      id: person.cast,
      key: person.tmdbId,
      title: person.name,
      subtitle: person.character,
      image: person.profile,
    }));
    const guestCards = guests?.map((person) => ({
      id: person.cast,
      key: person.tmdbId,
      title: person.name,
      subtitle: person.character,
      image: person.profile,
    }));
    const crewCards = crews?.map((person) => ({
      id: person.crew,
      key: person.tmdbId,
      title: person.name,
      subtitle: person.job,
      image: person.profile,
    }));
    const cardStyle = {
      wd: 'w-28',
      ht: 'h-44',
    };
    return (
      <div className="grid grid-cols-2 mx-1">
        <div className="col-span-2">
          <NavigBar
            key={_id}
            data={{
              title, start: airDate, duration: `${duration} min`, rating, id: _id,
            }}
          />
        </div>
        <div className="md:col-span-1 col-span-2 px-1">
          <StillCarousal key={id} images={images} />
        </div>
        <div className="md:col-span-1 col-span-2 px-1">
          <h2 className="text-white text-lg mb-2">Summary</h2>
          <p className="text-gray-200 mb-2">{summary}</p>
        </div>
        <div className="col-span-2 ml-2">
          <h2 className="text-white text-lg mb-2">Casts</h2>
          <CardCarousal key={castCards[0].key} cards={castCards} baseLink="/movies/view-movie/actor" style={cardStyle} />
          <h2 className="text-white text-lg mb-2">Guests</h2>
          <CardCarousal key={guestCards[0].key} cards={guestCards} baseLink="/movies/view-movie/actor" style={cardStyle} />
          <h2 className="text-white text-lg mb-2">Crews</h2>
          <CardCarousal key={crewCards[0].key} cards={crewCards} baseLink="/movies/view-movie/crew" style={cardStyle} />
        </div>
      </div>
    );
  }
}

ViewEpisode.propTypes = {
  episodeId: PropTypes.string.isRequired,
};

export default ViewEpisode;
