import React from 'react';
import UserProfile from '../../components/UserProfile';
import FriendRequest from '../../components/Requests/FriendRequest';

export default function ProfilePage() {
  return (
    <div className="w-full h-screen md:flex">
      <div className="w-96 lg:w-1/3 p-2">
        <h2 className="text-lg font-bold py-2 text-white">Profile</h2>
        <UserProfile />
      </div>
      <div className="w-full lg:w-2/3 lg:pt-14 p-2">
        <FriendRequest />
      </div>
    </div>
  );
}
