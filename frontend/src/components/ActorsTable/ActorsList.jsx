/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Button, Select, TextInput } from 'flowbite-react';
import {
  ArrowBackIos, ArrowForwardIos, KeyboardArrowDown, KeyboardArrowUp, Search,
} from '@mui/icons-material';

import {
  Box, FormControl, InputLabel, MenuItem,
} from '@mui/material';
import { fetchActors } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

function ActorsList() {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);
  const [prev, setPrev] = useState();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [field, setField] = useState('name');
  const [order, setOrder] = useState(false);
  const [gender, setGender] = useState('');
  const genders = ['Male', 'Female', 'Unknown'];
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
    const getActors = async () => {
      try {
        const { data } = await fetchActors(page, limit, search, field, order, gender);
        setActors(data?.actors);
        setPrev(data?.pagination?.previous);
        setPage(data?.pagination?.current);
        setNext(data?.pagination?.next);
        setLimit(data?.pagination?.current?.limit);
        setLoading(false);
      } catch (err) {
        console.error('Error while fetching actors', err);
        setLoading(false);
      }
    };
    getActors();
  }, [page, limit, search, field, order, gender]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  return (
    <>
      <div className="flex self-center">
        <TextInput
          name="actor"
          type="text"
          className="dark w-auto md:w-60"
          placeholder="Actor Name"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          value={search}
        />
        <Button
          type="button"
          className="dark w-10 h-10"
        >
          <Search fontSize="small" />
        </Button>
      </div>
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Actors List</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            <th>
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
            <th>Profile</th>
            <th>
              Name
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('name')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th>
              Gender
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Genre</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Genre"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setPage(1);
                    }}
                    sx={{ color: 'white' }}
                  >
                    {genders && genders.map((item) => (
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
            <th>
              Popularity
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('popularity')}
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
          {actors.map((person) => (
            <tr className="">
              <td>{person.actorId}</td>
              <td><img src={IMG_URL + person.profile} alt="" className="w-15 h-20" /></td>
              <td>{person.name}</td>
              <td>{person.gender}</td>
              <td>{person.popularity}</td>
              <td>{person._id}</td>
            </tr>
          ))}
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
  );
}

export default ActorsList;
