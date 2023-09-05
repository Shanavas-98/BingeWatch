import React from 'react';
import { useParams } from 'react-router-dom';

import ViewMovie from '../../components/ViewMovie/ViewMovie';

function ViewMoviePage() {
  const { movieId } = useParams();
  return (
    <ViewMovie movieId={movieId} />
  );
}

export default ViewMoviePage;
