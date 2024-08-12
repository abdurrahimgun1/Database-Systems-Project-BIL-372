import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function CalismaAlanlariList({ rows }) {
  return (
    <div className="calisma-alanlari-list">
      <table>
        <thead>
          <tr>
            <th>Calisma Alani ID</th>
            <th>Kapasite</th>
            <th>Oda No</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.CalismaAlaniID}>
              <td>{row.CalismaAlaniID}</td>
              <td>{row.Kapasite}</td>
              <td>{row.OdaNo}</td>
              <td>{row.Durum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Add PropTypes validation
CalismaAlanlariList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    CalismaAlaniID: PropTypes.string.isRequired,
    Kapasite: PropTypes.string.isRequired,
    OdaNo: PropTypes.string.isRequired,
    Durum: PropTypes.string.isRequired,
  })).isRequired,
};

export default CalismaAlanlariList;
