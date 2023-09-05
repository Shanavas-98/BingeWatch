import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Text } from '@chakra-ui/react';

export default function UserListItem({ user, handleFunction }) {
  UserListItem.propTypes = {
    user: PropTypes.shape().isRequired,
    handleFunction: PropTypes.func.isRequired,
  };
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.fullName}
        src={user.pic}
      />
      <Box>
        <Text>{user.fullName}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}
