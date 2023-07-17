/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import ViewActor from '../../components/ViewActor/ViewActor';

function ActorDetailsPage({ type }) {
  const { personId } = useParams();
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <ViewActor personId={personId} type={type} />
      </div>
    </div>
  );
}

export default ActorDetailsPage;
