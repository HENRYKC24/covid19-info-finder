import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaGlobeAmericas } from 'react-icons/fa';
import CountryCard from '../components/CountryCard';
import { getCovidInfoFromServer } from '../redux/covid19/covid19';

const HomePage = () => {
  const dispatch = useDispatch();
  let state = useSelector((state) => state.covid19Data);
  state = Array.isArray(state) ? state : [];

  const [internalState, setInternalState] = useState(state);
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  let isEven = true;
  let isOdd = false;

  const onDateChange = (e) => {
    setDateValue(() => {
      dispatch(getCovidInfoFromServer(e.target.value));
      return e.target.value;
    });
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

  // useEffect(() => {
  //   dispatch(getCovidInfoFromServer(dateValue));
  // }, []);

  return (
    <div className="home-container">
      <h1 className="home-heading">Confirmed Cases By Country</h1>
      <h1 className="home-heading h-heading">{state[0] && new Date(state[0].date).toDateString()}</h1>

      <div className="search-container">
        <span className="search-text">
          Get Data By Date:
        </span>
        <input
          value={dateValue}
          min="2020-01-31"
          max={new Date().toLocaleDateString().split('/').reverse()
            .join('-')}
          onChange={onDateChange}
          className="search-field"
          placeholder="Search"
          type="date"
        />
      </div>

      <div className="home-country-card bk-grnd">
        <FaGlobeAmericas />
      </div>

      <div className="home-country-card gray1">
        <div className="name-cases">
          <span className="cases">WorldWide</span>
        </div>
      </div>

      <div className="search-container search-down">
        <span className="search-text">
          Search by country:
        </span>
        <input className="search-field" placeholder="Search" onChange={onInputChange} value={inputValue} type="text" />
      </div>

      {(internalState.length === 0 ? state : internalState).map((item, index) => {
        if (item === false) return <div key={Math.random()} className="no-match">No match found</div>;
        if (index % 2 === 0 && isEven) {
          isEven = !isEven;
          const className = 'home-country-card gray1';
          return <CountryCard key={Math.random()} className={className} item={item} />;
        }
        if (index % 2 === 0 && !isEven) {
          isEven = !isEven;
          const className = 'home-country-card gray2';
          return <CountryCard key={Math.random()} className={className} item={item} />;
        }
        if (index % 2 === 1 && !isOdd) {
          isOdd = !isOdd;
          const className = 'home-country-card gray2';
          return <CountryCard key={Math.random()} className={className} item={item} />;
        }
        if (index % 2 === 1 && isOdd) {
          isOdd = !isOdd;
          const className = 'home-country-card gray1';
          return <CountryCard key={Math.random()} className={className} item={item} />;
        }
        return false;
      })}
    </div>
  );
};

export default HomePage;
