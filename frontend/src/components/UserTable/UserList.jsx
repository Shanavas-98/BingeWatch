import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';

import { blockUser, fetchUsers } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

function BlockButton({ user }) {
  const [block, setBlock] = useState(user.blocked);
  const handleBlock = async () => {
    const userId = user._id;
    const { data } = await blockUser(userId);
    if (data.success) {
      if (data.block) {
        toast.warning('user blocked successfully');
      } else {
        toast.warning('user unblocked successfully');
      }
      setBlock(!block);
    }
  };
  return (
    <Button variant="outlined" color="primary" size="small" onClick={handleBlock}>
      {block ? 'Unblock' : 'Block'}
    </Button>
  );
}

function UserList() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (users.length < 1) {
    return (
      <div>
        <h1 className="text-white">Users List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Actors List</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            <th>S.No</th>
            <th>Profile</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {users?.map((person, index) => (
            <tr className="">
              <td>{index + 1}</td>
              <td><img src={IMG_URL + person.profile} alt="" className="w-15 h-20" /></td>
              <td>{person.fullName}</td>
              <td>{person.email}</td>
              <td>{person.mobile}</td>
              <td>{person.verified ? 'true' : 'false'}</td>
              <td><BlockButton user={person} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

BlockButton.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    blocked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserList;
