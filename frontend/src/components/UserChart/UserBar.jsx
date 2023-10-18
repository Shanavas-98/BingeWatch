import React from 'react';
import Bar from '../Charts/Bar';
import UserDataProvider from './UserDataProvider';

function UserBar() {
  return (
    <UserDataProvider>
      {({ userPercent, userProfit }) => (
        <Bar title="users" value={userPercent} profit={userProfit} />
      )}
    </UserDataProvider>
  );
}

export default UserBar;
