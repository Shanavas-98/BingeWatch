import React from 'react';
import { useParams } from 'react-router-dom';

import ViewSeason from '../../components/ViewSeason.jsx/ViewSeason';
import SideBar from '../../components/SideBar/SideBar';

function ViewSeasonPage() {
  const { seasonId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <ViewSeason seasonId={seasonId} />
      </div>
    </div>
  );
}

export default ViewSeasonPage;
