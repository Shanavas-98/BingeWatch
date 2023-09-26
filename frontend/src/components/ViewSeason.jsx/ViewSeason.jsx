import React, { useEffect, useState } from 'react';
import { StarRateRounded } from '@mui/icons-material';
import { Button, FormLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import VideoPlay from '../VideoPlay/VideoPlay';
import NavigBar from '../NavigationBar/NavigBar';
import { IMG_URL } from '../../axios/apiUrls';
import { fetchSeason } from '../../services/userApi';

function ViewSeason(props) {
  const navigate = useNavigate();
  const { seasonId } = props;
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState({});
  useEffect(() => {
    const getSeason = async (id) => {
      await fetchSeason(id)
        .then((res) => {
          setSeason(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching season:', error);
          setLoading(false);
        });
    };
    getSeason(seasonId);
  }, [seasonId]);
  const viewEpisode = async (episodeId) => {
    navigate(`/series/view-episode/${episodeId}`);
  };
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (season) {
    const {
      title, airDate, rating,
      _id, videos, summary, episodes,
    } = season;
    const start = airDate?.slice(0, 4);
    return (
      <div className="grid grid-cols-2">
        <div className="col-span-2">
          <NavigBar
            data={{
              title, start, rating, id: _id,
            }}
          />
        </div>
        <div className="md:col-span-1 col-span-2">
          <VideoPlay videos={videos} />
        </div>
        <div className="md:col-span-1 col-span-2">
          <h2 className="text-white text-lg mb-2">Summary</h2>
          <p className="text-gray-200 mb-2">{summary}</p>
        </div>
        <div className="col-span-2 ml-2">
          <FormLabel>Episodes</FormLabel>
          <div className="cards-carousal my-2">
            {episodes?.map((episode) => (
              <div key={episode.id} className="flex">
                <div>
                  <img
                    src={IMG_URL + episode.poster}
                    alt="poster"
                    className="h-36 w-auto mx-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-white">{episode.title}</h2>
                    <h4 className="text-white">{episode.airDate}</h4>
                    <h4 className="text-white">{`${episode.duration} min`}</h4>
                    <h4 className="text-yellow-400">
                      <StarRateRounded />
                      {`${episode.rating}/10`}
                    </h4>
                  </div>
                  <Button
                    key={episode.id}
                    onClick={() => viewEpisode(episode.id)}
                    className="mr-2"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ViewSeason.propTypes = {
  seasonId: PropTypes.string.isRequired,
};

export default ViewSeason;
