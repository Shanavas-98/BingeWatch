import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, FormControl, FormLabel,
  Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, useDisclosure, useToast,
} from '@chakra-ui/react';
import UserListItem from './UserListItem';
import UserBadgeItem from './UserBadgeItem';
import { fetchAllUsers, newGroupChat } from '../services/userApi';
import useChat from '../hooks/useChat';

export default function GroupChatModal({ children }) {
  GroupChatModal.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chats, setChats } = useChat();
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setSearch(query);
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
  const handleSubmit = async () => {
    if (!groupName || !selectedUsers) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
      return;
    }
    try {
      const { data } = await newGroupChat(
        {
          name: groupName,
          users: JSON.stringify(selectedUsers?.map((u) => (u._id))),
        },
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: 'New group created',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'failed to create group',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers?.includes(userToAdd)) {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (delUserId) => {
    setSelectedUsers(selectedUsers?.filter((selUser) => selUser?._id !== delUserId));
  };
  return (
    <div>
      <span
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={onOpen}
      >
        {children}
      </span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group

          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <FormControl id="group-name" isRequired>
              <FormLabel>
                Group Name
              </FormLabel>
              <Input
                placeholder="Group name"
                mb={3}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl id="group-name" isRequired>
              <FormLabel>
                Add Users
              </FormLabel>
              <Input
                placeholder="Add users. Eg: Sachin, Dhoni, Kohli"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
            <Box
              w="100%"
              display="flex"
              flexWrap="wrap"
            >
              {selectedUsers?.map((person) => (
                <UserBadgeItem
                  key={person?._id}
                  user={person}
                  handleFunction={() => handleDelete(person?._id)}
                />
              ))}
            </Box>
            {/* render searched users */}
            {loading ? (
              <div>loading</div>
            ) : (searchResult && searchResult?.slice(0, 4).map((person) => (
              <UserListItem
                key={person?._id}
                user={person}
                handleFunction={() => handleGroup(person)}
              />
            )))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
