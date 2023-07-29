import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

import SideBar from '../../components/SideBar/SideBar';
import SeriesList from '../../components/SeriesTable/SeriesList';

function SeriesPage() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10">
      <div className="col-span-2">
        <SideBar userType="admin" />
      </div>
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8">
        <Button
          type="button"
          className="dark m-2"
          onClick={() => navigate('/admin/series/add-series')}
        >
          Add Series
        </Button>
        <SeriesList />
      </div>
    </div>
  );
}

export default SeriesPage;
