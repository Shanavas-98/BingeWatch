import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { IMG_URL } from '../../axios/apiUrls';
import { addToWatchlist, fetchWatchlist } from '../../services/userApi';

function Watchlist() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  useEffect(() => {
    const getWatchlist = async () => {
      await fetchWatchlist()
        .then((res) => {
          console.log('watchlist', res.data);
          setMovies(res.data[0].movies);
          setSeries(res.data[0].series);
          setLoading(false);
        });
    };
    getWatchlist();
  });
  const goToMovie = (movieId) => {
    navigate(`/movies/view-movie/${movieId}`);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const focusedItemIndex = event.target.tabIndex;
      const focusedItem = movies[focusedItemIndex];
      goToMovie(focusedItem._id);
    }
  };
  const handleWatchlist = async (movieId) => {
    await addToWatchlist(movieId)
      .then((res) => {
        const { success, message } = res.data;
        if (success) {
          toast.success(message, {
            position: 'top-center',
          });
        } else {
          toast.error(message, {
            position: 'top-center',
          });
        }
      });
  };
  console.log('movies', movies);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-xl font-bold text-white my-2">Watchlist</h1>
      <div className="flex w-full">
        {movies && movies?.map((item) => (
          <>
            <div
              role="button"
              tabIndex={0}
              className="flex flex-col"
              onClick={() => goToMovie(item._id)}
              onKeyDown={handleKeyPress}
            >
              <img
                src={IMG_URL + item.images[0]}
                alt={item.title}
                className="w-36 h-60 rounded-md mx-1"
              />
              <span className="text-white self-center">{item.title}</span>
            </div>
            <Close
              onClick={() => handleWatchlist(item._id)}
              className="text-white hover:cursor-pointer"
            />
          </>
        ))}
        {series && series?.map((item) => (
          <div
            role="button"
            tabIndex={0}
            className="flex flex-col"
            onClick={() => goToMovie(item._id)}
            onKeyDown={handleKeyPress}
          >
            <img
              src={IMG_URL + item.poster}
              alt={item.title}
              className="w-36 h-60 rounded-sm"
            />
            <span className="text-white">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
