import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchMovie } from '../../services/userApi';
import NavigBar from '../NavigationBar/NavigBar';
import VideoPlay from '../VideoPlay/VideoPlay';
import { IMG_URL } from '../../axios/apiUrls';
import CardCarousal from '../CardCarousal/CardCarousal';

function ViewMovie({ movieId }) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async (id) => {
    await fetchMovie(id)
      .then((res) => {
        console.log('movie', res.data);
        setMovie(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getMovie(movieId);
  }, [movieId]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (movie) {
    const {
      title,
      releaseDate,
      duration,
      rating,
      _id,
      videos,
      summary,
      genres,
      id,
      platforms,
      casts,
      crews,
    } = movie;
    const year = releaseDate?.slice(0, 4);
    const castCards = casts?.map((person) => ({
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
      <div className="grid grid-cols-2">
        <div className="col-span-2">
          <NavigBar
            key={_id}
            data={{
              title,
              year,
              duration,
              rating,
              id: _id,
            }}
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <VideoPlay key={id} videos={videos} />
        </div>
        <div className="md:col-span-1 col-span-2">
          <h2 className="text-white text-lg mb-2">Summary</h2>
          <p className="text-gray-200 mb-2">{summary}</p>
          <div className="flex mb-2">
            {genres?.map((item) => (
              <div
                className="text-white border-2 border-gray-300 rounded-full px-2 py-1 mr-2"
                key={item.genreId}
              >
                {item.genreName}
              </div>
            ))}
          </div>
          <h2 className="text-white text-lg mb-2">Platforms</h2>
          <div className="flex mt-2">
            <div className="cards-carousal">
              {platforms?.map((platform) => (
                <img
                  key={platform.platformId}
                  src={IMG_URL + platform.logoPath}
                  alt={`${platform?.platformName} Thumbnail`}
                  className="mr-1 h-20 w-20 rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 ml-2">
          <h2 className="text-white text-lg mb-2">Casts</h2>
          <CardCarousal
            key={castCards[0].key}
            cards={castCards}
            baseLink="/movies/actor"
            style={cardStyle}
          />
          <h2 className="text-white text-lg mb-2">Crews</h2>
          <CardCarousal
            key={crewCards[0].key}
            cards={crewCards}
            baseLink="/movies/crew"
            style={cardStyle}
          />
        </div>
      </div>
    );
  }
}

ViewMovie.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default ViewMovie;
