/* eslint-disable react/prop-types */
import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addReview } from '../../services/userApi';

function ReviewModal({ movieId, closeModal }) {
  const [review, setReview] = useState('');

  const reviewSubmit = async (movReview) => {
    try {
      const { data } = await addReview(movieId, movReview);
      const { success, message } = data;
      if (success) {
        toast.success(message);
      } else {
        throw Error(message);
      }
    } catch (error) {
      console.error('Error adding review', error);
      toast.error(error.message);
    }
  };

  const handleSubmit = () => {
    reviewSubmit(review);
    setReview('');
    closeModal();
  };

  const handleClear = () => {
    setReview('');
  };

  const handleCancel = () => {
    setReview('');
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Movie Review</h2>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Enter your review..."
        />
        <div className="button-container">
          <Button className="m-2" onClick={handleSubmit}>Submit</Button>
          <Button className="m-2" onClick={handleClear}>Clear</Button>
          <Button className="m-2" onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
