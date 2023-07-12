/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './CardCarousal.css';
import { imgUrl } from '../../axios/apiUrls';

function CardCarousal({ cards, baseLink, style }) {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="cards-carousal">
        {cards?.map((card) => (
          <div className={`flex flex-col m-1 ${style.wd} rounded-md items-center`}>
            <img
              src={imgUrl + card.image}
              alt={card.title}
              key={card.key}
              className={`${style.wd} ${style.ht} m-1 rounded-md hover:cursor-pointer hover:scale-110`}
              onClick={() => navigate(`${baseLink}/${card.id}`)}
            />
            <strong className="text-white mt-1 text-center">{card.title}</strong>
            <p className="text-white text-sm text-center">{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardCarousal;

// h-60 w-36
