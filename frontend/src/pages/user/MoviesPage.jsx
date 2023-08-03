import React from 'react';
import MovieCarousal from '../../components/MovieCarousal/MovieCarousal';
import SideBar from '../../components/SideBar/SideBar';

function MoviesPage() {
  const genresArray = ['Action', 'Thriller', 'Drama', 'Comedy', 'Romance'];
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="user" />
      </div>
      <div className="col-span-8">
        <div className="w-auto m-2">
          {genresArray.map((movieGenre) => (
            <div key={movieGenre}>
              <strong className="text-white">{movieGenre}</strong>
              <MovieCarousal genre={movieGenre} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
