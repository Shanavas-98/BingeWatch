import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LineChart from '../Charts/LineChart';
import { fetchMonthlyShows } from '../../services/adminApi';

function ShowLineChart() {
  const [months, setMonths] = useState([]);
  const [showsCount, setShowsCount] = useState([]);
  useEffect(() => {
    async function getMonthlyShows() {
      try {
        const { data } = await fetchMonthlyShows();
        setMonths(Object.keys(data).reverse());
        setShowsCount(Object.values(data).reverse());
      } catch (error) {
        toast.error(error.message);
      }
    }
    getMonthlyShows();
  }, []);
  return (
    <LineChart titleText="Monthly shows" labelsArray={months} dataArray={showsCount} />
  );
}

export default ShowLineChart;
