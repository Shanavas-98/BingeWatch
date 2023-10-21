import React from 'react';
import PropTypes from 'prop-types';

import Databox from '../Charts/Databox';
import ShowDataProvider from './ShowDataProvider';

function ShowBox({ handleTab }) {
  ShowBox.propTypes = {
    handleTab: PropTypes.func.isRequired,
  };
  const selectTab = () => {
    handleTab(3);
  };
  return (
    <ShowDataProvider>
      {({ showCount, showPercent, showProfit }) => (
        <Databox title="series" qty={showCount} percent={showPercent} profit={showProfit} selectTab={selectTab} />
      )}
    </ShowDataProvider>
  );
}

export default ShowBox;
