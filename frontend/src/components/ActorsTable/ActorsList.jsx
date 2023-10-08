import React, { useEffect, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import {
  ArrowBackIos,
  ArrowForwardIos,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Search,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
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
        const { data } = await fetchActors(
          page,
          limit,
          search,
          field,
          order,
          gender,
        );
        setActors(data?.actors);
        setPrev(data?.pagination?.previous);
        setPage(data?.pagination?.current);
        setNext(data?.pagination?.next);
        setLimit(data?.pagination?.limit);
        setLoading(false);
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
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
      <div className="flex justify-between bg-slate-900 p-2 text-white">
        <span className="self-center text-lg font-bold">Actors Table</span>
        <div className="flex">
          <Input
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
          <Button type="button" className="dark w-10 h-10">
            <Search fontSize="small" />
          </Button>
        </div>
      </div>
      <table className="w-full text-white">
        <thead className="text-justify bg-slate-700">
          <tr>
            <th className="flex justify-between">
              ID
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('actorId')}
              >
                {order ? (
                  <KeyboardArrowDown fontSize="medium" />
                ) : (
                  <KeyboardArrowUp fontSize="medium" />
                )}
              </Button>
            </th>
            <th>Profile</th>
            <th className="flex justify-between">
              Name
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('name')}
              >
                {order ? (
                  <KeyboardArrowDown fontSize="medium" />
                ) : (
                  <KeyboardArrowUp fontSize="medium" />
                )}
              </Button>
            </th>
            <th>
              <select
                name="Genders"
                id="genders"
                className="bg-slate-700 border-0"
                onChange={(e) => {
                  setGender(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">Genders</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Unknown">Unknown</option>
              </select>
            </th>
            <th className="flex justify-between">
              Popularity
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('popularity')}
              >
                {order ? (
                  <KeyboardArrowDown fontSize="medium" />
                ) : (
                  <KeyboardArrowUp fontSize="medium" />
                )}
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {actors?.map((person) => (
            <tr className="">
              <td>{person?.actorId}</td>
              <td>
                <img
                  src={`${IMG_URL}${person?.profile}`}
                  alt=""
                  className="w-15 h-20"
                />
              </td>
              <td>{person?.name}</td>
              <td>{person?.gender}</td>
              <td>{person?.popularity}</td>
              <td>view</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        {prev ? (
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
        ) : (
          <Button type="button" className="dark w-10 h-10" disabled>
            <ArrowBackIos fontSize="small" />
          </Button>
        )}
        <Button
          type="button"
          className="dark bg-green-950 w-10 h-10 hover:cursor-default"
        >
          {page}
        </Button>

        {next ? (
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
        ) : (
          <Button type="button" className="dark w-10 h-10" disabled>
            <ArrowForwardIos fontSize="small" />
          </Button>
        )}
      </div>
    </>
  );
}

export default ActorsList;
