import React from 'react';
import { useParams } from 'react-router-dom';
import EditCrew from '../../components/EditActor/EditCrew';

function EditCrewPage() {
  const { crewId } = useParams();
  return (
    <EditCrew crewId={crewId} />
  );
}

export default EditCrewPage;
