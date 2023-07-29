/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating, Stack } from '@mui/material';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { fetchReview, addRating } from '../../services/userApi';
import ReviewModal from '../ReviewModal/ReviewModal';

function NavigBar({ data }) {
  const {
    title, year, duration, tagline, start, end, rating, id,
  } = data;
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRating(movie) {
      await fetchReview(movie).then((res) => {
        const reviewData = res.data;
        setRate(reviewData.rating);
        setReview(reviewData.review);
      });
    }
    getRating(id);
  }, []);
  const movieRating = async (val) => {
    setRate(val);
    await addRating(val, id);
  };

  return (
    <nav className="bg-gray-700 px-2 py-2 sm:px-4">
      <div className="mx-auto flex flex-wrap items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <span className="self-center text-xl font-bold text-white">
            {title}
          </span>
          <span className="text-gray-400 text-sm self-center">
            {`${tagline}`}
          </span>
          <span className="text-gray-400 text-sm self-center">
            {`${year || start} | ${duration || end}`}
          </span>
        </div>
        <div className="flex gap-2">
          <Stack spacing={1}>
            <span className="text-gray-400 text-sm self-center">Rating</span>
            <span className="text-yellow-400">{`${rating.toFixed(1)}/10`}</span>
          </Stack>
          <Stack spacing={1}>
            <span className="text-slate-400 text-sm self-center">Your rating</span>
            <Rating name="half-rating" value={rate} precision={0.5} onClick={(e) => movieRating(e.target.value)} />
          </Stack>
          <Stack spacing={1}>
            <span
              className="text-slate-400 text-sm self-center hover:cursor-pointer"
              onClick={() => navigate(`/movies/view-movie/reviews/${id}`)}
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

export default NavigBar;
