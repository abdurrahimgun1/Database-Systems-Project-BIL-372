import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/AddPage.css';
import '../style/AnaSayfa.css';
import '../style/FilterableTableList.css';

function Add({ addTo, unique }) {
  return (
    <Link to={addTo} state={{ unique }}>
      <button type="button" className="etkinlik-button">Etkinlik Ekle</button>
    </Link>
  );
}

Add.propTypes = {
  addTo: PropTypes.string.isRequired,
  unique: PropTypes.string.isRequired,
};

function FilterableTableList({
  rows, visibleColumns, compFilter, manageTo, addTo, unique, compAfter,
}) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterEtkinlikID, setFilterEtkinlikID] = useState('');
  const [filterAd, setFilterAd] = useState('');
  const [filterAciklama, setFilterAciklama] = useState('');
  const [filterBaslangicTarihi, setFilterBaslangicTarihi] = useState('');
  const [filterBitisTarihi, setFilterBitisTarihi] = useState('');
  const [filterKonum, setFilterKonum] = useState('');
  const [filterKapasite, setFilterKapasite] = useState('');
  const [filterKisiSayisi, setFilterKisiSayisi] = useState('');

  useEffect(() => {
    const filtered = rows.filter((item) => {
      const isEtkinlikIDMatch = item.EtkinlikID.toLowerCase().includes(filterEtkinlikID.toLowerCase());
      const isAdMatch = item.Ad.toLowerCase().includes(filterAd.toLowerCase());
      const isAciklamaMatch = item.Aciklama.toLowerCase().includes(filterAciklama.toLowerCase());
      const isBaslangicTarihiMatch = item.BaslangicTarihi.toLowerCase().includes(filterBaslangicTarihi.toLowerCase());
      const isBitisTarihiMatch = item.BitisTarihi.toLowerCase().includes(filterBitisTarihi.toLowerCase());
      const isKonumMatch = item.Konum.toLowerCase().includes(filterKonum.toLowerCase());
      const isKapasiteMatch = String(item.Kapasite).includes(filterKapasite);
      const isKisiSayisiMatch = String(item.KisiSayisi).includes(filterKisiSayisi);

      return (
        isEtkinlikIDMatch
        && isAdMatch
        && isAciklamaMatch
        && isBaslangicTarihiMatch
        && isBitisTarihiMatch
        && isKonumMatch
        && isKapasiteMatch
        && isKisiSayisiMatch
      );
    });

    setFilteredData(filtered);
  }, [
    rows,
    filterEtkinlikID,
    filterAd,
    filterAciklama,
    filterBaslangicTarihi,
    filterBitisTarihi,
    filterKonum,
    filterKapasite,
    filterKisiSayisi,
  ]);

  const handleAddEvent = (newEvent) => {
    setFilteredData((prevData) => [...prevData, newEvent]);
  };

  return (
    <div>
      <div className="filters">
        {compFilter}

        {visibleColumns.includes('EtkinlikID') && (
          <input
            type="text"
            placeholder="Filter by Event ID"
            value={filterEtkinlikID}
            onChange={(e) => setFilterEtkinlikID(e.target.value)}
          />
        )}

        {visibleColumns.includes('Ad') && (
          <input
            type="text"
            placeholder="Filter by Name"
            value={filterAd}
            onChange={(e) => setFilterAd(e.target.value)}
          />
        )}

        {visibleColumns.includes('Aciklama') && (
          <input
            type="text"
            placeholder="Filter by Description"
            value={filterAciklama}
            onChange={(e) => setFilterAciklama(e.target.value)}
          />
        )}

        {visibleColumns.includes('BaslangicTarihi') && (
          <input
            type="text"
            placeholder="Filter by Start Date"
            value={filterBaslangicTarihi}
            onChange={(e) => setFilterBaslangicTarihi(e.target.value)}
          />
        )}

        {visibleColumns.includes('BitisTarihi') && (
          <input
            type="text"
            placeholder="Filter by End Date"
            value={filterBitisTarihi}
            onChange={(e) => setFilterBitisTarihi(e.target.value)}
          />
        )}

        {visibleColumns.includes('Konum') && (
          <input
            type="text"
            placeholder="Filter by Location"
            value={filterKonum}
            onChange={(e) => setFilterKonum(e.target.value)}
          />
        )}

        {visibleColumns.includes('Kapasite') && (
          <input
            type="text"
            placeholder="Filter by Capacity"
            value={filterKapasite}
            onChange={(e) => setFilterKapasite(e.target.value)}
          />
        )}

        {visibleColumns.includes('KisiSayisi') && (
          <input
            type="text"
            placeholder="Filter by Person Count"
            value={filterKisiSayisi}
            onChange={(e) => setFilterKisiSayisi(e.target.value)}
          />
        )}

        <Add addTo={addTo} unique={unique} />
      </div>

      <table>
        <thead>
          <tr>
            <th> </th>
            {visibleColumns.includes('EtkinlikID') && <th>Event ID</th>}
            {visibleColumns.includes('Ad') && <th>Name</th>}
            {visibleColumns.includes('Aciklama') && <th>Description</th>}
            {visibleColumns.includes('BaslangicTarihi') && <th>Start Date</th>}
            {visibleColumns.includes('BitisTarihi') && <th>End Date</th>}
            {visibleColumns.includes('Konum') && <th>Location</th>}
            {visibleColumns.includes('Kapasite') && <th>Capacity</th>}
            {visibleColumns.includes('KisiSayisi') && <th>Person Count</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item[unique]}>
              {manageTo && (
                <td>
                  <Link to={manageTo} state={{ unique: item[unique], visibleColumns: visibleColumns }}>
                    <button type="button" className="etkinlik-button">Manage</button>
                  </Link>
                </td>
              )}
              {visibleColumns.includes('EtkinlikID') && <td>{item.EtkinlikID}</td>}
              {visibleColumns.includes('Ad') && <td>{item.Ad}</td>}
              {visibleColumns.includes('Aciklama') && <td>{item.Aciklama}</td>}
              {visibleColumns.includes('BaslangicTarihi') && <td>{item.BaslangicTarihi}</td>}
              {visibleColumns.includes('BitisTarihi') && <td>{item.BitisTarihi}</td>}
              {visibleColumns.includes('Konum') && <td>{item.Konum}</td>}
              {visibleColumns.includes('Kapasite') && <td>{item.Kapasite}</td>}
              {visibleColumns.includes('KisiSayisi') && <td>{item.KisiSayisi}</td>}
              {(compAfter !== undefined) && <td>{compAfter}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilterableTableList.defaultProps = {
  compFilter: null,
  manageTo: '/',
  addTo: '/', // Add this line to define default prop
  unique: 'EtkinlikID',
  compAfter: null,
};

FilterableTableList.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      EtkinlikID: PropTypes.string,
      Ad: PropTypes.string,
      Aciklama: PropTypes.string,
      BaslangicTarihi: PropTypes.string,
      BitisTarihi: PropTypes.string,
      Konum: PropTypes.string,
      Kapasite: PropTypes.number,
      KisiSayisi: PropTypes.number,
    }),
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  compFilter: PropTypes.element,
  manageTo: PropTypes.string,
  addTo: PropTypes.string, // Add this line to define the prop type
  unique: PropTypes.string,
  compAfter: PropTypes.element,
};

export default FilterableTableList;
