/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';

import './ViewMovie.css';
import { fetchMovieDetails } from '../../services/userApi';
import NavigBar from '../NavigationBar/NavigBar';
import VideoPlay from '../VideoPlay/VideoPlay';
import { imgUrl } from '../../axios/apiUrls';
import CardCarousal from '../CardCarousal/CardCarousal';
import ReviewModal from '../ReviewModal/ReviewModal';

function ViewMovie({ movieId }) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const openReviewModal = () => {
    setReviewModalOpen(true);
  };
  useEffect(() => {
    const getMovie = async (id) => {
      await fetchMovieDetails(id)
        .then((res) => {
          setMovie(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching movie:', error);
          setLoading(false);
        });
    };
    getMovie(movieId);
  }, [movieId]);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (movie) {
    const {
      title, releaseDate, duration, rating,
      _id, videos, summary, genres,
      platforms, casts, crews,
    } = movie;
    const year = releaseDate.slice(0, 4);
    const castCards = casts?.map((person) => ({
      id: person.cast?._id,
      key: person.cast?.castId,
      title: person.cast?.name,
      subtitle: person.character,
      image: person.cast?.profile,
    }));
    const crewCards = crews?.map((person) => ({
      id: person.crew?._id,
      key: person.crew?.crewId,
      title: person.crew?.name,
      subtitle: person.job,
      image: person.crew?.profile,
    }));
    const cardStyle = {
      wd: 'w-28',
      ht: 'h-44',
    };
    return (
      <div className="grid grid-cols-2">
        <div className="col-span-2">
          <NavigBar
            key={_id}
            data={{
              title, year, duration, rating, movieId: _id,
            }}
            openReviewModal={openReviewModal}
          />
        </div>
        {reviewModalOpen
        && (
        <ReviewModal
          key={_id}
          movieId={movieId}
          closeModal={() => setReviewModalOpen(false)}
        />
        )}
        <div className="md:col-span-1 col-span-2">
          <VideoPlay key={_id} videos={videos} />
        </div>
        <div className="md:col-span-1 col-span-2">
          <h2 className="text-white text-lg mb-2">Summary</h2>
          <p className="text-gray-200 mb-2">{summary}</p>
          <div className="flex mb-2">
            {genres?.map((item) => (
              <div className="text-white border-2 border-gray-300 rounded-full px-2 py-1 mr-2">{item.genreName}</div>
            ))}
          </div>
          <h2 className="text-white text-lg mb-2">Platforms</h2>
          <div className="flex mt-2">
            <div className="posters">
              {platforms?.map((platform) => (
                <img
                  src={imgUrl + platform.logoPath}
                  alt={`${platform?.platformName} Thumbnail`}
                  className="mr-1 h-20 w-20 rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-2 ml-2">
          <h2 className="text-white text-lg mb-2">Casts</h2>
          <CardCarousal cards={castCards} baseLink="" style={cardStyle} />
          <h2 className="text-white text-lg mb-2">Crews</h2>
          <CardCarousal cards={crewCards} baseLink="" style={cardStyle} />
        </div>
      </div>
    );
  }
}

export default ViewMovie;

/* <h2 className="text-white text-lg mb-2">Posters</h2>
<div className="flex mt-2">
  <div className="posters">
    {images?.map((path) => (
      <img
        src={imgUrl + path}
        className="mr-1 h-44 w-28 rounded-md"
      />
    ))}
  </div>
</div> */
