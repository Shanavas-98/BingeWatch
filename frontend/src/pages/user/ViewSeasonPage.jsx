import React from 'react';
import { useParams } from 'react-router-dom';

import ViewSeason from '../../components/ViewSeason.jsx/ViewSeason';

function ViewSeasonPage() {
  const { seasonId } = useParams();
  return (
    <ViewSeason seasonId={seasonId} />
  );
}

export default ViewSeasonPage;
