import React from 'react';
import Bar from '../Charts/Bar';
import ShowDataProvider from './ShowDataProvider';

function ShowBar() {
  return (
    <ShowDataProvider>
      {({ showPercent, showProfit }) => (
        <Bar title="series" value={showPercent} profit={showProfit} />
      )}
    </ShowDataProvider>
  );
}

export default ShowBar;
