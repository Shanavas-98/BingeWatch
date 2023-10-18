import React from 'react';
import { useParams } from 'react-router-dom';
import EditShow from '../../components/EditShow/EditShow';

function EditShowPage() {
  const { showId } = useParams();
  return (
    <EditShow showId={showId} />
  );
}

export default EditShowPage;
