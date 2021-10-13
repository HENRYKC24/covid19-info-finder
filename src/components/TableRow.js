import React from 'react';

const TableRow = (props) => {
  const { param, value } = props;
  return (
    <tr>
      <td>{param}</td>
      <td>{value}</td>
    </tr>
  );
};

export default TableRow;
