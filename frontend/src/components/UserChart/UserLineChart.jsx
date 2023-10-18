import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchMonthlyUsers } from '../../services/adminApi';
import LineChart from '../Charts/LineChart';

function UserLineChart() {
  const [months, setMonths] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  useEffect(() => {
    async function getMonthlyUsers() {
      try {
        const { data } = await fetchMonthlyUsers();
        setMonths(Object.keys(data).reverse());
        setUsersCount(Object.values(data).reverse());
      } catch (error) {
        toast.error(error.message);
      }
    }
    getMonthlyUsers();
  }, []);
  return (
    <LineChart titleText="Monthly users" labelsArray={months} dataArray={usersCount} />
  );
}

export default UserLineChart;
