import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import {
  Button, FormLabel, Input, Textarea,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { StarRateRounded } from '@mui/icons-material';

import { IMG_URL } from '../../axios/apiUrls';
import CardCarousal from '../CardCarousal/CardCarousal';
import { addShow } from '../../services/adminApi';
import { tmdbInstance } from '../../axios/axiosInstance';

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

function ShowForm({ show, onSeasonSelect }) {
  const [loading, setLoading] = useState(false);
  const opts = {
    height: '200',
    width: '350',
    playerVars: {
      autoplay: 0,
    },
  };
  const addShowDetails = async (id) => {
    try {
      setLoading(!loading);
      const { data } = await addShow(id);
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
  const getSeason = async (showId, seasonNum) => {
    const { data } = await tmdbInstance.get(`/tv/${showId}/season/${seasonNum}?api_key=${TMDB_KEY}&append_to_response=videos`);
    const {
      air_date, episodes, name, overview, id,
      poster_path, season_number, vote_average, videos,
    } = data;
    const trailers = videos.results
      .filter((video) => (video.official === true || video.type === 'Trailer' || video.type === 'Teaser'))
      .slice(0, 10)
      .map((video) => (video.key));
    const episodesDetails = episodes.map((episode) => (
      {
        airDate: episode.air_date,
        episodeNum: episode.episode_number,
        id: episode.id,
        title: episode.name,
        duration: episode.runtime,
        seasonNum: episode.season_number,
        showId: episode.show_id,
        poster: episode.still_path,
        rating: episode.vote_average,
      }
    ));
    const season = {
      id,
      showId,
      title: name,
      airDate: air_date,
      summary: overview,
      poster: poster_path,
      seasonNum: season_number,
      rating: vote_average,
      episodes: episodesDetails,
      videos: trailers,
    };
    onSeasonSelect(season);
  };
  const castCards = show.casts?.map((person) => ({
    id: person.id,
    key: person.id,
    title: person.name,
    subtitle: person.character,
    image: person.profile,
  }));
  const crewCards = show.crews?.map((person) => ({
    id: person.id,
    key: person.id,
    title: person.name,
    subtitle: person.job,
    image: person.profile,
  }));
  const cardStyle = {
    wd: 'w-28',
    ht: 'h-44',
  };
  return (
    <>
      <div className="w-full my-2">
        {loading ? <Button isProcessing type="button" className="dark">Add</Button>
          : <Button type="button" className="dark" onClick={() => addShowDetails(show.id)}>Add</Button>}
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
            defaultValue={show ? show.title : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel htmlFor="language" value="Language" className="text-white" />
            <FormLabel>Language</FormLabel>
          </div>
          <Input
            name="language"
            type="text"
            className="dark"
            readOnly
            defaultValue={show ? show.language : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Release Date</FormLabel>
          </div>
          <Input
            name="date"
            type="text"
            className="dark"
            defaultValue={show ? show.airDate : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>End Date</FormLabel>
          </div>
          <Input
            name="duration"
            type="text"
            className="dark"
            readOnly
            defaultValue={show ? show.endDate : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Rating</FormLabel>
          </div>
          <Input
            name="rating"
            type="text"
            className="dark"
            defaultValue={show ? show.rating : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Genres</FormLabel>
          </div>
          <Input
            name="genres"
            type="text"
            className="dark"
            defaultValue={show ? show.genres : ''}
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
            defaultValue={show ? show.summary : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <FormLabel>Title</FormLabel>
          <div className="cards-carousal">
            {show.platforms.map((platform, index = 1) => (
              <img
                key={index}
                src={IMG_URL + platform.logo_path}
                alt={platform.provider_name}
                className="h-20 w-20 m-2 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      <FormLabel>Seasons</FormLabel>
      <div className="cards-carousal">
        {show.seasons.map((season) => (
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
                onClick={() => getSeason(show.id, season.seasonNum)}
                className="mr-2"
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
      <FormLabel>Images</FormLabel>
      <div className="cards-carousal">
        <img
          src={IMG_URL + show.poster}
          alt="poster"
          className="h-48 w-32 mx-1 rounded-md"
        />
        {show?.images?.map((path) => (
          <img
            src={IMG_URL + path}
            alt="poster"
            className="h-44 w-80 m-1 rounded-md"
          />
        ))}
      </div>
      <FormLabel>Videos</FormLabel>
      <div className="cards-carousal">
        {show?.videos?.map((key) => (
          <div className="m-1">
            <YouTube videoId={key} opts={opts} />
          </div>
        ))}
      </div>
      <FormLabel>Casts</FormLabel>
      <CardCarousal cards={castCards} baseLink="" style={cardStyle} />
      <FormLabel>Crews</FormLabel>
      <CardCarousal cards={crewCards} baseLink="" style={cardStyle} />
    </>
  );
}

ShowForm.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    airDate: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    totalEpisodes: PropTypes.number.isRequired,
    totalSeasons: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    videos: PropTypes.arrayOf(PropTypes.string),
    seasons: PropTypes.arrayOf(PropTypes.shape),
    platforms: PropTypes.arrayOf(PropTypes.shape),
    casts: PropTypes.arrayOf(PropTypes.shape),
    crews: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  onSeasonSelect: PropTypes.func.isRequired,
};

export default ShowForm;
