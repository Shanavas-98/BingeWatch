/* eslint-disable react/prop-types */
import React from 'react';
import './Carousal.css';
import { imgUrl } from '../../axios/apiUrls';

function Carousal({ persons }) {
  return (
    <div className="flex">
      <div className="tiles">
        {persons?.map((person) => (
          <>
            <img key={person.castId || person.crewId} src={imgUrl + person.profile} alt={person.name} className="h-60 w-36 m-2 rounded-md" />
            <div>
              <strong className="text-white">{person.name}</strong>
              <p className="text-white">{person.character || person.job}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Carousal;
