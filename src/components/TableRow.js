import React from 'react';

const TableRow = (props) => {
  const { param, value } = props;
  return (
    <tr className="table-row">
      <td>{param}</td>
      <td>{value.toLocaleString()}</td>
    </tr>
  );
};

export default TableRow;
