import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/button';
import { toast } from 'react-toastify';

import { IMG_URL } from '../../axios/apiUrls';
import { movieInstance } from '../../axios/axiosInstance';

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

function MovieResults({ results, onMovieSelect }) {
  const getMovie = async (movieId) => {
    let providers = [];
    await movieInstance.get(`/${movieId}/watch/providers?api_key=${TMDB_KEY}`)
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
    await movieInstance.get(`/${movieId}?api_key=${TMDB_KEY}&append_to_response=videos,images,credits`)
      .then((res) => {
        const {
          id, title, original_language,
          vote_average, release_date, overview, genres,
          runtime, images, videos, credits,
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
        const cast = credits.cast.map((person) => {
          let gender = '';
          if (person.gender === 1) {
            gender = 'Female';
          } else if (person.gender === 2) {
            gender = 'Male';
          } else {
            gender = 'Unknown';
          }
          return ({
            order: person.order,
            character: person.character,
            gender,
            castId: person.id,
            department: person.known_for_department,
            name: person.name || person.original_name,
            popularity: person.popularity,
            profile: person.profile_path,
          });
        })
          .sort((a, b) => a.order - b.order)
          .slice(0, 20);
        const crew = credits.crew.map((person) => {
          let gender = '';
          if (person.gender === 1) {
            gender = 'Female';
          } else if (person.gender === 2) {
            gender = 'Male';
          } else {
            gender = 'Unknown';
          }
          return ({
            job: person.job,
            gender,
            crewId: person.id,
            department: person.department || person.known_for_department,
            name: person.name || person.original_name,
            popularity: person.popularity,
            profile: person.profile_path,
          });
        })
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);
        const movie = {
          id,
          title,
          language: original_language,
          rating: vote_average,
          releaseDate: release_date,
          summary: overview,
          genres: genreNames,
          duration,
          images: posters,
          videos: trailers,
          platforms: providers,
          cast,
          crew,
        };
        onMovieSelect(movie);
      }).catch((err) => {
        toast.error(err.message, {
          position: 'top-center',
        });
      });
  };
  return (
    <div className="grid grid-cols-2">
      {results && results.map((movie) => (
        <div className="flex justify-between col-span-2 lg:col-span-1">
          <div className="flex">
            <img className="w-32 h-16 m-2" src={IMG_URL + movie.poster_path} alt="" />
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

MovieResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onMovieSelect: PropTypes.func.isRequired,
};

export default MovieResults;
