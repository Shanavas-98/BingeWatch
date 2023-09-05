import React from 'react';
import { useParams } from 'react-router-dom';
import ViewSeries from '../../components/ViewSeries/ViewSeries';

function ViewSeriesPage() {
  const { showId } = useParams();
  return (
    <ViewSeries showId={showId} />
  );
}

export default ViewSeriesPage;
