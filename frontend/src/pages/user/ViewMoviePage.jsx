/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';

import SideBar from '../../components/SideBar/SideBar';
import ViewMovie from '../../components/ViewMovie/ViewMovie';

function ViewMoviePage() {
  const { movieId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <ViewMovie movieId={movieId} />
      </div>
    </div>
  );
}

export default ViewMoviePage;
