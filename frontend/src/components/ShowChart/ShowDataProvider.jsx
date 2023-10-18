import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getShowGrowth } from '../../services/adminApi';

function ShowDataProvider({ children }) {
  const [showCount, setShowCount] = useState(0);
  const [showPercent, setShowPercent] = useState(0);
  const [showProfit, setShowProfit] = useState(true);
  useEffect(() => {
    async function showGrowth() {
      try {
        const { data } = await getShowGrowth();
        setShowCount(data.newShows);
        setShowPercent(data.growth);
        setShowProfit(data.profit);
      } catch (error) {
        toast.error(error.message);
      }
    }
    showGrowth();
  }, []);
  return children({ showCount, showPercent, showProfit });
}

export default ShowDataProvider;
