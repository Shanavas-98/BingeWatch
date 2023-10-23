import React, { useEffect, useState } from 'react';
import {
  Avatar, Box, Button, Input, List, ListItem, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import {
  acceptReq, deleteFriend, deleteReq, fetchFriends, fetchRequests, rejectReq,
} from '../../services/userApi';

function FriendRequest() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [send, setSend] = useState([]);
  const [recieved, setRecieved] = useState([]);
  useEffect(() => {
    async function getRequests() {
      try {
        const { data } = await fetchRequests();
        setSend(data?.send);
        setRecieved(data?.recieved);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getRequests();
  }, []);
  useEffect(() => {
    async function getFriends() {
      try {
        const { data } = await fetchFriends(search);
        setFriends(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getFriends();
  }, [search]);
  const cancel = async (reqId) => {
    try {
      const { data } = await deleteReq(reqId);
      if (data.success) {
        toast.success(data.message);
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const accept = async (reqId) => {
    try {
      const { data } = await acceptReq(reqId);
      if (data.success) {
        toast.success(data.message);
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const reject = async (reqId) => {
    try {
      const { data } = await rejectReq(reqId);
      if (data.success) {
        toast.success(data.message);
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const unfriendReq = async (friendId) => {
    try {
      const { data } = await deleteFriend(friendId);
      if (data.success) {
        toast.success(data.message);
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Tabs
      mt={10}
      p={10}
      colorScheme="purple"
      variant="enclosed"
    >
      <TabList>
        <Tab
          _selected={{ color: 'white', bg: 'teal' }}
        >
          Friends
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'teal' }}
        >
          Send Request
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'teal' }}
        >
          Recieved Request
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <List spacing={4}>
            <Box
              display="flex"
              pb={2}
            >
              <Input
                placeholder="Search friend"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {friends && friends.map((friend) => (
              <ListItem>
                <Avatar src={friend?.picture?.url} />
                {friend?.fullName}
                <Button onClick={() => unfriendReq(friend._id)}>Unfriend</Button>
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel>
          <List spacing={4}>
            {send && send.map((req) => (
              <ListItem>
                <Avatar src={req.friend?.picture?.url} />
                {req.friend?.fullName}
                <Button onClick={() => cancel(req._id)}>Cancel</Button>
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel>
          <List spacing={4}>
            {recieved && recieved.map((req) => (
              <ListItem>
                <Avatar src={req.user?.picture?.url} />
                {req.user?.fullName}
                <Button onClick={() => accept(req._id)}>Accept</Button>
                <Button onClick={() => reject(req._id)}>Reject</Button>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default FriendRequest;
