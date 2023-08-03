import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput } from 'flowbite-react';
import {
  ArrowBackIos, ArrowForwardIos, KeyboardArrowDown, KeyboardArrowUp, Search,
} from '@mui/icons-material';

import {
  Box, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { fetchMovies } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

export default function MovieTable() {
  const navigate = useNavigate();
  const viewMovie = (movieId) => {
    navigate(`/admin/movies/view-movie/${movieId}`);
  };
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');
  const [prev, setPrev] = useState();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [field, setField] = useState('title');
  const [order, setOrder] = useState(true);
  const handleNextPage = (pageNo) => {
    setPage(pageNo + 1);
  };
  const handlePrevPage = (pageNo) => {
    setPage(pageNo - 1);
  };
  const handleSort = (key) => {
    setField(key);
    setOrder(!order);
  };
  useEffect(() => {
    console.log('fetching movies', genreId);
    const getMovies = async () => {
      try {
        const { data } = await fetchMovies(page, limit, search, year, field, order, genreId);
        setMovies(data?.movies);
        setGenres(data?.genres);
        setPrev(data?.pagination?.previous);
        setPage(data?.pagination?.current);
        setNext(data?.pagination?.next);
        setLimit(data?.pagination?.current?.limit);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setLoading(false);
      }
    };
    getMovies();
  }, [page, limit, search, year, field, order, genreId]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  return (
    <>
      <div className="flex justify-between">
        <Button
          type="button"
          className="dark m-2"
          onClick={() => navigate('/admin/movies/add-movie')}
        >
          Add Movie
        </Button>
        <div className="flex self-center">
          <TextInput
            name="movie"
            type="text"
            className="dark w-auto md:w-60"
            placeholder="Movie Title"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
          />
          <TextInput
            name="year"
            type="text"
            className="dark"
            placeholder="Release Year"
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            value={year}
          />
          <Button
            type="button"
            className="dark w-10 h-10"
          >
            <Search fontSize="small" />
          </Button>
        </div>
      </div>
      {movies?.length > 0
      && (
      <>
        <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Movies List</h1>
        <table className="table-fixed w-full mx-1">
          <thead className="text-white text-justify bg-slate-700">
            <tr>
              <th className="flex justify-between">
                ID
                <Button
                  type="button"
                  className="dark bg-transparent w-10"
                  onClick={() => handleSort('id')}
                >
                  {order
                    ? <KeyboardArrowDown fontSize="medium" />
                    : <KeyboardArrowUp fontSize="medium" />}
                </Button>
              </th>
              <th>Poster</th>
              <th className="flex justify-between self-center">
                Title
                <Button
                  type="button"
                  className="dark bg-transparent w-10"
                  onClick={() => handleSort('title')}
                >
                  {order
                    ? <KeyboardArrowDown fontSize="medium" />
                    : <KeyboardArrowUp fontSize="medium" />}
                </Button>
              </th>
              <th>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Genre</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Genre"
                      onChange={(e) => {
                        setGenreId(e.target.value);
                        setPage(1);
                      }}
                      sx={{ color: 'white' }}
                    >
                      {genres && genres.map((item) => (
                        <MenuItem
                          value={item._id}
                          sx={{
                            color: 'white',
                            backgroundColor: 'black',
                            '&:hover': {
                              backgroundColor: 'grey', // Change hovering color to grey
                            },
                            '&.Mui-selected': {
                              backgroundColor: 'grey', // Change selected item background to grey
                            },
                            '&.Mui-selected:hover': {
                              backgroundColor: 'grey', // Change selected item background when hovered to grey
                            },
                          }}
                        >
                          {item.genreName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </th>
              <th>Duration</th>
              <th>Language</th>
              <th className="flex justify-between">
                Release
                <Button
                  type="button"
                  className="dark bg-transparent w-10"
                  onClick={() => handleSort('releaseDate')}
                >
                  {order
                    ? <KeyboardArrowDown fontSize="medium" />
                    : <KeyboardArrowUp fontSize="medium" />}
                </Button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {movies?.map((item) => {
              const genreNames = item.genres?.map((obj) => obj.genreName).join(', ');
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td><img src={IMG_URL + item.images[0]} alt="" className="w-15 h-20" /></td>
                  <td>{item.title}</td>
                  <td>{genreNames}</td>
                  <td>{item.duration}</td>
                  <td>{item.language}</td>
                  <td>{item.releaseDate}</td>
                  <td>
                    <Button
                      key={item.id}
                      variant="outlined"
                      color="primary"
                      size="medium"
                      onClick={() => viewMovie(item._id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center">
          {prev
            ? (
              <>
                <Button
                  type="button"
                  className="dark w-10 h-10"
                  onClick={() => handlePrevPage(page)}
                >
                  <ArrowBackIos fontSize="small" />
                </Button>
                <Button
                  type="button"
                  className="dark w-10 h-10 hover:cursor-default"
                >
                  {prev}
                </Button>

              </>
            )
            : (
              <Button
                type="button"
                className="dark w-10 h-10"
                disabled
              >
                <ArrowBackIos fontSize="small" />
              </Button>
            )}
          <Button
            type="button"
            className="dark bg-green-950 w-10 h-10 hover:cursor-default"
          >
            {page}
          </Button>

          {next
            ? (
              <>
                <Button
                  type="button"
                  className="dark w-10 h-10 hover:cursor-default"
                >
                  {next}
                </Button>
                <Button
                  type="button"
                  className="dark w-10 h-10"
                  onClick={() => handleNextPage(page)}
                >
                  <ArrowForwardIos fontSize="small" />
                </Button>

              </>
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

      </>
      )}
    </>
  );
}
