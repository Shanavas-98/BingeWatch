import { useContext } from 'react';
import ChatContext from '../context/ChatProvider';

export default function useChat() {
  return useContext(ChatContext);
}
