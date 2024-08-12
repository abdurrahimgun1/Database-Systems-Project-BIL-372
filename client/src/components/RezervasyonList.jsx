import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function RezervasyonList({ rows }) {
  const [filteredData, setFilteredData] = useState(rows);

  useEffect(() => {
    setFilteredData(rows);
  }, [rows]);

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Calisma Alani ID</th>
          <th>Durum</th>
          <th>Kapasite</th>
          <th>Oda No</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.CalismaAlaniID}>
            <td>{item.CalismaAlaniID}</td>
            <td>{item.Durum}</td>
            <td>{item.Kapasite}</td>
            <td>{item.OdaNo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

RezervasyonList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RezervasyonList;
