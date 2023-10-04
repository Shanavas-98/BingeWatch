import React, {
  createContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);
  const contextValue = useMemo(() => (
    {
      selectedChat, setSelectedChat, chats, setChats,
    }
  ), [selectedChat, setSelectedChat, chats, setChats]);
  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
