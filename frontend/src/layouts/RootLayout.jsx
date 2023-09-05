import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Router</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
