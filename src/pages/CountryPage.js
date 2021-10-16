import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TableRow from '../components/TableRow';

const CountryPage = () => {
  const location = useLocation();
  let idMain;
  let dateMain;
  let flagMain;
  if (location.data) {
    idMain = location.data.id;
    dateMain = location.data.date;
    flagMain = location.flag;
    localStorage.setItem('idState', JSON.stringify([idMain, dateMain, flagMain]));
  } else {
    const idState = JSON.parse(localStorage.getItem('idState'));
    const [id, date, flag] = idState;
    idMain = id;
    dateMain = date;
    flagMain = flag;
  }

  let state = useSelector((state) => state.covid19Data);
  state = Array.isArray(state) ? state : [];
  const data = state.filter((item) => item.id === idMain)[0];
  const { regions } = data || { rogions: [] };
  return (
    <div className="country-container">
      <h1 className="country-header">Country Cases</h1>
      <h1 className="country-header h-heading">
        {new Date(dateMain).toDateString()}
      </h1>
      <div className="world-wide-country">
        <div className="globe-icon-container">
          <img className="country-image" src={flagMain} alt="national flag" />
        </div>
        <div className="world-wide">
          <span className="cases name">{data && data.name}</span>
          <span className="cases">Total</span>
          <span>{data && data.today_confirmed.toLocaleString()}</span>
        </div>
      </div>
      <span className="break-down">Country Data Breakdown</span>
      <table className="country-table">
        {data && (
          <tbody className="coutry-tbody">
            <TableRow param="Cases Today" value={data.today_new_confirmed} />
            <TableRow param="Total Deaths" value={data.today_deaths} />
            <TableRow param="Deaths Today" value={data.today_new_deaths} />
            <TableRow param="Open Cases" value={data.today_open_cases} />
            <TableRow param="Total Recovery" value={data.today_recovered} />
            <TableRow param="Recovery Today" value={data.today_new_recovered} />
          </tbody>
        )}
      </table>
      <span className="break-down">Data By Region</span>
      <div className="regions-container">
        {regions ? regions.sort(
          (a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if ((b.name > a.name)) {
              return -1;
            }
            return 0;
          },
        ).map((item) => (
          <NavLink
            to={{
              pathname: `/region/${data.name.toLowerCase().split(' ').join('')}/${item.name.toLowerCase().split(' ').join('')}`,
              data: item,
              country: data.name.toLowerCase().split(' ').join(''),
              flag: flagMain,
            }}
            className="region-data-container-link"
            key={uuidv4()}
            exact
          >
            <div className="region-data-container">
              <p className="region-name">{item.name}</p>
              <div className="inner-region-container">
                <p className="region-case">{item.today_confirmed.toLocaleString()}</p>
                <span className="arrow">
                  <FaArrowRight className="fa-arrow" />
                </span>
              </div>
            </div>
          </NavLink>
        )) : null}
      </div>
      {(regions && !regions[0]) && <div className="not-available">{regions && !regions[0] && 'Regional Data Unavailable'}</div>}
      <div className="source">
        Source:
        {' '}
        {data && data.source}
      </div>
    </div>
  );
};

export default CountryPage;
