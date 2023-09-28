/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import {
  ArrowBackIos, ArrowForwardIos, KeyboardArrowDown, KeyboardArrowUp, Search,
} from '@mui/icons-material';

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
  const [prev, setPrev] = useState();
  const [page, setPage] = useState(1);
  const [next, setNext] = useState();
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [field, setField] = useState('name');
  const [order, setOrder] = useState(false);
  const handleNextPage = (pageNo) => {
    setPage(pageNo + 1);
  };
  const handlePrevPage = (pageNo) => {
    setPage(pageNo - 1);
  };
  const handleSort = (key) => {
    setField(key);
    setOrder(!order);
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchUsers(page, limit, search, field, order);
        setUsers(data?.users);
        setPrev(data?.pagination?.previous);
        setPage(data?.pagination?.current);
        setNext(data?.pagination?.next);
        setLimit(data?.pagination?.limit);
        setLoading(false);
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
        setLoading(false);
      }
    };
    getUsers();
  }, [page, limit, search, field, order]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  return (
    <>
      <div className="flex justify-between bg-slate-900 p-2 text-white">
        <span className="self-center text-lg font-bold">Users Table</span>
        <div className="flex">
          <Input
            name="actor"
            type="text"
            className="dark w-auto md:w-60"
            placeholder="User Name"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
          />
          <Button
            type="button"
            className="dark w-10 h-10"
          >
            <Search fontSize="small" />
          </Button>
        </div>
      </div>
      <table className="w-full text-white">
        <thead className="bg-slate-700 w-full">
          <tr className="flex justify-between w-full">
            <th className="flex justify-around w-full">S.No</th>
            <th className="flex justify-around w-full">Profile</th>
            <th className="flex justify-around w-full">
              Name
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('fullName')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="flex justify-around w-full">
              Email
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('email')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="flex justify-around w-full">
              Mobile
              <Button
                type="button"
                className="dark bg-transparent w-10"
                onClick={() => handleSort('mobile')}
              >
                {order
                  ? <KeyboardArrowDown fontSize="medium" />
                  : <KeyboardArrowUp fontSize="medium" />}
              </Button>
            </th>
            <th className="flex justify-around w-full">Verified</th>
            <th className="flex justify-around w-full">Actions</th>
          </tr>
        </thead>
        {users?.length > 0 ? (
          <tbody className="w-full">
            {users?.map((person, index) => (
              <tr className="flex w-full" key={index}>
                <td className="w-full pl-10">{index + 1}</td>
                <td className="w-full pl-10"><img src={IMG_URL + person.profile} alt="" className="w-15 h-20" /></td>
                <td className="w-full pl-10">{person.fullName}</td>
                <td className="w-full pl-10">{person.email}</td>
                <td className="w-full pl-10">{person.mobile}</td>
                <td className="w-full pl-10">{person.verified ? 'true' : 'false'}</td>
                <td className="w-full pl-10"><BlockButton user={person} /></td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td><div className="text-lg font-bold w-full p-5 flex justify-center">User not found</div></td>
            </tr>
          </tbody>
        )}
      </table>
      {users?.length > 0 && (
      <div className="flex justify-center">
        {prev
          ? (
            <>
              <Button
                type="button"
                className="dark w-10 h-10"
                onClick={() => handlePrevPage(page)}
              >
                <ArrowBackIos fontSize="small" />
              </Button>
              <Button
                type="button"
                className="dark w-10 h-10 hover:cursor-default"
              >
                {prev}
              </Button>

            </>
          )
          : (
            <Button
              type="button"
              className="dark w-10 h-10"
              disabled
            >
              <ArrowBackIos fontSize="small" />
            </Button>
          )}
        <Button
          type="button"
          className="dark bg-green-950 w-10 h-10 hover:cursor-default"
        >
          {page}
        </Button>

        {next
          ? (
            <>
              <Button
                type="button"
                className="dark w-10 h-10 hover:cursor-default"
              >
                {next}
              </Button>
              <Button
                type="button"
                className="dark w-10 h-10"
                onClick={() => handleNextPage(page)}
              >
                <ArrowForwardIos fontSize="small" />
              </Button>

            </>
          )
          : (
            <Button
              type="button"
              className="dark w-10 h-10"
              disabled
            >
              <ArrowForwardIos fontSize="small" />
            </Button>
          )}
      </div>
      )}
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
