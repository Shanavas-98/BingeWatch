import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchAllReviews } from '../../services/userApi';
import Review from './Review';
import useAuth from '../../hooks/useAuth';

export default function ReviewList({ contentId }) {
  ReviewList.propTypes = {
    contentId: PropTypes.string.isRequired,
  };
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    const getReviews = async (content) => {
      await fetchAllReviews(content)
        .then((res) => {
          setReviews(res.data?.reviews);
          setUserReview(res.data?.userReview);
        })
        .catch((err) => {
          toast.error(err.message, {
            position: 'top-center',
          });
        });
    };
    getReviews(contentId);
  }, [contentId]);
  return (
    <div className="m-2">
      <h1 className="text-white">User Reviews</h1>
      {userReview && <Review key={userReview?._id} review={userReview} friend />}
      {reviews?.length > 0
        && reviews?.map((review) => {
          const isFriend = review?.user?.friends?.includes(user.id);
          return (<Review key={review._id} review={review} friend={isFriend} />);
        })}
    </div>
  );
}

// onClick={(e) => movieRating(e.target.value)}
