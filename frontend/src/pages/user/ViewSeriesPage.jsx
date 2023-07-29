import React from 'react';
import { useParams } from 'react-router-dom';
import ViewSeries from '../../components/ViewSeries/ViewSeries';
import SideBar from '../../components/SideBar/SideBar';

function ViewSeriesPage() {
  const { showId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <ViewSeries showId={showId} />
      </div>
    </div>
  );
}

export default ViewSeriesPage;
