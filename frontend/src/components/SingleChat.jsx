/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {
  Box, FormControl, IconButton, Input, Spinner, Text, useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Lottie from 'react-lottie';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { getSender, getSenderFull } from '../utils/ChatLogic';
import './style.css';
import ScrollableChat from './ScrollableChat';
import typingAnimation from '../animations/typing_animation.json';
import ProfileModal from './ProfileModal';
import { chatMessages, sendMsg } from '../services/userApi';
import useChat from '../hooks/useChat';
import useAuth from '../hooks/useAuth';

// const ENDPOINT = 'http://www.backend.bingewatch.fun/';
const ENDPOINT = process.env.REACT_APP_SERVER_URL;
let socket;
let selectedChatCompare;

export default function SingleChat({ fetchAgain, setFetchAgain }) {
  SingleChat.propTypes = {
    fetchAgain: PropTypes.bool.isRequired,
    setFetchAgain: PropTypes.func.isRequired,
  };
  const { user } = useAuth();
  const { selectedChat, setSelectedChat } = useChat();
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // typing animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, []);
  const fetchMessages = async () => {
    if (!selectedChat._id) {
      return;
    }
    try {
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      // setLoading(true);
      // const { data } = await axios.get(`api/message/${selectedChat._id}`, config);
      const { data } = await chatMessages(selectedChat._id);
      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error occured!',
        description: 'failed to fetch messages',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-center',
      });
    }
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);
      try {
        setNewMessage('');
        const { data } = await sendMsg(
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
        );
        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: 'Error occured!',
          description: 'failed to send the message',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'bottom-center',
        });
      }
    }
  };

  useEffect(() => {
    socket.on('message recieved', (newMsgRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMsgRecieved.chat._id) {
        // give notification
      } else {
        setMessages([...messages, newMsgRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    const typingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - typingTime;
      if (timeDiff >= timerLength) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    });
  };
  const chatUsers = selectedChat?.users;
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w="100%"
            color="white"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(null)}
            />
            {!selectedChat?.isGroup
              ? (
                <>
                  {chatUsers && getSender(user, chatUsers)}
                  {chatUsers && <ProfileModal user={getSenderFull(user, selectedChat?.users)} />}
                </>
              ) : (
                <>
                  {selectedChat.chatName?.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#262626"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {/* bgcolor #E8E8E8 */}
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage}>
              {isTyping && (
              <div>
                <Lottie
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                  options={defaultOptions}
                />
              </div>
              )}
              <Input
                variant="filled"
                bg="#4d4d4d"
                placeholder="Enter a message"
                onChange={typingHandler}
                value={newMessage}
              />
              {/* bgcolor #E0E0E0 */}
            </FormControl>
          </Box>

        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="black"
          h="100%"
        >
          <Text
            fontSize="3xl"
            pb={3}
            fontFamily="Work sans"
            color="black"
          >
            Click on a chat to start chating
          </Text>
        </Box>
      )}
    </>
  );
}
