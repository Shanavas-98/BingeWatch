import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import ViewEpisode from '../../components/ViewEpisode/ViewEpisode';

function ViewEpisodePage() {
  const { episodeId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <ViewEpisode episodeId={episodeId} />
      </div>
    </div>
  );
}

export default ViewEpisodePage;
