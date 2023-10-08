import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>Page not found!</h1>
      <p>
        Go to the
        {' '}
        <NavLink to="/">Homepage</NavLink>
        .
      </p>
    </div>
  );
}

export default NotFound;
