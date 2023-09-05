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
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    const getWatchlist = async () => {
      await fetchWatchlist()
        .then((res) => {
          setMovies(res.data[0].movies);
          setSeries(res.data[0].series);
          setLoading(false);
        });
    };
    getWatchlist();
  }, [trigger]);
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
  const handleWatchlist = async (contentId, type) => {
    await addToWatchlist(contentId, type)
      .then((res) => {
        const { success, message } = res.data;
        if (success) {
          setTrigger(!trigger);
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
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="flex w-full text-white">
      {movies.length > 0 && movies?.map((item) => (
        <div key={item._id} className="relative w-36 mx-2">
          <div
            role="button"
            tabIndex={0}
            className="flex flex-col flex-shrink-0"
            onClick={() => goToMovie(item._id)}
            onKeyDown={handleKeyPress}
          >
            <img
              src={IMG_URL + item.images[0]}
              alt={item.title}
              className="w-36 h-60 rounded-md"
            />
            <span>{item.title}</span>
          </div>
          <Close
            onClick={() => handleWatchlist(item._id, 'movie')}
            className="hover:cursor-pointer absolute top-0 right-0"
          />
        </div>
      ))}
      {series && series?.map((item) => (
        <div key={item._id} className="relative w-36 mx-2">
          <div
            role="button"
            tabIndex={0}
            className="flex flex-col flex-shrink-0"
            onClick={() => goToMovie(item._id)}
            onKeyDown={handleKeyPress}
          >
            <img
              src={IMG_URL + item.poster}
              alt={item.title}
              className="w-36 h-60 rounded-md"
            />
            <span>{item.title}</span>
          </div>
          <Close
            onClick={() => handleWatchlist(item._id, 'show')}
            className="hover:cursor-pointer absolute top-0 right-0"
          />
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
