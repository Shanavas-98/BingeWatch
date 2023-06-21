/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Button, TextInput,
} from 'flowbite-react';
import { toast } from 'react-toastify';
import { searchUrl } from '../../axios/apiUrls';
import { tmdbInstance } from '../../axios/axiosInstance';
import MovieForm from './MovieForm';
import MovieList from './MovieList';

function AddMovie() {
  const [results, setResults] = useState([]);
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');
  const searchMovie = () => {
    tmdbInstance.get(searchUrl + query)
      .then((res) => {
        setMovie(null);
        setResults(res.data.results);
      }).catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: 'top-center',
        });
      });
  };
  const handleMovieUpdate = (newMovie) => {
    setMovie(newMovie);
  };

  return (
    <div className="w-auto m-2">
      <h3 className="text-xl font-medium m-2 text-white">
        Add Movie
      </h3>
      <div className="flex gap-3">
        <TextInput
          name="movie"
          type="text"
          className="dark w-auto md:w-60"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Button
          type="button"
          className="dark"
          onClick={searchMovie}
        >
          Search
        </Button>
      </div>
      {results && !movie && <MovieList results={results} onMovieSelect={handleMovieUpdate} />}
      {movie && <MovieForm movie={movie} />}
    </div>
  );
}

export default AddMovie;

// "results": [
//   {
//     "adult": false,
//     "backdrop_path": "/2nqsOT2AqPkTW81bWaLRtjgjqVM.jpg",
//     "genre_ids": [
//       18,
//       53,
//       9648
//     ],
//     "id": 11324,
//     "original_language": "en",
//     "original_title": "Shutter Island",
//     "overview": "World War II soldier-turned-U.S. Marshal Teddy Daniels investigates the disappearance of a patient from a hospital for the criminally insane, but his efforts are compromised by troubling visions and a mysterious doctor.",
//     "popularity": 91.014,
//     "poster_path": "/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
//     "release_date": "2010-02-14",
//     "title": "Shutter Island",
//     "video": false,
//     "vote_average": 8.2,
//     "vote_count": 21825
//   }
// ]

// {
//   "adult": false,
//   "backdrop_path": "/2nqsOT2AqPkTW81bWaLRtjgjqVM.jpg",
//   "belongs_to_collection": null,
//   "budget": 80000000,
//   "genres": [
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 53,
//       "name": "Thriller"
//     },
//     {
//       "id": 9648,
//       "name": "Mystery"
//     }
//   ],
//   "homepage": "http://www.shutterisland.com/",
//   "id": 11324,
//   "imdb_id": "tt1130884",
//   "original_language": "en",
//   "original_title": "Shutter Island",
//   "overview": "World War II soldier-turned-U.S. Marshal Teddy Daniels investigates the disappearance of a patient from a hospital for the criminally insane, but his efforts are compromised by troubling visions and a mysterious doctor.",
//   "popularity": 72.755,
//   "poster_path": "/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg",
//   "production_companies": [
//     {
//       "id": 11317,
//       "logo_path": "/hMboqqmeILXFeOJjuCsn3FvCIT3.png",
//       "name": "Phoenix Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 4,
//       "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
//       "name": "Paramount",
//       "origin_country": "US"
//     },
//     {
//       "id": 562,
//       "logo_path": "/azANEzu3H3Kztzt63sdjvlzxhuB.png",
//       "name": "Appian Way",
//       "origin_country": "US"
//     },
//     {
//       "id": 23243,
//       "logo_path": null,
//       "name": "Sikelia Productions",
//       "origin_country": "US"
//     },
//     {
//       "id": 181992,
//       "logo_path": null,
//       "name": "Mandate International",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2010-02-14",
//   "revenue": 294800000,
//   "runtime": 138,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     },
//     {
//       "english_name": "German",
//       "iso_639_1": "de",
//       "name": "Deutsch"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Some places never let you go.",
//   "title": "Shutter Island",
//   "video": false,
//   "vote_average": 8.197,
//   "vote_count": 21826
// }
