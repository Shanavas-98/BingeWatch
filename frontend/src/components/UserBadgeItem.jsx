import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

export default function UserBadgeItem({ user, handleFunction }) {
  UserBadgeItem.propTypes = {
    user: PropTypes.shape.isRequired,
    handleFunction: PropTypes.func.isRequired,
  };
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      fontSize={12}
      bg="teal"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user?.fullName}
      <CloseIcon fontSize="10px" />
    </Box>
  );
}
