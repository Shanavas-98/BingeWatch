/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
  return (
    <div className="m-2">
      <YouTube videoId={key} opts={opts} />
      <div className="flex mt-2">
        <div className="cards-carousal">
          {videos?.map((videoKey) => (
            <img
              src={`${YT_IMG_URL}/${videoKey}/mqdefault.jpg`}
              alt="Video Thumbnail"
              className="mr-1 h-24 w-40 hover:cursor-pointer"
              key={videoKey}
              onClick={() => setKey(videoKey)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;
