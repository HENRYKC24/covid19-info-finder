import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TableRow from '../components/TableRow';

const RegionPage = () => {
  let location = useLocation();
  let data;
  let country;
  let flag;
  if (!location.data) {
    location = JSON.parse(localStorage.getItem('regionData'));
    data = location.data;
    country = location.country;
    flag = location.flag;
  } else {
    data = location.data;
    country = location.country;
    flag = location.flag;
    localStorage.setItem('regionData', JSON.stringify({ data, country, flag }));
  }
  const { sub_regions: subRegions } = data;
  return (
    <div className="region-container">
      <h1 className="country-header">Regional Cases</h1>
      <h1 className="country-header h-heading">
        {new Date(data.date).toDateString()}
      </h1>
      <div className="world-wide-country">
        <div className="globe-icon-container">
          <img className="country-image" src={flag} alt="national flag" />
        </div>
        <div className="world-wide">
          <span className="cases name">{data && data.name}</span>
          <span className="cases">Total</span>
          <span>{data && data.today_confirmed.toLocaleString()}</span>
        </div>
      </div>
      <span className="break-down">Regional Data Breakdown</span>
      <table className="country-table">
        {data && (
          <tbody className="coutry-tbody">
            <TableRow param="Cases Today" value={data.today_new_confirmed ? data.today_new_confirmed : 'N/A'} />
            <TableRow param="Total Deaths" value={data.today_deaths ? data.today_deaths : 'N/A'} />
            <TableRow param="Deaths Today" value={data.today_new_deaths ? data.today_new_deaths : 'N/A'} />
            <TableRow param="Open Cases" value={data.today_open_cases ? data.today_open_cases : 'N/A'} />
            <TableRow param="Total Recovery" value={data.today_recovered ? data.today_recovered : 'N/A'} />
            <TableRow param="Recovery Today" value={data.today_new_recovered ? data.today_new_recovered : 'N/A'} />
          </tbody>
        )}
      </table>
      <span className="break-down">Data By Sub-Region</span>
      <div className="regions-container">
        {subRegions ? subRegions.sort(
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
              pathname: `/subregion/${country}/${data.name.toLowerCase().split(' ').join('')}/${item.name.toLowerCase().split(' ').join('')}`,
              data: item,
              flag,
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
    </div>
  );
};

export default RegionPage;
