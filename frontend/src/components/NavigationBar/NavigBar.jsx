/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Rating, Stack } from '@mui/material';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

import { fetchRating, movieRating } from '../../services/userApi';

function NavigBar({ data, openReviewModal }) {
  const {
    title, year, duration, rating, movieId,
  } = data;
  const [rate, setRate] = useState(0);
  useEffect(() => {
    async function getRating(movie) {
      await fetchRating(movie).then((res) => {
        setRate(res.data);
      });
    }
    getRating(movieId);
  }, []);
  const addRating = async (val) => {
    setRate(val);
    await movieRating(val, movieId);
  };
  return (
    <nav className="bg-gray-700 px-2 py-2 sm:px-4">
      <div className="mx-auto flex flex-wrap items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <span className="self-center text-xl font-bold text-white">
            {title}
          </span>
          <span className="text-gray-400 text-sm self-center">
            {`${year} | ${duration}`}
          </span>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center justify-center m-2">
            <span className="text-gray-400 text-sm self-center">Rating</span>
            <span className="text-yellow-400">{rating}</span>
          </div>
          <Stack spacing={1} className="m-2">
            <span className="text-slate-400 text-sm self-center">Rate</span>
            <Rating name="half-rating" value={rate} precision={0.5} onClick={(e) => addRating(e.target.value)} />
          </Stack>
          <Button className="m-2" onClick={() => openReviewModal}>Add Review</Button>
        </div>
      </div>
    </nav>
  );
}

export default NavigBar;
