import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import CardCarousal from '../CardCarousal/CardCarousal';
import { fetchGenreSeries } from '../../services/userApi';

function SeriesCarousal({ genre }) {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState();
  useEffect(() => {
    const getSeries = async (genreName) => {
      try {
        const { data } = await fetchGenreSeries(genreName);
        setSeries(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message, {
          position: 'top-center',
        });
        setLoading(false);
      }
    };
    getSeries(genre);
  }, [genre]);

  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    );
  }
  if (series) {
    const showCards = series?.map((show) => ({
      id: show._id,
      key: show.id,
      title: show.title,
      image: show.poster,
    }));
    const cardStyle = {
      wd: 'w-36',
      ht: 'h-60',
    };
    return (
      <CardCarousal cards={showCards} baseLink="/series/view-series" style={cardStyle} />
    );
  }
}

SeriesCarousal.propTypes = {
  genre: PropTypes.string.isRequired,
};

export default SeriesCarousal;
