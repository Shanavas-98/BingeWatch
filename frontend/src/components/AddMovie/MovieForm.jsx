import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormLabel, Input, Textarea,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import YouTube from 'react-youtube';

import { addMovie } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';
import CardCarousal from '../CardCarousal/CardCarousal';

function MovieForm({ movie }) {
  const [loading, setLoading] = useState(false);
  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const add = async (id) => {
    try {
      setLoading(!loading);
      const { data } = await addMovie(id);
      console.log('addmovie data', data);
      if (data.success) {
        setLoading(false);
        toast.success(data.message, { position: 'top-right' });
      } else {
        setLoading(false);
        throw Error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message, { position: 'top-center' });
    }
  };
  const castCards = movie.cast?.map((person) => ({
    id: person._id,
    key: person.castId,
    title: person.name,
    subtitle: person.character,
    image: person.profile,
  }));
  const crewCards = movie.crew?.map((person) => ({
    id: person._id,
    key: person.crewId,
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
          : <Button type="button" className="dark" onClick={() => add(movie?.id)}>Add</Button>}
      </div>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Movie Title</FormLabel>
          </div>
          <Input
            name="title"
            type="text"
            className="dark"
            readOnly
            defaultValue={movie ? movie.title : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Language</FormLabel>
          </div>
          <Input
            name="language"
            type="text"
            className="dark"
            readOnly
            defaultValue={movie ? movie.language : ''}
          />
        </div>
        <div className="col-span-1 w-auto">
          <div className="mb-1 block">
            <FormLabel>Duration</FormLabel>
          </div>
          <Input
            name="duration"
            type="text"
            className="dark"
            readOnly
            defaultValue={movie ? movie.duration : ''}
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
            defaultValue={movie ? movie.rating : ''}
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
            defaultValue={movie ? movie.releaseDate : ''}
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
            defaultValue={movie ? movie.genres : ''}
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
            defaultValue={movie ? movie.summary : ''}
          />
        </div>
      </div>
      <FormLabel>Platforms</FormLabel>
      <div className="w-full flex">
        {movie.platforms.map((platform, index = 1) => (
          <img key={index} src={IMG_URL + platform.logo_path} alt={platform.provider_name} className="h-20 w-20 m-2 rounded-lg" />
        ))}
      </div>
      <FormLabel>Posters</FormLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {movie?.images?.map((image, index = 1) => (
          <img key={index} src={IMG_URL + image} alt={`poster${index}`} className="h-60 w-36 m-2 rounded-md" />
        ))}
      </div>
      <FormLabel>Videos</FormLabel>
      {movie.videos
      && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {movie?.videos?.map((key) => (
          <div className="m-1">
            <YouTube videoId={key} opts={opts} />
          </div>
        ))}
      </div>
      )}
      <FormLabel>Casts</FormLabel>
      <CardCarousal cards={castCards} baseLink="" style={cardStyle} />
      <FormLabel>Crews</FormLabel>
      <CardCarousal cards={crewCards} baseLink="" style={cardStyle} />
    </>
  );
}

MovieForm.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    releaseDate: PropTypes.string.isRequired,
    summary: PropTypes.string,
    genres: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    videos: PropTypes.arrayOf(PropTypes.string),
    platforms: PropTypes.arrayOf(PropTypes.shape),
    cast: PropTypes.arrayOf(PropTypes.shape),
    crew: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
};

export default MovieForm;
