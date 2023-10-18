import React from 'react';
import Databox from '../Charts/Databox';
import ShowDataProvider from './ShowDataProvider';

function ShowBox() {
  return (
    <ShowDataProvider>
      {({ showCount, showPercent, showProfit }) => (
        <Databox title="series" qty={showCount} percent={showPercent} profit={showProfit} />
      )}
    </ShowDataProvider>
  );
}

export default ShowBox;
