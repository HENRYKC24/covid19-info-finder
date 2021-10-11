import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  let state = useSelector((state) => state.covid19Data);
  console.log(state, 'state as it is');
  state = Array.isArray(state) ? state : [];
  let isEven = true;
  let isOdd = false;
  return (
    <div className="home-container">
      <h1 className="home-heading">Reported cases by country</h1>
      {state.map((item, index) => {
        if (index % 2 === 0 && isEven) {
          isEven = !isEven;
          return (
            <div className="home-country-card gray1" key={Math.random()}>
              <span className="arrow"><FaArrowRight className="fa-arrow" /></span>
              <div className="name-cases">
                <span className="name">{item.name}</span>
                <span className="cases">{item.today_confirmed}</span>
              </div>
            </div>
          );
        }
        if (index % 2 === 0 && !isEven) {
          isEven = !isEven;
          return (
            <div className="home-country-card gray2" key={Math.random()}>
              <span className="arrow"><FaArrowRight className="fa-arrow" /></span>
              <div className="name-cases">
                <span className="name">{item.name}</span>
                <span className="cases">{item.today_confirmed}</span>
              </div>
            </div>
          );
        }
        if (index % 2 === 1 && !isOdd) {
          isOdd = !isOdd;
          return (
            <div className="home-country-card gray2" key={Math.random()}>
              <span className="arrow"><FaArrowRight className="fa-arrow" /></span>
              <div className="name-cases">
                <span className="name">{item.name}</span>
                <span className="cases">{item.today_confirmed}</span>
              </div>
            </div>
          );
        }
        if (index % 2 === 1 && isOdd) {
          isOdd = !isOdd;
          return (
            <div className="home-country-card gray1" key={Math.random()}>
              <span className="arrow"><FaArrowRight className="fa-arrow" /></span>
              <div className="name-cases">
                <span className="name">{item.name}</span>
                <span className="cases">{item.today_confirmed}</span>
              </div>
            </div>
          );
        }
        return false;
      })}
    </div>
  );
};

export default HomePage;
