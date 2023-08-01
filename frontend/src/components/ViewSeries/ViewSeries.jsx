import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StarRateRounded } from '@mui/icons-material';
import { Button, Label } from 'flowbite-react';

import NavigBar from '../NavigationBar/NavigBar';
import VideoPlay from '../VideoPlay/VideoPlay';
import { IMG_URL } from '../../axios/apiUrls';
import CardCarousal from '../CardCarousal/CardCarousal';
import { fetchSeries } from '../../services/userApi';

function ViewSeries({ showId }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState({});
  useEffect(() => {
    const getSeries = async (id) => {
      await fetchSeries(id)
        .then((res) => {
          setSeries(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching series:', error);
          setLoading(false);
        });
    };
    getSeries(showId);
  }, [showId]);
  const viewSeason = async (seasonId) => {
    navigate(`/series/view-season/${seasonId}`);
  };
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (series) {
    const {
      title, airDate, endDate, rating, id,
      _id, videos, summary, genres, tagline,
      platforms, casts, crews, createdBy, seasons,
    } = series;
    const start = airDate?.slice(0, 4);
    const end = endDate?.slice(0, 4);
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
              title, tagline, start, end, rating, id: _id,
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
              <div className="text-white border-2 border-gray-300 rounded-full px-2 py-1 mr-2" key={item.genreId}>{item.genreName}</div>
            ))}
          </div>
          <h2 className="text-white text-lg mb-2">Creators</h2>
          <div className="flex mb-2">
            {createdBy?.map((person) => (
              <span className="text-white mx-1" key={person.tmdbId}>{person.name}</span>
            ))}
          </div>
          <h2 className="text-white text-lg mb-2">Platforms</h2>
          <div className="flex mt-2">
            <div className="cards-carousal">
              {platforms?.map((platform) => (
                <img
                  key={platform.platformId}
                  src={IMG_URL + platform.logoPath}
                  alt={`${platform?.platformName}`}
                  className="mr-1 h-20 w-20 rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 ml-2">
          <Label htmlFor="seasons" value="Seasons" className="text-white" />
          <div className="cards-carousal">
            {seasons?.map((season) => (
              <div key={season.id} className="flex">
                <div>
                  <img
                    src={IMG_URL + season.poster}
                    alt="poster"
                    className="h-48 w-32 mx-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-white">{season.title}</h2>
                    <h4 className="text-white">{season.airDate}</h4>
                    <h4 className="text-white">{`${season.totalEpisodes} episodes`}</h4>
                    <h4 className="text-yellow-400">
                      <StarRateRounded />
                      {`${season.rating}/10`}
                    </h4>
                  </div>
                  <Button
                    key={season.id}
                    onClick={() => viewSeason(season.id)}
                    className="mr-2"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-white text-lg mb-2">Casts</h2>
          <CardCarousal key={castCards[0].key} cards={castCards} baseLink="/movies/view-movie/actor" style={cardStyle} />
          <h2 className="text-white text-lg mb-2">Crews</h2>
          <CardCarousal key={crewCards[0].key} cards={crewCards} baseLink="/movies/view-movie/crew" style={cardStyle} />
        </div>
      </div>
    );
  }
}

ViewSeries.propTypes = {
  showId: PropTypes.string.isRequired,
};

export default ViewSeries;
