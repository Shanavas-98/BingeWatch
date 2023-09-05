import React from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import SingleChat from './SingleChat';
import useChat from '../hooks/useChat';

export default function ChatBox({ fetchAgain, setFetchAgain }) {
  ChatBox.propTypes = {
    fetchAgain: PropTypes.bool.isRequired,
    setFetchAgain: PropTypes.func.isRequired,
  };
  const { selectedChat } = useChat();
  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="#282c34"
      color="black"
      w={{ base: '100%', md: '70%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}
