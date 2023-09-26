import React from 'react';
import PropTypes from 'prop-types';

// import { Rating } from '@mui/material';
import './Review.css';
import { friendRequest } from '../../services/userApi';

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
      const { data } = await friendRequest(friendId);
      console.log('data', data);
    } catch (error) {
      console.error(error);
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
          {/* <Rating className="review-rating" value={review?.rating} precision={0.5} /> */}
          <span className="review-date">{review?.createdAt?.slice(0, 10)}</span>
        </div>
      </div>
      <p className="review-text">{review?.review}</p>
    </div>
  );
}
