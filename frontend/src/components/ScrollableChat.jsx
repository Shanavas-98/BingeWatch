import React from 'react';
import PropTypes from 'prop-types';
import ScrollableFeed from 'react-scrollable-feed';
import { Avatar, Tooltip } from '@chakra-ui/react';
import {
  isLastMessage, isSameSender, isSameSenderMargin, isSameUser,
} from '../utils/ChatLogic';
import useAuth from '../hooks/useAuth';

export default function ScrollableChat({ messages }) {
  ScrollableChat.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape).isRequired,
  };
  const { user } = useAuth();
  return (
    <ScrollableFeed>
      {messages && messages.map((msg, idx) => (
        <div
          key={msg._id}
          style={{ display: 'flex' }}
        >
          {(isSameSender(messages, msg, idx, user.id)
                || isLastMessage(messages, idx, user.id))
                && (
                <Tooltip
                  label={msg.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt={3}
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={msg.sender.name}
                    src={msg.sender.picture}
                  />
                </Tooltip>
                )}
          <span
            style={{
              backgroundColor: `${msg.sender._id === user.id ? '#189be7' : '#1dc95f'}`,
              borderRadius: '20px',
              padding: '5px 15px',
              maxWidth: '75%',
              marginLeft: isSameSenderMargin(messages, msg, idx, user.id),
              marginTop: isSameUser(messages, msg, idx, user.id) ? 3 : 10,
            }}
          >
            {/* bgcolor '#BEE3F8' : '#B9F5D0' */}
            {msg.content}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
}
