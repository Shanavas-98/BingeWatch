import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {
  Box, IconButton, Stack, Text, Tooltip, useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { getSender } from '../utils/ChatLogic';
import ChatLoading from './ChatLoading';
import GroupChatModal from './GroupChatModal';
import { getChats } from '../services/userApi';
import useChat from '../hooks/useChat';
import useAuth from '../hooks/useAuth';

export default function MyChats({ fetchAgain }) {
  MyChats.propTypes = {
    fetchAgain: PropTypes.node.isRequired,
  };
  const { user } = useAuth();
  const toast = useToast();
  const {
    selectedChat, setSelectedChat, chats, setChats,
  } = useChat();
  const [loggedUser, setLoggedUser] = useState('');
  const fetchChats = async () => {
    try {
      const { data } = await getChats();
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'failed to load chats',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
    }
  };
  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection="column"
      alignItems="center"
      p={3}
      w={{ base: '100%', md: '30%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Tooltip hasArrow label="New group" placement="top">
            <IconButton
              variant="outline"
              colorScheme="white"
              fontSize={{ base: '17px', md: '10px', lg: '17px' }}
              aria-label="New group"
              icon={<AddIcon />}
            />
          </Tooltip>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#262626"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats && Array.isArray(chats) ? (
          <Stack overflowY="scroll">
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? '#38B2AC' : '#737373'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {chat.isGroup
                    ? (chat.chatName)
                    : getSender(loggedUser, chat.users)}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}
