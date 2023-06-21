import React, { useState } from 'react';
import {
  Button, Label, TextInput, Textarea,
} from 'flowbite-react';
import { toast } from 'react-toastify';
// import { TextField } from '@mui/material';
import { tmdbInstance } from '../../axios/axiosInstance';
import { searchUrl } from '../../axios/apiUrls';
import { addMovie } from '../../services/adminApi';

function AddMovie() {
  const [movie, setMovie] = useState();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const searchMovie = () => {
    tmdbInstance.get(searchUrl + query)
      .then((res) => {
        setMovie(res.data.results[0]);
      }).catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: 'top-center',
        });
      });
  };
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
    <div className="w-full">
      <h3 className="text-xl font-medium m-2 text-white">
        Add Movie
      </h3>
      <div className="w-auto flex">
        <TextInput
          name="movie"
          type="text"
          className="dark"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Button
          type="button"
          className="dark"
          onClick={searchMovie}
        >
          Search
        </Button>
      </div>
      <div className="w-1/2">
        <div className="flex">
          <div>
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
          <div>
            <div className="mb-1 block">
              <Label htmlFor="language" value="Language" className="text-white" />
            </div>
            <TextInput
              name="language"
              type="text"
              className="dark"
              readOnly
              defaultValue={movie ? movie.original_language : ''}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="overview" value="Movie overview" className="text-white" />
          </div>
          <Textarea
            name="overview"
            type="text"
            className="dark"
            defaultValue={movie ? movie.overview : ''}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="rating" value="Rating" className="text-white" />
          </div>
          <TextInput
            name="rating"
            type="text"
            className="dark"
            defaultValue={movie ? movie.vote_average : ''}
          />
        </div>
        <div>
          <div className="mb-1 block">
            <Label htmlFor="date" value="Release Date" className="text-white" />
          </div>
          <TextInput
            name="date"
            type="text"
            className="dark"
            defaultValue={movie ? movie.release_date : ''}
          />
        </div>
        <div className="w-full my-2">
          {loading ? <Button isProcessing type="button" className="dark">Add</Button>
            : <Button type="button" className="dark" onClick={() => add(movie.id)}>Add</Button>}
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
