import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const CountryCard = ({ className, id }) => {
  const state = useSelector((state) => state.covid19Data);
  const item = state.filter((item) => item.id === id)[0];
  return (
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
};

export default CountryCard;
