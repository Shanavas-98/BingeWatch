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
    let providers = [];
    await movieInstance.get(`/${movieId}/watch/providers?api_key=${tmdbKey}`)
      .then((res) => {
        const buy = res.data?.results?.IN?.buy;
        const flatrate = res.data?.results?.IN?.flatrate;
        if (buy && buy.length > 0) {
          providers = [...buy];
        }
        if (flatrate && flatrate.length > 0) {
          providers = [...providers, ...flatrate];
        }
      });
    await movieInstance.get(`/${movieId}?api_key=${tmdbKey}&append_to_response=videos,images`)
      .then((res) => {
        const {
          id, title, original_title, original_language, vote_average, release_date, overview, genres, runtime, images, videos,
        } = res.data;
        const genreNames = genres.map((genre) => genre.name);
        const hour = Math.floor(runtime / 60);
        const min = runtime % 60;
        const duration = `${hour}h ${min}m`;
        const posters = images.posters.map((poster) => poster.file_path)
          .slice(0, 6);
        const trailers = videos.results
          .filter((video) => video.name === 'Official Trailer' || video.type === 'Trailer' || video.type === 'Teaser')
          .map((video) => video.key)
          .slice(0, 6);
        const movie = {
          id,
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
