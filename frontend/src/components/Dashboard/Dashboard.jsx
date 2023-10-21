import React, { useState } from 'react';
import {
  Box,
  Heading, Stack,
} from '@chakra-ui/react';

import UserBox from '../UserChart/UserBox';
import UserBar from '../UserChart/UserBar';
import UserChart from '../UserChart/UserChart';
import MovieBox from '../MovieChart/MovieBox';
import MovieBar from '../MovieChart/MovieBar';
import MovieChart from '../MovieChart/MovieChart';
import ShowBox from '../ShowChart/ShowBox';
import ShowBar from '../ShowChart/ShowBar';
import ShowChart from '../ShowChart/ShowChart';
// import { userGrowth } from './getUserData';

function Dashboard() {
  const [toggleTab, setToggleTab] = useState(1);
  return (
    <>
      <Heading
        ml={['0', '16']}
        mb="16"
        textAlign={['center', 'left']}
      >
        Dashboard
      </Heading>
      <Stack
        direction={['column', 'row']}
        justifyContent="space-evenly"
      >
        <UserBox handleTab={setToggleTab} />
        <MovieBox handleTab={setToggleTab} />
        <ShowBox handleTab={setToggleTab} />
      </Stack>
      <Box p="4">
        <Heading
          textAlign={['center', 'left']}
          size="md"
          my="8"
          ml={['0', '16']}
        >
          Progress bar
        </Heading>
        <Box>
          <UserBar />
          <MovieBar />
          <ShowBar />
        </Box>
      </Box>
      {toggleTab === 1
      && <UserChart />}
      {toggleTab === 2
      && <MovieChart />}
      {toggleTab === 3
      && <ShowChart />}
    </>
  );
}

export default Dashboard;
