import React from 'react';
import { useParams } from 'react-router-dom';
import EditMovie from '../../components/EditMovie/EditMovie';

function EditMoviePage() {
  const { movieId } = useParams();
  return (
    <EditMovie movieId={movieId} />
  );
}

export default EditMoviePage;
