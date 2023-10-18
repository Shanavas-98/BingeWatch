import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LineChart from '../Charts/LineChart';
import { fetchMonthlyMovies } from '../../services/adminApi';

function MovieLineChart() {
  const [months, setMonths] = useState([]);
  const [moviesCount, setMoviesCount] = useState([]);
  useEffect(() => {
    async function getMonthlyMovies() {
      try {
        const { data } = await fetchMonthlyMovies();
        setMonths(Object.keys(data).reverse());
        setMoviesCount(Object.values(data).reverse());
      } catch (error) {
        toast.error(error.message);
      }
    }
    getMonthlyMovies();
  }, []);
  return (
    <LineChart titleText="Monthly movies" labelsArray={months} dataArray={moviesCount} />
  );
}

export default MovieLineChart;
