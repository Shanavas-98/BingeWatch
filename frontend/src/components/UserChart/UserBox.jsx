import React from 'react';
import Databox from '../Charts/Databox';
import UserDataProvider from './UserDataProvider';

function UserBox() {
  return (
    <UserDataProvider>
      {({ userCount, userPercent, userProfit }) => (
        <Databox title="users" qty={userCount} percent={userPercent} profit={userProfit} />
      )}
    </UserDataProvider>
  );
}

export default UserBox;
