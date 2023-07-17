/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextInput,
} from 'flowbite-react';
import { toast } from 'react-toastify';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

import { searchMovieInstance } from '../../axios/axiosInstance';
import MovieForm from './MovieForm';
import SearchList from './SearchList';

function AddMovie() {
  const [results, setResults] = useState([]);
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const searchMovie = async (pageNo, search, release) => {
    await searchMovieInstance.get(`&page=${pageNo}&query=${search}&primary_release_year=${release}`)
      .then((res) => {
        setMovie(null);
        setMaxPage(res.data.total_pages);
        setResults(res.data.results);
      }).catch((err) => {
        toast.error(err.message, {
          position: 'top-center',
        });
      });
  };
  const handleSearch = () => {
    setPage(1);
    searchMovie(1, query, year);
  };
  const handleNextPage = (pageNo) => {
    setPage(pageNo + 1);
    searchMovie(page + 1, query, year);
  };
  const handlePrevPage = (pageNo) => {
    setPage(pageNo - 1);
    searchMovie(page - 1, query, year);
  };
  const handleMovieUpdate = (newMovie) => {
    setMovie(newMovie);
  };

  return (
    <div className="w-auto m-2">
      <h3 className="text-xl font-medium m-2 text-white">
        Add Movie
      </h3>
      <div className="flex gap-3 mb-2">
        <TextInput
          name="movie"
          type="text"
          className="dark w-auto md:w-60"
          placeholder="Movie Title"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <TextInput
          name="year"
          type="text"
          className="dark"
          placeholder="Release Year"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        />
        <Button
          type="button"
          className="dark"
          onClick={handleSearch}
        >
          Search
        </Button>
        {results.length > 0
        && (
        <div className="flex">
          {page < 2
            ? (
              <Button
                type="button"
                className="dark w-10 h-10"
                disabled
              >
                <ArrowBackIos fontSize="small" />
              </Button>
            )
            : (
              <Button
                type="button"
                className="dark w-10 h-10"
                onClick={() => handlePrevPage(page)}
              >
                <ArrowBackIos fontSize="small" />
              </Button>
            )}
          <Button
            type="button"
            className="dark w-10 h-10 hover:cursor-default"
          >
            {page}
          </Button>
          {page < maxPage
            ? (
              <Button
                type="button"
                className="dark w-10 h-10"
                onClick={() => handleNextPage(page)}
              >
                <ArrowForwardIos fontSize="small" />
              </Button>
            )
            : (
              <Button
                type="button"
                className="dark w-10 h-10"
                disabled
              >
                <ArrowForwardIos fontSize="small" />
              </Button>
            )}
        </div>
        )}

      </div>
      { results && !movie && <SearchList results={results} onMovieSelect={handleMovieUpdate} /> }
      { movie && <MovieForm movie={movie} /> }
    </div>
  );
}

export default AddMovie;

// "total_pages": 2
