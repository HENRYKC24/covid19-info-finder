import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Flag from '../assets/images/no_flag.png';

const CountryCard = ({ className, id }) => {
  const state = useSelector((state) => state.covid19Data);
  const item = state.filter((item) => item.id === id)[0];
  const flags = useSelector((state) => state.nationalFlags);

  const flagURL = Array.isArray(flags) ? flags.filter(
    (country) => {
      const left = item.name ? item.name.toLowerCase().split(' ').join('') : '';
      const right = country.country.toLowerCase().split(' ').join('');
      if (right.slice(0, 2) === 'us' && left === 'us') {
        return true;
      }
      if ((left.slice(0, 7) === 'uniteda') && (right === 'uae')) {
        return true;
      }
      if ((left.slice(0, 7) === 'unitedk') && (right === 'uk')) {
        return true;
      }
      if ((left.slice(0, 7) === 'korea,s') && (right === 's.korea')) {
        return true;
      }
      if ((left.slice(0, 7) === 'bosniaa') && (right === 'bosnia')) {
        return true;
      }
      if ((left.substr(left.indexOf('burm'), 4) === 'burm') && (right === 'burm')) {
        return true;
      }
      return ((left === right));
    },
  ) : [{ flagURL: 'https://img.etimg.com/thumb/msid-76340801,width-650,imgsize-389237,,resizemode-4,quality-100/coronavirus-vaccine-antibodies1_istock.jpg' }];

  return (
    <NavLink
      to={{
        pathname: `/country/${item.name.toLowerCase()}`,
        data: item,
        flag: flagURL[0] ? flagURL[0].flagURL : Flag,
      }}
      className={className}
      exact
    >
      <div className={className}>
        <img className="flag" src={flagURL[0] ? flagURL[0].flagURL : Flag} alt="flag" />
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
