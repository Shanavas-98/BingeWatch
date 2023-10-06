import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, HStack, Radio } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function StarRating({
  rating, setRating, count, size,
}) {
  StarRating.propTypes = {
    rating: PropTypes.number.isRequired,
    setRating: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  };
  const [hover, setHover] = useState(null);
  return (
    <HStack spacing="1px">
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
              display="none"
            />
            <StarIcon
              cursor="pointer"
              boxSize={size || 5}
              transition="color 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}

export default StarRating;
