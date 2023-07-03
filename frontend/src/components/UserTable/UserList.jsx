/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { Button } from 'flowbite-react';

import { toast } from 'react-toastify';
import { blockUser, fetchUsers } from '../../services/adminApi';

const useStyles = makeStyles({
  root: {
    '& .MuiDataGrid-root': {
      color: 'white', // Set the font color to white
    },
    '& .MuiDataGrid-columnHeader': {
      fontWeight: 'bold',
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    '& .MuiDataGrid-footer .MuiDataGrid-pagination': {
      '& .MuiPaginationItem-root': {
        color: 'white', // Set the font color of pagination to white
      },
    },
  },
});

function BlockButton(params) {
  const [block, setBlock] = useState(params?.row?.blocked);
  const handleBlock = async () => {
    const userId = params?.row?._id;
    const { data } = await blockUser(userId);
    console.log('block', data);
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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error while fetching users', err);
      }
    };
    getUsers();
  }, []);
  const classes = useStyles();
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
  const rows = users.map((user, index) => ({
    id: index + 1,
    fullName: user.fullName,
    email: user.email,
    mobile: user.mobile,
    verified: user.verified,
    _id: user._id,
  }));

  return (
    <div className="h-screen m-2">
      <h1 className="text-white">Users List</h1>
      <div className={classes.root}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}

export default UserList;
