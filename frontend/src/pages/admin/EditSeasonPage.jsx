import React from 'react';
import { useParams } from 'react-router-dom';
import EditSeason from '../../components/EditShow/EditSeason';

function EditSeasonPage() {
  const { seasonId } = useParams();
  return (
    <EditSeason seasonId={seasonId} />
  );
}

export default EditSeasonPage;
