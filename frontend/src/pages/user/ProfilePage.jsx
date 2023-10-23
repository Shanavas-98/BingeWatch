import React from 'react';
import UserProfile from '../../components/UserProfile';
import FriendRequest from '../../components/Requests/FriendRequest';

export default function ProfilePage() {
  return (
    <div className="w-auto h-screen m-2">
      <h2 className="text-lg font-bold py-2 text-white">Profile</h2>
      <UserProfile />
      <FriendRequest />
    </div>
  );
}
