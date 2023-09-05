import React from 'react';
import { Outlet } from 'react-router-dom';

export default function MoviesLayout() {
  return (
    <div className="movies-layout w-full">
      <div className="w-auto">
        <Outlet />
      </div>
    </div>
  );
}
