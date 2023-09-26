import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { StarRateRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  Button, FormLabel, Input, Textarea,
} from '@chakra-ui/react';

import { IMG_URL } from '../../axios/apiUrls';
import { addEpisode, addSeason } from '../../services/adminApi';

function SeasonForm({ season }) {
  const opts = {
    height: '200',
    width: '350',
    playerVars: {
      autoplay: 0,
    },
  };
  const [loading, setLoading] = useState(false);
  const addSeasonDetails = async (showId, seasonId, seasonNum) => {
    try {
      setLoading(!loading);
      const { data } = await addSeason(showId, seasonId, seasonNum);
      if (data.success) {
        setLoading(false);
        toast.success(data.message, { position: 'top-right' });
      } else {
        setLoading(false);
        throw Error(data.message);
      }
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    }
  };
  const addEpisodeDetails = async (showId, seasonId, episodeId, seasonNum, episodeNum) => {
    try {
      setLoading(!loading);
      const { data } = await addEpisode(showId, seasonId, episodeId, seasonNum, episodeNum);
      if (data.success) {
        setLoading(false);
        toast.success(data.message, { position: 'top-right' });
      } else {
        setLoading(false);
        throw Error(data.message);
      }
    } catch (err) {
      toast.error(err.message, { position: 'top-center' });
    }
  };
  return (
    <>
      <div className="w-full my-2">
        {loading ? <Button isProcessing type="button" className="dark">Add</Button>
          : <Button type="button" className="dark" onClick={() => addSeasonDetails(season.showId, season.id, season.seasonNum)}>Add</Button>}
      </div>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Title</FormLabel>
          </div>
          <Input
            name="title"
            type="text"
            className="dark"
            readOnly
            defaultValue={season ? season.title : ''}
          />
          <div className="mb-1 block">
            <FormLabel>Release Date</FormLabel>
          </div>
          <Input
            name="date"
            type="text"
            className="dark"
            defaultValue={season ? season.airDate : ''}
          />
          <div className="mb-1 block">
            <FormLabel>Rating</FormLabel>
          </div>
          <Input
            name="rating"
            type="text"
            className="dark"
            defaultValue={season ? season.rating : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Summary</FormLabel>
          </div>
          <Textarea
            name="summary"
            type="text"
            rows={5}
            className="bg-slate-700 text-white "
            defaultValue={season ? season.summary : ''}
          />
        </div>
      </div>
      <FormLabel>Episodes</FormLabel>
      <div className="cards-carousal">
        {season.episodes.map((ep) => (
          <div key={ep.id} className="flex flex-col mx-2">
            <div>
              <img
                src={IMG_URL + ep.poster}
                alt="poster"
                className="h-44 w-64 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-36 h-20 overflow-hidden">
                <h2 className="text-white">{ep.title}</h2>
                <h4 className="text-white">{ep.airDate}</h4>
              </div>
              <div>
                <h4 className="text-yellow-400">
                  <StarRateRounded />
                  {`${ep.rating.toFixed(1)}/10`}
                </h4>
                <h4 className="text-white">{`${ep.duration} min`}</h4>
              </div>
            </div>
            <Button
              key={ep.id}
              onClick={() => (
                addEpisodeDetails(ep.showId, season.id, ep.id, ep.seasonNum, ep.episodeNum)
              )}
              className="mr-2 w-20"
            >
              Add
            </Button>
          </div>
        ))}
      </div>
      <FormLabel>Poster & Videos</FormLabel>
      <div className="cards-carousal">
        <img
          src={IMG_URL + season.poster}
          alt="poster"
          className="h-60 w-36 mx-2 rounded-md"
        />
        {season?.videos?.map((key) => (
          <div className="m-1">
            <YouTube videoId={key} opts={opts} />
          </div>
        ))}
      </div>
    </>
  );
}

SeasonForm.propTypes = {
  season: PropTypes.shape({
    id: PropTypes.number.isRequired,
    showId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    airDate: PropTypes.string.isRequired,
    summary: PropTypes.string,
    poster: PropTypes.string.isRequired,
    seasonNum: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    episodes: PropTypes.arrayOf(PropTypes.shape),
    videos: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default SeasonForm;
