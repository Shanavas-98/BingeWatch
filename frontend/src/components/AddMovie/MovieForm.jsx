/* eslint-disable react/prop-types */
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import YouTube from 'react-youtube';
import { addMovie } from '../../services/adminApi';
import { imgUrl } from '../../axios/apiUrls';

function MovieForm({ movie }) {
  const [loading, setLoading] = useState(false);
  const opts = {
    height: '300',
    width: '50%',
    playerVars: {
      autoplay: 0,
    },
  };
  const selectedImages = movie.images.slice(0, 6);
  const add = async (id) => {
    try {
      setLoading(!loading);
      const { data } = await addMovie(id);
      console.log(data);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center',
      });
    }
  };
  return (
    <>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1">
          <div className="mb-1 block">
            <Label htmlFor="title" value="Movie Title" className="text-white" />
          </div>
          <TextInput
            name="title"
            type="text"
            className="dark"
            readOnly
            defaultValue={movie ? movie.title || movie.original_title : ''}
          />
        </div>
        <div className="col-span-1">
          <div className="mb-1 block">
            <Label htmlFor="language" value="Language" className="text-white" />
          </div>
          <TextInput
            name="language"
            type="text"
            className="dark"
            readOnly
            defaultValue={movie ? movie.language : ''}
          />
        </div>
        <div className="col-span-1">
          <div className="mb-1 block">
            <Label htmlFor="duration" value="Duration" className="text-white" />
          </div>
          <TextInput
            name="duration"
            type="text"
            className="dark"
            readOnly
            defaultValue={movie ? movie.duration : ''}
          />
        </div>
        <div className="col-span-1">
          <div className="mb-1 block">
            <Label htmlFor="rating" value="Rating" className="text-white" />
          </div>
          <TextInput
            name="rating"
            type="text"
            className="dark"
            defaultValue={movie ? movie.rating : ''}
          />
        </div>
        <div className="col-span-1">
          <div className="mb-1 block">
            <Label htmlFor="date" value="Release Date" className="text-white" />
          </div>
          <TextInput
            name="date"
            type="text"
            className="dark"
            defaultValue={movie ? movie.releaseDate : ''}
          />
        </div>
        <div className="col-span-1">
          <div className="mb-1 block">
            <Label htmlFor="genres" value="Genres" className="text-white" />
          </div>
          <TextInput
            name="genres"
            type="text"
            className="dark"
            defaultValue={movie ? movie.genres : ''}
          />
        </div>
        <div className="col-span-2">
          <div className="mb-1 block">
            <Label htmlFor="summary" value="Summary" className="text-white" />
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
      <Label htmlFor="posters" value="Posters" className="text-white" />
      <div className="w-full flex">
        {selectedImages.map((image, index = 1) => (
          <img key={index} src={imgUrl + image} alt={`poster${index}`} className="h-60 w-36 m-2" />
        ))}
      </div>
      <Label htmlFor="trailer" value="Trailer" className="text-white" />
      <div>
        <YouTube videoId={movie.videos[0]} opts={opts} />
      </div>
      <div className="w-full my-2">
        {loading ? <Button isProcessing type="button" className="dark">Add</Button>
          : <Button type="button" className="dark" onClick={() => add(movie.id)}>Add</Button>}
      </div>
    </>
  );
}

export default MovieForm;
