import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchShowCounts } from '../../services/adminApi';
import DoughnutChart from '../Charts/DoughnutChart';

function ShowDoughnut() {
  const [genres, setGenres] = useState([]);
  const [showsCount, setShowsCount] = useState([]);
  useEffect(() => {
    async function getAllCounts() {
      try {
        const { data } = await fetchShowCounts();
        const genresArr = data.map((obj) => Object.keys(obj)[0]);
        const countsArr = data.map((obj) => Object.values(obj)[0]);
        setGenres(genresArr);
        setShowsCount(countsArr);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getAllCounts();
  }, []);
  return (
    <DoughnutChart titleText="Shows Count" labelsArray={genres} dataArray={showsCount} />
  );
}

export default ShowDoughnut;
