import React, { useState } from 'react';
import { Box, HStack, Radio } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function StarRating({ rating, setRating, count, size }) {
    const [hover, setHover] = useState(null);
  return (
    <HStack spacing="2px">
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              d="none"
            />
            <StarIcon
              cursor="pointer"
              boxSize={size || 20}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}

export default StarRating;
