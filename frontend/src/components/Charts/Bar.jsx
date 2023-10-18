import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, HStack, Heading, Progress, Text,
} from '@chakra-ui/react';

function Bar({ title, value, profit }) {
  Bar.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    profit: PropTypes.bool,
  };
  Bar.defaultProps = {
    profit: false,
  };
  return (
    <Box
      py="4"
      px={['0', '20']}
    >
      <Heading
        size="sm"
        mb="2"
      >
        {title}
      </Heading>
      <HStack
        w="full"
        alignItems="center"
      >
        <Progress w="full" value={value} colorScheme={profit ? 'purple' : 'red'} />
        <Text color={profit ? 'green' : 'red'}>{profit ? `${value}%` : `-${value}%`}</Text>
      </HStack>
    </Box>
  );
}

export default Bar;
