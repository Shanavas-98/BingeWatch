import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../../components/SideDrawer';
import MyChats from '../../components/MyChats';
import ChatBox from '../../components/ChatBox';
import useAuth from '../../hooks/useAuth';

export default function ChatPage() {
  const { user } = useAuth();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        p="10px"
        color="white"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  );
}
