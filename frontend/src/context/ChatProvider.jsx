import React, {
  createContext, useMemo, useState,
} from 'react';
// import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  ChatProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  // const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState({});
  const [chats, setChats] = useState([]);
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //   setUser(userInfo);
  //   if (!userInfo) {
  //     navigate('/login');
  //   }
  // }, [navigate]);
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
