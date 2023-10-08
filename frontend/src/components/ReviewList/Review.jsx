import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './Review.css';
import { friendRequest } from '../../services/userApi';
import StarRating from '../StarRating';

export default function Review({ review, friend }) {
  Review.propTypes = {
    review: PropTypes.shape().isRequired,
    friend: PropTypes.bool,
  };
  Review.defaultProps = {
    friend: false,
  };
  const addFriend = async (friendId) => {
    try {
      await friendRequest(friendId);
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center',
      });
    }
  };
  return (
    <div className="review-box">
      <div className="review-head">
        <div className="review-profile">
          <img src={review?.user?.picture?.url} className="w-10 h-10 rounded-lg" alt="" />
          <h3 className="text-lg ml-3">{review?.user?.fullName}</h3>
          {!friend
          && (
          <button
            type="button"
            className="bg-green-500 text-xs rounded-md h-6 ml-5 px-2"
            onClick={() => addFriend(review?.user?._id)}
          >
            Add Friend
          </button>
          )}
        </div>
        <div className="flex flex-col">
          <StarRating rating={review?.rating} disabled />
          <span className="review-date">{review?.createdAt?.slice(0, 10)}</span>
        </div>
      </div>
      <p className="review-text">{review?.review}</p>
    </div>
  );
}
