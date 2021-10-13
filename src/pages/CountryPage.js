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
          <TableRow param="one" value="val" />
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
