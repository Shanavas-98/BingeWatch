import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchAllReviews } from '../../services/userApi';
import Review from './Review';

export default function ReviewList({ movieId }) {
  ReviewList.propTypes = {
    movieId: PropTypes.string.isRequired,
  };
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({});
  useEffect(() => {
    const getReviews = async (movie) => {
      await fetchAllReviews(movie)
        .then((res) => {
          setReviews(res.data.reviews);
          setUserReview(res.data.userReview);
        })
        .catch((err) => {
          toast.error(err.message, {
            position: 'top-center',
          });
        });
    };
    getReviews(movieId);
  }, [movieId]);
  return (
    <div className="m-2">
      <h1 className="text-white">User Reviews</h1>
      {userReview && <Review key={userReview._id} review={userReview} friend />}
      {reviews?.length > 0
        && reviews?.map((review) => <Review key={review._id} review={review} />)}
    </div>
  );
}

// onClick={(e) => movieRating(e.target.value)}
