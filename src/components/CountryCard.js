import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CountryCard = ({ className, item }) => (
  <NavLink
    to={{
      pathname: '/country',
      data: item,
    }}
    exact
    className={className}
  >
    <div className={className}>
      <span className="arrow">
        <FaArrowRight className="fa-arrow" />
      </span>
      <div className="name-cases">
        <span className="name">{item.name}</span>
        <span className="cases">
          {(+item.today_confirmed).toLocaleString()}
        </span>
      </div>
    </div>
  </NavLink>
);

export default CountryCard;
