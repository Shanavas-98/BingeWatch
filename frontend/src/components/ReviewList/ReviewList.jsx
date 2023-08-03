import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
        }).catch((error) => {
          console.error('error fetching user reviews', error);
        });
    };
    getReviews(movieId);
  }, [movieId]);
  return (
    <div className="m-2">
      <h1 className="text-white">
        User Reviews
      </h1>
      {userReview
  && (
  <div className="m-2 border border-white p-2">
    <div className="flex justify-between border-b-2">
      <h3 className="text-white">{userReview?.user?.fullName}</h3>
      <Stack spacing={1}>
        <Rating name="half-rating" defaultValue={userReview?.rating} precision={0.5} />
        <span className="text-slate-400 text-sm self-center">{userReview?.createdAt?.slice(0, 10)}</span>
      </Stack>
    </div>
    <p className="text-slate-200 text-sm">{userReview?.review}</p>
  </div>
  )}
      {reviews?.length > 0 && reviews?.map((review) => (
        <div className="m-1">
          <div className="flex justify-between border border-white">
            <h3>{review?.user?.fullName}</h3>
            <Stack spacing={1}>
              <Rating name="half-rating" value={review?.rating} precision={0.5} />
              <span className="text-slate-400 text-sm self-center">{review?.createdAt}</span>
            </Stack>
          </div>
          <p>{review?.review}</p>
        </div>
      ))}
    </div>
  );
}

ReviewList.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default ReviewList;

// onClick={(e) => movieRating(e.target.value)}
