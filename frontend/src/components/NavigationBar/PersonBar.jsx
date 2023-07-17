/* eslint-disable react/prop-types */
import React from 'react';

function PersonBar({ data }) {
  const { name, gender, department } = data;
  return (
    <nav className="bg-gray-700 px-2 py-2 sm:px-4">
      <div className="mx-auto flex flex-wrap items-center justify-between">
        <div className="flex flex-col items-center justify-center">
          <span className="self-center text-xl font-bold text-white">
            {name}
          </span>
          <span className="text-gray-400 text-sm self-center">
            {`${gender} | ${department}`}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default PersonBar;
