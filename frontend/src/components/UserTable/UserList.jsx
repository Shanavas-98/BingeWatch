/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';

import { toast } from 'react-toastify';
import { blockUser, fetchUsers } from '../../services/adminApi';
import DataTable from '../Table/DataTable';

function BlockButton(params) {
  const [block, setBlock] = useState(params?.row?.blocked);
  const handleBlock = async () => {
    const userId = params?.row?._id;
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
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'verified', headerName: 'Verified', width: 100 },
    {
      field: '_id', headerName: 'Action', width: 100, renderCell: BlockButton,
    },
  ];
  const rows = users?.map((user, index) => ({
    id: index + 1,
    fullName: user.fullName,
    email: user.email,
    mobile: user.mobile,
    verified: user.verified,
    _id: user._id,
  }));
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (rows.length < 1) {
    return (
      <div>
        <h1 className="text-white">Users List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white m-2">Users List</h1>
      <DataTable rows={rows} columns={columns} />
    </>
  );
}

export default UserList;
