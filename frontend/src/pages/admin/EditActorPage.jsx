import React from 'react';
import { useParams } from 'react-router-dom';
import EditActor from '../../components/EditActor/EditActor';

function EditActorPage() {
  const { actorId } = useParams();
  return (
    <EditActor actorId={actorId} />
  );
}

export default EditActorPage;
