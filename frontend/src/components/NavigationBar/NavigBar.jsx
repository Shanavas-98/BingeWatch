import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';
import { Rating, Stack } from '@mui/material';
import { BookmarkAddOutlined, BookmarkAdded } from '@mui/icons-material';

import { fetchReview, addRating, addToWatchlist } from '../../services/userApi';
import ReviewModal from '../ReviewModal/ReviewModal';

function NavigBar({ data }) {
  const {
    title, year, duration, tagline, start, end, rating, id,
  } = data;
  const [rate, setRate] = useState(0);
  const [added, setAdded] = useState(false);
  const [review, setReview] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRating(movie) {
      await fetchReview(movie).then((res) => {
        const { reviewData, inList } = res.data;
        setRate(reviewData?.rating || 0);
        setReview(reviewData?.review);
        setAdded(inList);
      });
    }
    getRating(id);
  }, []);
  const movieRating = async (val, movieId) => {
    if (val) {
      setRate(val);
      await addRating(val, movieId)
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
    }
  };
  const handleUserReviews = () => {
    navigate(`/movies/view-movie/reviews/${id}`);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleUserReviews();
    }
  };
  const handleWatchlist = async (movieId) => {
    setAdded(!added);
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

  return (
    <nav className="bg-gray-700 px-2 py-2 sm:px-4">
      <div className="mx-auto flex flex-wrap items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <span className="self-center text-xl font-bold text-white">
            {title}
          </span>
          {tagline
          && (
          <span className="text-gray-400 text-sm self-center">
            {`${tagline}`}
          </span>
          )}
          <span className="text-gray-400 text-sm self-center">
            {`${year || start} | ${duration || end}`}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            className="m-2 bg-transparent hover:bg-transparent"
            onClick={() => handleWatchlist(id)}
          >
            {added
              ? <BookmarkAdded />
              : <BookmarkAddOutlined />}
          </Button>
          <Stack spacing={1}>
            <span className="text-gray-400 text-sm self-center">Rating</span>
            <span className="text-yellow-400">{`${rating?.toFixed(1)}/10`}</span>
          </Stack>
          <Stack spacing={1}>
            <span className="text-slate-400 text-sm self-center">Your rating</span>
            <Rating name="half-rating" value={rate} precision={0.5} onClick={(e) => movieRating(e.target.value, id)} />
          </Stack>
          <Stack spacing={1}>
            <span
              role="button"
              tabIndex="0"
              className="text-slate-400 text-sm self-center hover:cursor-pointer"
              onClick={handleUserReviews}
              onKeyDown={handleKeyPress}
            >
              User Reviews
            </span>
            <Button className="m-2" onClick={() => setReviewModalOpen(true)}>Add Review</Button>
          </Stack>
        </div>
      </div>
      {reviewModalOpen
        && (
        <ReviewModal
          key={title}
          movieId={id}
          reviewData={review}
          closeModal={() => setReviewModalOpen(false)}
        />
        )}
    </nav>
  );
}

NavigBar.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    duration: PropTypes.number,
    tagline: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    rating: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavigBar;
