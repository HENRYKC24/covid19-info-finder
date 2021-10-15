import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import CountryCard from '../components/CountryCard';
import { getCovidInfoFromServer } from '../redux/covid19/covid19';
import Globe from '../globe.gif';

const HomePage = () => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.covid19Data);
  state = Array.isArray(state) ? state : [];

  const [internalState, setInternalState] = useState(state);
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const worldWideTotal = state.reduce((init, current) => init + current.today_confirmed, 0);

  let isEven = true;
  let isOdd = false;

  const onDateChange = (e) => {
    const { value } = e.target;
    // const dateArray = value.split('-');
    // const [year, month, day] = dateArray;

    // const minDate = '2020-02-01';
    // const minDateArray = minDate.split('-');
    // const [minYear, MinMonth] = minDateArray;

    let passed = true;
    // const now = new Date();
    // const nowYeah = now.getFullYear();
    // const nowMonth = now.getMonth() + 1;
    // const nowDay = now.getDate();
    // if (+year < +minYear) passed = false;
    // if (+year === +minYear && +month < +MinMonth) passed = false;
    // if (+year === +minYear && +month > 1) passed = true;
    // if (value === minDate) passed = true;
    // if (+year > nowYeah) passed = false;
    // if (+year === nowYeah && +month > nowMonth) passed = false;
    // if (+year === nowYeah && +month === nowMonth && +day > nowDay) passed = false;
    const minDate = new Date('2020-02-01').getTime();
    const passedDate = new Date(value).getTime();
    const todaysDate = new Date().getTime();

    if (passedDate < minDate || passedDate > todaysDate) {
      passed = false;
    }

    if (passed) {
      dispatch(getCovidInfoFromServer(value));
    } else {
      setDateValue(() => value);
      return;
    }
    setDateValue(() => value);
  };

  const filterByCountryName = (value) => {
    let filteredState = [...state].filter(
      (item) => item.name.toLowerCase().includes(value.toLowerCase()),
    );
    filteredState = filteredState.length === 0 ? [false] : filteredState;
    setInternalState(() => filteredState);
  };

  const onInputChange = (e) => {
    setInputValue(() => {
      filterByCountryName(e.target.value);
      return e.target.value;
    });
  };

  useEffect(() => {
    setInternalState(() => state);
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-heading">Worldwide Cases</h1>
      <h1 className="home-heading h-heading">{state[0] && new Date(state[0].date).toDateString()}</h1>

      <div className="globe-icon-container">
        <img className="globe" src={Globe} alt="Globe" />
      </div>

      <div className="world-wide">
        <span className="cases name">All Countries</span>
        <span className="cases">Total</span>
        <span>
          {worldWideTotal.toLocaleString()}
        </span>
      </div>

      <div className="sticky-inputs">
        <div className="search-container">
          <span className="search-text">
            Get Data By Date:
          </span>
          <input
            value={dateValue}
            min="2020-02-01"
            max={new Date().toLocaleDateString().split('/').reverse()
              .join('-')}
            onChange={onDateChange}
            className="search-field"
            placeholder="Search"
            type="date"
          />
        </div>

        <div className="search-container search-down">
          <span className="search-text">
            STATS BY COUNTRY
          </span>
          <input id="country-search" className="search-field" placeholder="Search" onChange={onInputChange} value={inputValue} type="text" />
        </div>
      </div>

      {(internalState.length === 0 ? state : internalState).map((item, index) => {
        if (item === false) return <div key={Math.random()} className="no-match">No match found</div>;
        if (index % 2 === 0 && isEven) {
          isEven = !isEven;
          const className = 'home-country-card gray1';
          return (
            <CountryCard
              key={uuidv4()}
              className={className}
              date={item.date}
              id={item.id}
            />
          );
        }
        if (index % 2 === 0 && !isEven) {
          isEven = !isEven;
          const className = 'home-country-card gray2';
          return (
            <CountryCard
              key={uuidv4()}
              className={className}
              date={item.date}
              id={item.id}
            />
          );
        }
        if (index % 2 === 1 && !isOdd) {
          isOdd = !isOdd;
          const className = 'home-country-card gray2';
          return (
            <CountryCard
              key={uuidv4()}
              className={className}
              date={item.date}
              id={item.id}
            />
          );
        }
        if (index % 2 === 1 && isOdd) {
          isOdd = !isOdd;
          const className = 'home-country-card gray1';
          return (
            <CountryCard
              key={uuidv4()}
              className={className}
              date={item.date}
              id={item.id}
            />
          );
        }
        return false;
      })}
      <div className="source">
        Source:
        {' '}
        {state[0] && state[0].source}
      </div>
    </div>
  );
};

export default HomePage;
