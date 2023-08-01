/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
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
        console.error('Error fetching series:', err);
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

export default SeriesCarousal;