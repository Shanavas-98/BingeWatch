import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Drawer, DrawerBody,
  DrawerCloseButton, DrawerContent, DrawerHeader,
  DrawerOverlay, Input, Menu, MenuButton,
  MenuDivider, MenuItem, MenuList, Spinner,
  Text, Tooltip, useDisclosure, useToast,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import ProfileModal from './ProfileModal';
import { fetchAllUsers, newChat } from '../services/userApi';
import useChat from '../hooks/useChat';
import useAuth from '../hooks/useAuth';

export default function SideDrawer() {
  const navigate = useNavigate();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = useAuth();
  const {
    setSelectedChat, chats, setChats,
  } = useChat();
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please enter something in search',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-center',
      });
    }
    try {
      setLoading(true);
      const { data } = await fetchAllUsers(search);
      setSearchResult(data);
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
  const createChat = async (friendId) => {
    try {
      setLoadingChat(true);
      const { data } = await newChat(friendId);
      if (!chats.find((c) => c._id === data._id)) {
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
              Search User
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
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.fullName} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem color="black">Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem color="black" onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
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
          <DrawerHeader>Search users</DrawerHeader>

          <DrawerBody>
            <Box
              display="flex"
              pb={2}
            >
              <Input
                placeholder="Search user"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleSearch}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((person) => (
                <UserListItem
                  key={person._id}
                  user={person}
                  handleFunction={() => createChat(person._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
