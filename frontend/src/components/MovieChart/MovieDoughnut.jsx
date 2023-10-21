import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DoughnutChart from '../Charts/DoughnutChart';
import { fetchMovieCounts } from '../../services/adminApi';

function MovieDoughnut() {
  const [genres, setGenres] = useState([]);
  const [moviesCount, setMoviesCount] = useState([]);
  useEffect(() => {
    async function getAllCounts() {
      try {
        const { data } = await fetchMovieCounts();
        const genresArr = data.map((obj) => Object.keys(obj)[0]);
        const countsArr = data.map((obj) => Object.values(obj)[0]);
        setGenres(genresArr);
        setMoviesCount(countsArr);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getAllCounts();
  }, []);
  return (
    <DoughnutChart titleText="Movies Count" labelsArray={genres} dataArray={moviesCount} />
  );
}

export default MovieDoughnut;
