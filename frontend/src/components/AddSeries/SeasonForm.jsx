/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import React, { useState } from 'react';
import { StarRateRounded } from '@mui/icons-material';
import YouTube from 'react-youtube';
import { toast } from 'react-toastify';
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
            <Label htmlFor="title" value="Title" className="text-white" />
          </div>
          <TextInput
            name="title"
            type="text"
            className="dark"
            readOnly
            defaultValue={season ? season.title : ''}
          />
          <div className="mb-1 block">
            <Label htmlFor="date" value="Release Date" className="text-white" />
          </div>
          <TextInput
            name="date"
            type="text"
            className="dark"
            defaultValue={season ? season.airDate : ''}
          />
          <div className="mb-1 block">
            <Label htmlFor="rating" value="Rating" className="text-white" />
          </div>
          <TextInput
            name="rating"
            type="text"
            className="dark"
            defaultValue={season ? season.rating : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <Label htmlFor="summary" value="Summary" className="text-white" />
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
      <Label htmlFor="seasons" value="Episodes" className="text-white" />
      <div className="cards-carousal">
        {season.episodes.map((episode) => (
          <div key={episode.id} className="flex flex-col mx-2">
            <div>
              <img
                src={IMG_URL + episode.poster}
                alt="poster"
                className="h-44 w-64 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-36 h-20 overflow-hidden">
                <h2 className="text-white">{episode.title}</h2>
                <h4 className="text-white">{episode.airDate}</h4>
              </div>
              <div>
                <h4 className="text-yellow-400">
                  <StarRateRounded />
                  {`${episode.rating.toFixed(1)}/10`}
                </h4>
                <h4 className="text-white">{`${episode.duration} min`}</h4>
              </div>
            </div>
            <Button
              key={episode.id}
              onClick={() => addEpisodeDetails(episode.showId, season.id, episode.id, episode.seasonNum, episode.episodeNum)}
              className="mr-2 w-20"
            >
              Add
            </Button>
          </div>
        ))}
      </div>
      <Label htmlFor="trailer" value="Poster & Videos" className="text-white" />
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

export default SeasonForm;
