import React from 'react';
import { useLocation } from 'react-router-dom';
import TableRow from '../components/TableRow';

const CountryPage = () => {
  const location = useLocation();
  let { data } = location;
  if (!data) {
    data = JSON.parse(localStorage.getItem('data'));
  } else {
    localStorage.setItem('data', JSON.stringify(data));
  }
  console.log(data);
  return (
    <div className="country-container">
      <h1 className="country-header">
        {new Date(data.date).toDateString()}
      </h1>
      <h1 className="counry-page-name">{data.name}</h1>
      <table className="country-table">
        <thead className="country-thead">
          <tr className="country-head-row">
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody className="coutry-tbody">
          <TableRow param="Total Confirmed" value={data.today_confirmed} />
          <TableRow param="Cases Today" value={data.today_new_confirmed} />
          <TableRow param="Total Deaths" value={data.today_deaths} />
          <TableRow param="Deaths Today" value={data.today_new_deaths} />
          <TableRow param="Open Cases" value={data.today_open_cases} />
          <TableRow param="Total Recovery" value={data.today_recovered} />
          <TableRow param="Recovery Today" value={data.today_new_recovered} />
        </tbody>
      </table>
      <span>
        Source:
        {data.source}
      </span>
      <div>
        <p>Regional Data</p>
      </div>
    </div>
  );
};

export default CountryPage;
