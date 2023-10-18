import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MovieCarousal from '../../components/MovieCarousal/MovieCarousal';
import { fetchRandomGenres } from '../../services/userApi';

function HomePage() {
  const [genres, setGenres] = useState();
  useEffect(() => {
    async function getRandomGenres() {
      try {
        const { data } = await fetchRandomGenres();
        setGenres(data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getRandomGenres();
  }, []);
  return (
    <div className="w-auto h-screen m-2">
      <h2 className="text-lg text-white font-bold py-2">Home</h2>
      {genres?.map((gen) => (
        <div key={gen._id}>
          <strong className="text-white">{gen.genreName}</strong>
          <MovieCarousal genreId={gen._id} />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
