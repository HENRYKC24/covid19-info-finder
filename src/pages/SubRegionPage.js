import React from 'react';
import { useLocation } from 'react-router-dom';
import TableRow from '../components/TableRow';

const SubRegionPage = () => {
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
    console.log(data, 'sub region yes location data');
    country = location.country;
    flag = location.flag;
    localStorage.setItem('regionData', JSON.stringify({ data, country, flag }));
  }
  // const { data, country } = location;
  // const { sub_regions: dataMain } = data;
  return (
    <div>
      <h1 className="country-header">Sub-Regional Cases</h1>
      <h1 className="country-header h-heading">
        {new Date(data.date).toDateString()}
      </h1>
      <div className="world-wide-country">
        <div className="globe-icon-container">
          {/* <FaGlobeAmericas /> */}
          <img className="country-image" src={flag} alt="national flag" />
        </div>
        <div className="world-wide">
          <span className="cases">{data && data.name}</span>
          <span className="cases">Total</span>
          <span>{data && data.today_confirmed.toLocaleString()}</span>
        </div>
      </div>
      <span className="break-down">Sub-Regional Data Breakdown</span>
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
      {/* <span className="break-down">Data By Sub-Region</span> */}
    </div>
  );
};

export default SubRegionPage;
