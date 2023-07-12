/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unreachable-loop */
/* eslint-disable max-len */
import React from 'react';
import MovieCarousal from '../../components/MovieCarousal/MovieCarousal';
import SideBar from '../../components/SideBar/SideBar';

function MoviesPage() {
  const genresArray = ['Action', 'Thriller', 'Science Fiction', 'Drama', 'Comedy', 'Romance'];
  // const genresArray = ['Action', 'Drama'];
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <div className="w-auto m-2">
          {genresArray.map((movieGenre) => (
            <>
              <strong className="text-white">{movieGenre}</strong>
              <MovieCarousal genre={movieGenre} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
