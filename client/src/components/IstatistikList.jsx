import React from 'react';
import PropTypes from 'prop-types';

function IstatistikList({ rows }) {
  return (
    <div className="istatistik-list">
      <table>
        <thead>
          <tr>
            <th>İstatistik ID</th>
            <th>Tarih</th>
            <th>Ziyaret Sayısı</th>
            <th>Ödünç Alma Sayısı</th>
            <th>Rezervasyon Sayısı</th>
            <th>Cezalı Kullanıcı Sayısı</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.IstatistikID}>
              <td>{row.IstatistikID}</td>
              <td>{new Date(row.Tarih).toLocaleDateString()}</td>
              <td>{row.ZiyaretSayisi}</td>
              <td>{row.OduncAlmaSayisi}</td>
              <td>{row.RezervasyonSayisi}</td>
              <td>{row.CezaliKullaniciSayisi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

IstatistikList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    IstatistikID: PropTypes.number.isRequired,
    Tarih: PropTypes.string.isRequired,
    ZiyaretSayisi: PropTypes.number.isRequired,
    OduncAlmaSayisi: PropTypes.number.isRequired,
    RezervasyonSayisi: PropTypes.number.isRequired,
    CezaliKullaniciSayisi: PropTypes.number.isRequired,
  })).isRequired,
};

export default IstatistikList;
