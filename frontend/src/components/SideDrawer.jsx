/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Drawer, DrawerBody,
  DrawerCloseButton, DrawerContent, DrawerHeader,
  DrawerOverlay, Input, Menu, MenuButton, Spinner,
  Text, Tooltip, useDisclosure, useToast,
} from '@chakra-ui/react';
import { BellIcon, SearchIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import { fetchFriends, newChat } from '../services/userApi';
import useChat from '../hooks/useChat';

export default function SideDrawer() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat, chats, setChats,
  } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        const { data } = await fetchFriends(search);
        setFriends(data);
        setLoading(false);
      } catch (error) {
        toast({
          title: 'Error occured!',
          description: 'failed to load search results',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-center',
        });
      }
    };
    handleSearch();
  }, [search]);
  const createChat = async (friendId) => {
    try {
      setLoadingChat(true);
      const { data } = await newChat(friendId);
      if (!chats.find((c) => c._id === data?._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'failed to create chat',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
    }
  };
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="5px 10px 5px 10px"
      >
        <Tooltip
          label="search users"
          hasArrow
          placement="bottom-end"
        >
          <Button onClick={onOpen}>
            <SearchIcon />
            <Text
              display={{ base: 'none', md: 'flex' }}
              px={4}
            >
              Friends
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Chat App
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Friends</DrawerHeader>

          <DrawerBody>
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
            {loading ? (
              <ChatLoading />
            ) : friends && friends.length > 0 ? (
              friends?.map((person) => (
                <UserListItem
                  key={person?._id}
                  user={person}
                  handleFunction={() => createChat(person?._id)}
                />
              ))
            ) : (
              <Text>No Friends!</Text>
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
