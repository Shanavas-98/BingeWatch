import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchUserCounts } from '../../services/adminApi';
import DoughnutChart from '../Charts/DoughnutChart';

function UserDoughnut() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  useEffect(() => {
    async function getAllCounts() {
      try {
        const { data } = await fetchUserCounts();
        setActiveUsers(data?.active);
        setBlockedUsers(data?.blocked);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getAllCounts();
  }, []);
  return (
    <DoughnutChart titleText="Users Count" labelsArray={['active', 'blocked']} dataArray={[activeUsers, blockedUsers]} />
  );
}

export default UserDoughnut;
