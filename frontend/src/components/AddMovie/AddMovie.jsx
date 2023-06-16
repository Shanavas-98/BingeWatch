import React, { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { tmdbInstance } from '../../axios/axiosInstance';
import { searchUrl } from '../../axios/apiUrls';

function AddMovie() {
  const [movie, setMovie] = useState();
  const [query, setQuery] = useState();
  const searchMovie = () => {
    tmdbInstance.get(searchUrl + query)
      .then((res) => {
        setMovie(res.data.results[0]);
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
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
      <div>
        <h1 className="text-white">
          {movie ? movie.title || movie.original_title || movie.original_title : ''}
        </h1>
      </div>
    </div>
  );
}

export default AddMovie;
