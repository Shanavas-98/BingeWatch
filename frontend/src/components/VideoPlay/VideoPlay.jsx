import React, { useState } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import { YT_IMG_URL } from '../../axios/apiUrls';

function VideoPlay({ videos }) {
  const [key, setKey] = useState(videos[0]);
  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const handleKeyPress = (e, videoKey) => {
    if (e.key === 'Enter') {
      setKey(videoKey);
    }
  };
  return (
    <div className="m-2">
      <YouTube videoId={key} opts={opts} />
      <div className="cards-carousal my-1">
        {videos?.map((videoKey) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setKey(videoKey)}
            onKeyDown={(e) => handleKeyPress(e, videoKey)}
            className="flex mr-1 h-24 w-40 hover:cursor-pointer"
            key={videoKey}
          >
            <img
              src={`${YT_IMG_URL}/${videoKey}/mqdefault.jpg`}
              alt="Video Thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

VideoPlay.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VideoPlay;
