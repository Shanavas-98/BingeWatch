import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, HStack, Text,
} from '@chakra-ui/react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function Databox({
  title, qty, percent, profit, selectTab,
}) {
  Databox.propTypes = {
    title: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
    profit: PropTypes.bool,
    selectTab: PropTypes.func.isRequired,
  };
  Databox.defaultProps = {
    profit: false,
  };
  return (
    <Box
      w={['full', '20%']}
      boxShadow="-2px 0 10px rgb(107,70,193,0.5)"
      p="8"
      borderRadius="lg"
      onClick={selectTab}
      _hover={{ cursor: 'pointer' }}
    >
      <Text>{title}</Text>
      <HStack spacing="6">
        <Text
          fontSize="2xl"
          fontWeight="bold"
        >
          {qty}
        </Text>
        <HStack>
          <Text>{`${percent}%`}</Text>
          {profit ? <ArrowUpward color="success" /> : <ArrowDownward color="danger" />}
        </HStack>
      </HStack>
      <Text opacity="0.6">Since last month</Text>
    </Box>
  );
}

export default Databox;
