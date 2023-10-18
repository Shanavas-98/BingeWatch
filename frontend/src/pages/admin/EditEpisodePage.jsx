import React from 'react';
import { useParams } from 'react-router-dom';
import EditEpisode from '../../components/EditShow/EditEpisode';

function EditEpisodePage() {
  const { episodeId } = useParams();

  return (
    <EditEpisode episodeId={episodeId} />
  );
}

export default EditEpisodePage;
