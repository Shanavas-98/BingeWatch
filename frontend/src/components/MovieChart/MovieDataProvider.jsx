import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMovieGrowth } from '../../services/adminApi';

function MovieDataProvider({ children }) {
  const [movieCount, setMovieCount] = useState(0);
  const [moviePercent, setMoviePercent] = useState(0);
  const [movieProfit, setMovieProfit] = useState(true);
  useEffect(() => {
    async function movieGrowth() {
      try {
        const { data } = await getMovieGrowth();
        setMovieCount(data.newMovies);
        setMoviePercent(data.growth);
        setMovieProfit(data.profit);
      } catch (error) {
        toast.error(error.message);
      }
    }
    movieGrowth();
  }, []);
  return children({ movieCount, moviePercent, movieProfit });
}

export default MovieDataProvider;
