import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './CardCarousal.css';
import { IMG_URL } from '../../axios/apiUrls';

function CardCarousal({ cards, baseLink, style }) {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`${baseLink}/${cardId}`);
  };

  const handleKeyPress = (event, cardId) => {
    if (event.key === 'Enter') {
      handleCardClick(cardId);
    }
  };
  return (
    <div className="flex">
      <div className="cards-carousal">
        {cards?.map((card) => (
          <div
            role="button"
            tabIndex={0}
            key={card?.key}
            className={`flex flex-col m-1 ${style?.wd} rounded-md items-center`}
            onClick={() => handleCardClick(card?.id)}
            onKeyDown={(event) => handleKeyPress(event, card?.id)}
          >
            <img
              src={IMG_URL + card.image}
              alt={card?.title}
              className={`${style?.wd} ${style?.ht} m-1 rounded-md hover:cursor-pointer hover:scale-110`}
            />
            <strong className="text-white mt-1 text-center">{card?.title}</strong>
            <p className="text-white text-sm text-center">{card?.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

CardCarousal.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape).isRequired,
  baseLink: PropTypes.string.isRequired,
  style: PropTypes.shape({
    wd: PropTypes.string.isRequired,
    ht: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardCarousal;
