/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { Button } from 'flowbite-react';
import React from 'react';
import { IMG_URL } from '../../axios/apiUrls';
import { showInstance } from '../../axios/axiosInstance';

const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

function ShowResults({ results, onShowSelect }) {
  const getshow = async (showId) => {
    let providers = [];
    await showInstance.get(`/${showId}/watch/providers?api_key=${TMDB_KEY}`)
      .then((res) => {
        const buy = res.data?.results?.IN?.buy;
        const flatrate = res.data?.results?.IN?.flatrate;
        const free = res.data?.results?.IN?.free;
        providers = [...(buy ?? []), ...(flatrate ?? []), ...(free ?? [])];
      });
    await showInstance
      .get(`/${showId}?api_key=${TMDB_KEY}&append_to_response=images,videos,credits`)
      .then((res) => {
        const {
          first_air_date, genres, id, last_air_date,
          name, number_of_episodes, number_of_seasons,
          original_language, overview, poster_path,
          vote_average, images, videos, credits, seasons,
        } = res.data;
        const genreNames = genres.map((genre) => genre.name);
        const backdrops = images.backdrops.slice(0, 10).map((poster) => poster?.file_path);
        const trailers = videos.results
          .filter((video) => video.official === true || video.name === 'Official Trailer' || video.type === 'Trailer' || video.type === 'Teaser')
          .slice(0, 6)
          .map((video) => video.key);
        const seasonsDetails = seasons
          .filter((season) => season.season_number > 0)
          .map((season) => (
            {
              airDate: season.air_date,
              totalEpisodes: season.episode_count,
              id: season.id,
              title: season.name,
              seasonNum: season.season_number,
              poster: season.poster_path,
              rating: season.vote_average,
            }
          ));
        const casts = credits.cast.map((person) => ({
          id: person.id,
          character: person.character,
          name: person.name,
          profile: person.profile_path,
        })).slice(0, 20);
        const crews = credits.crew.map((person) => ({
          id: person.id,
          job: person.job,
          name: person.name,
          profile: person.profile_path,
        })).slice(0, 20);
        const show = {
          id,
          title: name,
          language: original_language,
          rating: vote_average,
          airDate: first_air_date,
          summary: overview,
          genres: genreNames,
          endDate: last_air_date,
          totalEpisodes: number_of_episodes,
          totalSeasons: number_of_seasons,
          poster: poster_path,
          images: backdrops,
          videos: trailers,
          seasons: seasonsDetails,
          platforms: providers,
          casts,
          crews,
        };
        onShowSelect(show);
      }).catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      {results && results.map((show) => (
        <div className="flex col-span-2 md:col-span-1">
          <div className="flex">
            <img className="h-40 w-26 m-2" src={IMG_URL + show.poster_path} alt="" />
            <div className="flex-col justify-around flex">
              <div>
                <h2 className="text-white text-base h-12 overflow-hidden">{show.name}</h2>
                <h4 className="text-white">{show.first_air_date}</h4>
                <h4 className="text-white">{show.original_language}</h4>
              </div>
              <div>
                <Button onClick={() => getshow(show.id)} className="w-min">Add</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowResults;
