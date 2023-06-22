/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'flowbite-react';
import { imgUrl } from '../../axios/apiUrls';
import { movieInstance } from '../../axios/axiosInstance';

const tmdbKey = process.env.REACT_APP_TMDB_KEY;

function MovieList({ results, onMovieSelect }) {
  const getMovie = async (movieId) => {
    let providers;
    await movieInstance.get(`/${movieId}/watch/providers?api_key=${tmdbKey}`)
      .then((res) => {
        providers = res.data.results.IN.buy;
        providers = [...providers, ...res.data.results.IN.flatrate];
        console.log(providers);
      });
    await movieInstance.get(`/${movieId}?api_key=${tmdbKey}&append_to_response=videos,images`)
      .then((res) => {
        const {
          title, original_title, original_language, vote_average, release_date, overview, genres, runtime, images, videos,
        } = res.data;
        const genreNames = genres.map((genre) => genre.name);
        const hour = Math.floor(runtime / 60);
        const min = runtime % 60;
        const duration = `${hour}h ${min}m`;
        const posters = images.posters.map((poster) => poster.file_path);
        const trailers = videos.results
          .filter((video) => video.name === 'Official Trailer' || video.type === 'Trailer' || video.type === 'Teaser')
          .map((video) => video.key);
        const movie = {
          title: title || original_title,
          language: original_language,
          rating: vote_average,
          releaseDate: release_date,
          summary: overview,
          genres: genreNames,
          duration,
          images: posters,
          videos: trailers,
          platforms: providers,
        };
        onMovieSelect(movie);
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="grid grid-cols-2">
      {results && results.map((movie) => (
        <div className="flex justify-between col-span-2 lg:col-span-1">
          <div className="flex">
            <img className="w-32 h-16 m-2" src={imgUrl + movie.poster_path} alt="" />
            <div>
              <h2 className="text-white">{movie.title || movie.original_title}</h2>
              <h4 className="text-white">{movie.release_date}</h4>
              <h4 className="text-white">{movie.original_language}</h4>
            </div>
          </div>
          <div>
            <Button onClick={() => getMovie(movie.id)}>Add</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;

// https://api.themoviedb.org/3/movie/157336?api_key=468f03cf926f8de90194b9e77de68c92&append_to_response=videos,images
//       "adult": false,
//       "backdrop_path": "/106oOZJ3LyqN4Qn6A1qW8eaFZMJ.jpg",
//       "genre_ids": [
//         18
//       ],
//       "id": 470317,
//       "original_language": "ml",
//       "original_title": "പറവ",
//       "overview": "The story of Parava revolves around pigeon race, a game, which is prominent in Mattancherry, Kochi, Kerala.",
//       "popularity": 2.34,
//       "poster_path": "/2L6SAHw8VHEP18ePIK7L8ysAb7T.jpg",
//       "release_date": "2017-09-21",
//       "title": "Parava",
//       "video": false,
//       "vote_average": 7.926,
//       "vote_count": 34
