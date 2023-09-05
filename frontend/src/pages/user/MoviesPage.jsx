import React from 'react';
import MovieCarousal from '../../components/MovieCarousal/MovieCarousal';

function MoviesPage() {
  const genresArray = ['Action', 'Thriller', 'Drama', 'Comedy', 'Romance'];
  return (
    <div className="w-auto h-screen m-2">
      <h2 className="text-lg text-white font-bold py-2">Movies</h2>
      {genresArray.map((movieGenre) => (
        <div key={movieGenre}>
          <strong className="text-white">{movieGenre}</strong>
          <MovieCarousal genre={movieGenre} />
        </div>
      ))}
    </div>
  );
}

export default MoviesPage;
