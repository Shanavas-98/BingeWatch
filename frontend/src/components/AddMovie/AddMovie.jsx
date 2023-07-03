/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextInput,
} from 'flowbite-react';
import { toast } from 'react-toastify';
import { searchUrl } from '../../axios/apiUrls';
import { tmdbInstance } from '../../axios/axiosInstance';
import MovieForm from './MovieForm';
import MovieList from './MovieList';

function AddMovie() {
  const [results, setResults] = useState([]);
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');
  const searchMovie = () => {
    tmdbInstance.get(searchUrl + query)
      .then((res) => {
        setMovie(null);
        setResults(res.data.results);
      }).catch((err) => {
        toast.error(err.message, {
          position: 'top-center',
        });
      });
  };
  const handleMovieUpdate = (newMovie) => {
    setMovie(newMovie);
  };

  return (
    <div className="w-auto m-2">
      <h3 className="text-xl font-medium m-2 text-white">
        Add Movie
      </h3>
      <div className="flex gap-3">
        <TextInput
          name="movie"
          type="text"
          className="dark w-auto md:w-60"
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
      {results && !movie && <MovieList results={results} onMovieSelect={handleMovieUpdate} />}
      {movie && <MovieForm movie={movie} />}
    </div>
  );
}

export default AddMovie;
