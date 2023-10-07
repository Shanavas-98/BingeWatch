import { Button, Input } from '@chakra-ui/react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { searchContents } from '../../services/userApi';
import MovieTiles from './MovieTiles';
import ShowTiles from './ShowTiles';

function Search() {
  // const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [prev, setPrev] = useState();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState();
  const [limit, setLimit] = useState(10);
  const searchMovie = async (pageNo, search, release) => {
    try {
      const { data } = await searchContents(search, release, pageNo, limit);
      setMovies(data?.movies);
      setSeries(data?.shows);
      setPrev(data?.pagination?.previous);
      setPage(data?.pagination?.current);
      setNext(data?.pagination?.next);
      setLimit(data?.pagination?.limit);
      // setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
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
  // if (loading) {
  //   return (
  //     <div>
  //       <h1 className="text-white">Loading...</h1>
  //     </div>
  //   );
  // }
  return (
    <div className="w-auto m-2">
      <h3 className="text-xl font-medium m-2 text-white">
        Search
      </h3>
      <div className="flex gap-3 mb-2">
        <Input
          name="movie"
          type="text"
          className="dark w-auto md:w-60"
          placeholder="Title"
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
          search
        </Button>
        {(movies.length > 0 || series.length > 0)
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

      </div>
      { movies && <MovieTiles results={movies} /> }
      { series && <ShowTiles results={series} /> }
    </div>
  );
}

export default Search;
