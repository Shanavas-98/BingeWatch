/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Stack } from '@chakra-ui/react';
import { BookmarkAddOutlined, BookmarkAdded } from '@mui/icons-material';

import { fetchReview, addToWatchlist, addRating } from '../../services/userApi';
import ReviewModal from '../ReviewModal/ReviewModal';
import useAuth from '../../hooks/useAuth';
import StarRating from '../StarRating';

function NavigBar({ data }) {
  const { user } = useAuth();
  const {
    title, year, duration, tagline, start, end, rating, id,
  } = data;
  const [rate, setRate] = useState(0);
  const [added, setAdded] = useState(false);
  const [review, setReview] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const navigate = useNavigate();
  const getRating = async (movie) => {
    await fetchReview(movie).then((res) => {
      const { reviewData, inList } = res.data;
      setRate(reviewData?.rating || 0);
      setReview(reviewData?.review);
      setAdded(inList);
    });
  };
  useEffect(() => {
    getRating(id);
  }, []);
  const movieRating = async (val) => {
    if (!user || user.blocked) {
      navigate('/login');
    } else if (val) {
      setRate(val);
      await addRating(val, id)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            toast.success(message, {
              position: 'top-center',
              className: 'custom-toast',
            });
          } else {
            toast.error(message, {
              position: 'top-center',
            });
          }
        });
    }
  };
  const handleReviewModal = () => {
    if (!user || user.blocked) {
      navigate('/login');
    } else {
      setReviewModalOpen(true);
    }
  };
  const handleWatchlist = async (movieId) => {
    if (!user || user.blocked) {
      navigate('/login');
    } else {
      setAdded(!added);
      const type = 'movie';
      await addToWatchlist(movieId, type)
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
          <Stack m={1}>
            <span className="text-gray-400 text-sm self-center">Rating</span>
            <span className="text-yellow-400">{`${rating?.toFixed(1)}/10`}</span>
          </Stack>
          <Stack m={1}>
            <span className="text-slate-400 text-sm self-center">Your rating</span>
            <StarRating rating={rate} setRating={movieRating} />
            {/* <Rating onClick={(e) => movieRating(e.target.value, id)} /> */}
          </Stack>
          <Stack m={1}>
            <NavLink to={`/reviews/${id}`}>
              <span
                className="text-slate-400 text-sm self-center hover:cursor-pointer"
              >
                User Reviews
              </span>
            </NavLink>
            <Button className="m-2" onClick={handleReviewModal}>Add Review</Button>
          </Stack>
        </div>
      </div>
      {reviewModalOpen
        && (
        <ReviewModal
          key={title}
          contentId={id}
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
    year: PropTypes.string,
    duration: PropTypes.string,
    tagline: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    rating: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default NavigBar;
