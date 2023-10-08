import React, { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Button, Input } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { searchShowInstance } from '../../axios/axiosInstance';
import ShowResults from './ShowResults';
import ShowForm from './ShowForm';
import SeasonForm from './SeasonForm';

function AddSeries() {
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(null);
  const [season, setSeason] = useState(null);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const searchMovie = async (pageNo, search, release) => {
    await searchShowInstance.get(`&page=${pageNo}&query=${search}&first_air_date_year=${release}`)
      .then((res) => {
        setShow(null);
        setSeason(null);
        setMaxPage(res.data?.total_pages);
        setResults(res.data?.results);
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
  const handleShowUpdate = (newShow) => {
    setResults(null);
    setSeason(null);
    setShow(newShow);
  };
  const handleSeasonUpdate = (newSeason) => {
    setResults(null);
    setShow(null);
    setSeason(newSeason);
  };
  return (
    <div className="w-auto m-2">
      <h3 className="text-xl font-medium m-2 text-white">
        Add Series
      </h3>
      <div className="flex gap-3 mb-2">
        <Input
          name="movie"
          type="text"
          className="dark w-auto md:w-60"
          placeholder="Movie Title"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Input
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
        {results
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
      { results && !show && <ShowResults results={results} onShowSelect={handleShowUpdate} /> }
      { show && !season && <ShowForm show={show} onSeasonSelect={handleSeasonUpdate} /> }
      { season && !show && <SeasonForm season={season} /> }
    </div>
  );
}

export default AddSeries;
