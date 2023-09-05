import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import ViewActor from '../../components/ViewActor/ViewActor';

function ActorDetailsPage({ type }) {
  const { personId } = useParams();
  return (
    <ViewActor personId={personId} type={type} />
  );
}

ActorDetailsPage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ActorDetailsPage;
