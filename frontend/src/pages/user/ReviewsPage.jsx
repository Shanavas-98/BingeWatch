import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../../components/ReviewList/ReviewList';
import RelatedMovies from '../../components/RelatedMovies/RelatedMovies';

function ReviewsPage() {
  const { contentId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-6">
        <ReviewList contentId={contentId} />
      </div>
      <div className="col-span-4">
        <RelatedMovies movieId={contentId} />
      </div>
    </div>
  );
}

export default ReviewsPage;
