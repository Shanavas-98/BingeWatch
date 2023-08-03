import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

import { fetchSeries } from '../../services/adminApi';
import { IMG_URL } from '../../axios/apiUrls';

function SeriesList() {
  const navigate = useNavigate();
  const viewSeries = (seriesId) => {
    navigate(`/admin/series/view-series/${seriesId}`);
  };
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  useEffect(() => {
    const getSeries = async () => {
      try {
        const { data } = await fetchSeries();
        setSeries(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching series:', err);
        setLoading(false);
      }
    };
    getSeries();
  }, []);
  if (loading) {
    return (
      <div>
        <h1 className="text-white">Loading...</h1>
      </div>
    ); // Display a loading indicator
  }
  if (series.length < 1) {
    return (
      <div>
        <h1 className="text-white">Series List is Empty</h1>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-white p-2 text-xl font-bold bg-black text-center">Actors List</h1>
      <table className="table-fixed w-full m-2">
        <thead className="text-white text-justify">
          <tr>
            <th>ID</th>
            <th>Poster</th>
            <th>Title</th>
            <th>Genres</th>
            <th>Language</th>
            <th>Air Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {series.map((item) => {
            const genres = item.genres?.map((genre) => genre.genreName).join(', ');
            return (
              <tr className="">
                <td>{item.id}</td>
                <td><img src={IMG_URL + item.poster} alt="" className="w-15 h-20" /></td>
                <td>{item.title}</td>
                <td>{genres}</td>
                <td>{item.language}</td>
                <td>{item.airDate}</td>
                <td>{item.endDate}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={() => viewSeries(item._id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SeriesList;
