/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Rating, Stack } from '@mui/material';

import { fetchUserReviews } from '../../services/userApi';

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({});
  useEffect(() => {
    const getReviews = async (movie) => {
      await fetchUserReviews(movie)
        .then((res) => {
          setReviews(res.data.reviews);
          setUserReview(res.data.userReview);
          console.log('user reviews', reviews);
        }).catch((error) => {
          console.error('error fetching user reviews', error);
        });
    };
    getReviews(movieId);
  }, [movieId]);
  return (
    <div>
      {userReview
        && (
        <div className="m-1">
          <h3>{userReview.user.fullName}</h3>
          <Stack spacing={1}>
            <Rating name="half-rating" value={userReview.rating} precision={0.5} />
            <span className="text-slate-400 text-sm self-center">{userReview.createdAt.slice(0, 10)}</span>
          </Stack>
          <p>{userReview.review}</p>
        </div>
        )}
      {reviews && reviews.map((review) => (
        <div className="m-1">
          <h3>{review.user.fullName}</h3>
          <Stack spacing={1}>
            <Rating name="half-rating" value={review.rating} precision={0.5} />
            <span className="text-slate-400 text-sm self-center">{review.createdAt.slice(0, 10)}</span>
          </Stack>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;

// onClick={(e) => movieRating(e.target.value)}
