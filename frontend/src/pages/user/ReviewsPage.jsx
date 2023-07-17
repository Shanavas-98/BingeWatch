import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import ReviewList from '../../components/ReviewList/ReviewList';
import RelatedMovies from '../../components/RelatedMovies/RelatedMovies';

function ReviewsPage() {
  const { movieId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-5">
        <ReviewList movieId={movieId} />
      </div>
      <div className="col-span-3">
        <RelatedMovies movieId={movieId} />
      </div>
    </div>
  );
}

export default ReviewsPage;
