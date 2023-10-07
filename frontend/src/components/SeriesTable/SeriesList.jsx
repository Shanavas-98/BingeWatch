import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';
import {
  ArrowBackIos, ArrowForwardIos, KeyboardArrowDown, KeyboardArrowUp, Search,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

import { fetchSeries } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

function SeriesList() {
  const navigate = useNavigate();
  const viewSeries = (seriesId) => {
    navigate(`/admin/series/show/${seriesId}`);
  };
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
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
    const getSeries = async () => {
      try {
        const { data } = await fetchSeries(page, limit, search, year, field, order, genreId);
        setSeries(data?.shows);
        setGenres(data?.genres);
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
    getSeries();
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
      <div className="flex p-2 justify-between bg-slate-900 text-white">
        <Button
          type="button"
          className="dark m-2"
          onClick={() => navigate('/admin/series/add-show')}
        >
          Add Series
        </Button>
        <span className="self-center text-lg font-bold">Series Table</span>
        <div className="flex self-center pr-2">
          <Input
            name="movie"
            type="text"
            className="dark w-auto md:w-52"
            placeholder="Show Title"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
          />
          <Input
            name="year"
            type="text"
            className="dark w-28"
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
      <table className="w-full text-white">
        <thead className="bg-slate-700 w-full">
          <tr className="flex justify-between w-full">
            <th className="flex justify-around">
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
            <th className="flex justify-around">Poster</th>
            <th className="flex justify-around">
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
              <select
                name="genre"
                className="bg-slate-700 border-0 max-h-60"
                onChange={(e) => {
                  setGenreId(e.target.value);
                  setPage(1);
                }}
              >
                <option defaultValue="">Genres</option>
                {genres && genres.map((item) => (
                  <option value={item._id}>{item.genreName}</option>
                ))}
              </select>
            </th>
            <th>Language</th>
            <th className="flex justify-around">
              Air Date
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('airDate')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="flex justify-around">
              End Date
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('endDate')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        {series.length > 0 ? (
          <tbody className="w-full">
            {series.map((item) => {
              const genreNames = item.genres?.map((genre) => genre.genreName).join(', ');
              return (
                <tr className="flex w-full">
                  <td className="w-full pl-10">{item.id}</td>
                  <td className="w-full pl-10"><img src={IMG_URL + item.poster} alt="" className="w-15 h-20" /></td>
                  <td className="w-full pl-10">{item.title}</td>
                  <td className="w-full pl-10">{genreNames}</td>
                  <td className="w-full pl-10">{item.language}</td>
                  <td className="w-full pl-10">{item.airDate}</td>
                  <td className="w-full pl-10">{item.endDate}</td>
                  <td className="w-full pl-10">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="medium"
                      onClick={() => viewSeries(item._id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <div className="text-lg font-bold p-5">Show not found!</div>
        )}
      </table>
      {series.length > 0
      && (
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
      )}
    </>
  );
}

export default SeriesList;
