import React from 'react';
import MovieCarousal from '../../components/MovieCarousal/MovieCarousal';

function HomePage() {
  const genresArray = ['Drama', 'Comedy', 'Action', 'Thriller', 'Romance'];
  return (
    <div className="w-auto h-screen m-2">
      <h2 className="text-lg text-white font-bold py-2">Home</h2>
      {genresArray.map((movieGenre) => (
        <div key={movieGenre}>
          <strong className="text-white">{movieGenre}</strong>
          <MovieCarousal genre={movieGenre} />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
