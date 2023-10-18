import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserGrowth } from '../../services/adminApi';

function UserDataProvider({ children }) {
  const [userCount, setUserCount] = useState(0);
  const [userPercent, setUserPercent] = useState(0);
  const [userProfit, setUserProfit] = useState(true);
  useEffect(() => {
    async function userGrowth() {
      try {
        const { data } = await getUserGrowth();
        setUserCount(data.newUsers);
        setUserPercent(data.growth);
        setUserProfit(data.profit);
      } catch (error) {
        toast.error(error.message);
      }
    }
    userGrowth();
  }, []);
  return children({ userCount, userPercent, userProfit });
}

export default UserDataProvider;
