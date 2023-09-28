import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import './ReviewModal.css';
import { addReview } from '../../services/userApi';

function ReviewModal({ contentId, reviewData, closeModal }) {
  const [review, setReview] = useState(reviewData);
  const reviewSubmit = async (movReview) => {
    try {
      const { data } = await addReview(contentId, movReview);
      const { success, message } = data;
      if (success) {
        setReview(movReview);
        toast.success(message);
      } else {
        throw Error(message);
      }
    } catch (err) {
      toast.error(err.message, {
        position: 'top-center',
      });
    }
  };

  const handleSubmit = () => {
    reviewSubmit(review);
    setReview(review);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content bg-gray-700">
        <div className="flex justify-between">
          <h2 className="text-white text-lg mb-2">Add Review</h2>
          <CloseIcon onClick={() => closeModal()} className="text-white hover:cursor-pointer" />
        </div>
        <textarea
          className="w-full bg-slate-500 text-white rounded-md"
          value={review}
          rows={6}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Enter your review..."
        />
        <div className="flex w-full justify-end">
          <Button className="m-1 bg-blue-700 hover:bg-blue-800" onClick={() => setReview('')}>Clear</Button>
          <Button className="m-1 bg-green-700 hover:bg-green-800" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}

ReviewModal.propTypes = {
  contentId: PropTypes.string.isRequired,
  reviewData: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

ReviewModal.defaultProps = {
  reviewData: '',
};

export default ReviewModal;
