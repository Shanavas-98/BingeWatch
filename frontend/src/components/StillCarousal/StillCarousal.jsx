import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { IMG_URL } from '../../axios/apiUrls';

function StillCarousal({ images }) {
  const [image, setImage] = useState(images[0]);
  const selectImage = (path) => {
    setImage(path);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      const focusedImagePath = images[event.target.tabIndex];
      selectImage(focusedImagePath);
    }
  };
  return (
    <>
      <div className="flex w-full my-1 justify-center">
        <img
          src={IMG_URL + image}
          alt={image}
          className="h-72 w-auto rounded-md"
        />
      </div>
      <div className="cards-carousal">
        {images?.map((path) => (
          <div
            role="button"
            tabIndex={0}
            key={path.split(0, 6)}
            onClick={() => selectImage(path)}
            onKeyDown={handleKeyPress}
            className="flex"
          >
            <img
              src={IMG_URL + path}
              alt={path}
              className="mr-1 h-24 w-auto rounded-md hover:cursor-pointer"
            />
          </div>
        ))}
      </div>
    </>
  );
}

StillCarousal.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StillCarousal;
