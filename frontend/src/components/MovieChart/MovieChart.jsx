import React from 'react';
import { Box, Grid, Heading } from '@chakra-ui/react';
import MovieLineChart from './MovieLineChart';
import MovieDoughnut from './MovieDoughnut';

function MovieChart() {
  return (
    <Box
      m={['0', '16']}
      borderRadius="lg"
      p={['0', '16']}
      mt={['4', '16']}
      boxShadow="-2px 0 10px rgb(107,70,193,0.5)"
    >
      <Heading
        textAlign={['center', 'left']}
        size="md"
        pt={['8', '0']}
        ml={['0', '16']}
      >
        Movies growth
      </Heading>
      <Box
        size="md"
        pt={['8', '0']}
        ml={['0', '16']}
      >
        <MovieLineChart />
      </Box>
      <Grid templateColumns={['1fr', '2fr 1fr']}>
        <Box
          p={['0', '16']}
          boxSizing="border-box"
          py="4"
        >
          <Heading
            textAlign="center"
            size="md"
            mb="4"
          >
            Movies
          </Heading>
          <MovieDoughnut />
        </Box>
      </Grid>
    </Box>
  );
}

export default MovieChart;
