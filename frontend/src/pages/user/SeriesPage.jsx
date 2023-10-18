import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SeriesCarousal from '../../components/SeriesCarousal/SeriesCarousal';
import { fetchRandomGenres } from '../../services/userApi';

function SeriesPage() {
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
    <div className="w-auto m-2">
      {genres?.map((gen) => (
        <div key={gen._id}>
          <strong className="text-white">{gen.genreName}</strong>
          <SeriesCarousal genre={gen._id} />
        </div>
      ))}
    </div>
  );
}

export default SeriesPage;
