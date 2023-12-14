import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button, FormControl, IconButton,
  Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, Spinner, useDisclosure, useToast,
} from '@chakra-ui/react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import UserBadgeItem from './UserBadgeItem';
import UserListItem from './UserListItem';
import {
  addToGroup, chatRename, fetchFriends, removeFromGroup,
} from '../services/userApi';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';

export default function UpdateGroupChatModal({ fetchAgain, setFetchAgain, fetchMessages }) {
  UpdateGroupChatModal.propTypes = {
    fetchAgain: PropTypes.bool.isRequired,
    setFetchAgain: PropTypes.func.isRequired,
    fetchMessages: PropTypes.func.isRequired,
  };
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { selectedChat, setSelectedChat } = useChat();
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [renameLoading, setRenameLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleRename = async () => {
    if (!groupName) {
      return;
    }
    try {
      setRenameLoading(true);
      const { data } = await chatRename({
        chatId: selectedChat?._id,
        chatName: groupName,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'failed to rename group',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
      setRenameLoading(false);
      setGroupName('');
    }
  };
  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    setSearch(query);
    try {
      setLoading(true);
      const { data } = await fetchFriends(search);
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
  const handleAdd = async (addUserId) => {
    if (selectedChat?.users?.find((u) => (u?._id === addUserId))) {
      toast({
        title: 'User already added!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
      return;
    }
    if (selectedChat?.groupAdmin?._id !== user?.id) {
      toast({
        title: 'Only admins can add someone!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await addToGroup({
        chatId: selectedChat?._id,
        friendId: addUserId,
      });
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
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
  const handleRemove = async (delUserId) => {
    if (selectedChat?.groupAdmin?._id !== user?.id && delUserId !== user?.id) {
      toast({
        title: 'Only admins can remove someone!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await removeFromGroup({
        chatId: selectedChat?._id,
        friendId: delUserId,
      });
      if (delUserId === user?.id) {
        setSelectedChat(null);
      } else {
        setSelectedChat(data);
      }
      setFetchAgain(!fetchAgain);
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
    setSelectedUsers(selectedUsers?.filter((selUser) => selUser?._id !== delUserId));
  };
  return (
    <div>
      <IconButton onClick={onOpen} display={{ base: 'flex' }} icon={<ViewIcon />} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            {/* selected users */}

            <Box
              w="100%"
              display="flex"
              flexWrap="wrap"
              pb={3}
            >
              {selectedUsers.length > 0 && selectedUsers?.map((person) => (
                <UserBadgeItem
                  key={person?._id}
                  user={person}
                  handleFunction={() => handleRemove(person?._id)}
                />
              ))}
            </Box>

            {/* edit form */}

            <FormControl display="flex">
              <Input
                placeholder={selectedChat?.chatName}
                mb={3}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <IconButton
                isLoading={renameLoading}
                onClick={handleRename}
                icon={<EditIcon />}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users. Eg: Sachin, Dhoni, Kohli"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {/* render searched users */}

            {loading ? (
              <Spinner size="lg" />
            ) : (searchResult && searchResult?.slice(0, 4).map((person) => (
              <UserListItem
                key={person?._id}
                user={person}
                handleFunction={() => handleAdd(person)}
              />
            )))}

          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={() => handleRemove(user?.id)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
