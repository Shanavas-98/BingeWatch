import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Box } from '@chakra-ui/react';
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
      w={{ base: '100%', md: '70%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}
