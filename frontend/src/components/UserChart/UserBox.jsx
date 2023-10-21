import React from 'react';
import PropTypes from 'prop-types';

import Databox from '../Charts/Databox';
import UserDataProvider from './UserDataProvider';

function UserBox({ handleTab }) {
  UserBox.propTypes = {
    handleTab: PropTypes.func.isRequired,
  };
  const selectTab = () => {
    handleTab(1);
  };
  return (
    <UserDataProvider>
      {({ userCount, userPercent, userProfit }) => (
        <Databox title="users" qty={userCount} percent={userPercent} profit={userProfit} selectTab={selectTab} />
      )}
    </UserDataProvider>
  );
}

export default UserBox;
