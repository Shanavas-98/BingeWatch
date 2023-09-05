import React from 'react';
import { useParams } from 'react-router-dom';
import ViewEpisode from '../../components/ViewEpisode/ViewEpisode';

function ViewEpisodePage() {
  const { episodeId } = useParams();
  return (
    <ViewEpisode episodeId={episodeId} />
  );
}

export default ViewEpisodePage;
