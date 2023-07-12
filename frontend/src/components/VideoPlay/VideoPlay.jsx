/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import YouTube from 'react-youtube';

function VideoPlay({ videos }) {
  const [key, setKey] = useState(videos[0]);
  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div className="m-2">
      <YouTube videoId={key} opts={opts} />
      <div className="flex mt-2">
        <div className="posters">
          {videos?.map((videoKey) => (
            <img
              src={`https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`}
              alt="Video Thumbnail"
              className="mr-1 h-28 hover:cursor-pointer"
              onClick={() => setKey(videoKey)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
