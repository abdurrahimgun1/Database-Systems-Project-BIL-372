import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/AddPage.css';
import '../style/AnaSayfa.css';
import '../style/FilterableTableList.css';

function Add({ addTo, unique }) {
  return (
    <Link to={addTo} state={{ unique }}>
      <button type="button" className="etkinlik-button">Kaynak Ekle</button>
    </Link>
  );
}

Add.propTypes = {
  addTo: PropTypes.string.isRequired,
  unique: PropTypes.string.isRequired,
};

function KaynaklarList2({
  rows, visibleColumns, compFilter, addTo, unique, compAfter,
}) {
  const [filteredData, setFilteredData] = useState(rows);
  const [filterKaynakAdi, setFilterKaynakAdi] = useState('');
  const [filterYazarAdi, setFilterYazarAdi] = useState('');
  const [filterCikisYili, setFilterCikisYili] = useState('');

  useEffect(() => {
    const filtered = rows.filter((item) => {
      const isKaynakAdiMatch = item.KaynakAdi.toLowerCase().includes(filterKaynakAdi.toLowerCase());
      const isYazarAdiMatch = item.YazarAdi.toLowerCase().includes(filterYazarAdi.toLowerCase());
      const isCikisYiliMatch = item.KaynakCikisYili.toString().includes(filterCikisYili);

      return isKaynakAdiMatch && isYazarAdiMatch && isCikisYiliMatch;
    });

    setFilteredData(filtered);
  }, [rows, filterKaynakAdi, filterYazarAdi, filterCikisYili]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/kaynaklar/${id}`);
      setFilteredData(filteredData.filter((item) => item[unique] !== id));
    } catch (error) {
      console.error('Error deleting kaynak:', error);
    }
  };

  return (
    <div>
      <div className="filters">
        {compFilter}

        {visibleColumns.includes('KaynakAdi') && (
          <input
            type="text"
            placeholder="Filter by Kaynak Adı"
            value={filterKaynakAdi}
            onChange={(e) => setFilterKaynakAdi(e.target.value)}
          />
        )}

        {visibleColumns.includes('YazarAdi') && (
          <input
            type="text"
            placeholder="Filter by Yazar"
            value={filterYazarAdi}
            onChange={(e) => setFilterYazarAdi(e.target.value)}
          />
        )}

        {visibleColumns.includes('KaynakCikisYili') && (
          <input
            type="text"
            placeholder="Filter by Çıkış Yılı"
            value={filterCikisYili}
            onChange={(e) => setFilterCikisYili(e.target.value)}
          />
        )}

        <Add addTo={addTo} unique={unique} />
      </div>

      <table>
        <thead>
          <tr>
            <th> </th>
            {visibleColumns.includes('KaynakID') && <th>Kaynak ID</th>}
            {visibleColumns.includes('KaynakAdi') && <th>Kaynak Adı</th>}
            {visibleColumns.includes('KaynakCikisYili') && <th>Çıkış Yılı</th>}
            {visibleColumns.includes('StokSayisi') && <th>Stok Sayısı</th>}
            {visibleColumns.includes('IadeEdilmesiGerekenMaxSure') && <th>Max Kullanım Süresi</th>}
            {visibleColumns.includes('SayfaSayisi') && <th>Sayfa Sayısı</th>}
            {visibleColumns.includes('Dil') && <th>Dil</th>}
            {visibleColumns.includes('EkleyenYonetici') && <th>Ekleyen Yönetici</th>}
            {visibleColumns.includes('EklenmeTarihi') && <th>Eklenme Tarihi</th>}
            {visibleColumns.includes('YazarAdi') && <th>Yazar</th>}
            {visibleColumns.includes('CiltNo') && <th>Cilt No</th>}
            {visibleColumns.includes('OzellistigiAlan') && <th>Özelliştiği Alan</th>}
            {visibleColumns.includes('YayinTarihi') && <th>Yayın Tarihi</th>}
            {visibleColumns.includes('Aralik') && <th>Aralık</th>}
            {visibleColumns.includes('Tur') && <th>Tür</th>}
            {visibleColumns.includes('Konu') && <th>Konu</th>}
            {visibleColumns.includes('Yayinevi') && <th>Yayınevi</th>}
            {visibleColumns.includes('KaynakKonumu') && <th>Kaynak Konumu</th>}
            {visibleColumns.includes('DijitalFormat') && <th>Dijital Format</th>}
            {visibleColumns.includes('URL') && <th>URL</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item[unique]}>
              <td>
                <button type="button" className="etkinlik-button" onClick={() => handleDelete(item[unique])}>Delete</button>
              </td>
              {visibleColumns.includes('KaynakID') && <td>{item.KaynakID}</td>}
              {visibleColumns.includes('KaynakAdi') && <td>{item.KaynakAdi}</td>}
              {visibleColumns.includes('KaynakCikisYili') && <td>{item.KaynakCikisYili}</td>}
              {visibleColumns.includes('StokSayisi') && <td>{item.StokSayisi}</td>}
              {visibleColumns.includes('IadeEdilmesiGerekenMaxSure') && <td>{item.IadeEdilmesiGerekenMaxSure}</td>}
              {visibleColumns.includes('SayfaSayisi') && <td>{item.SayfaSayisi}</td>}
              {visibleColumns.includes('Dil') && <td>{item.Dil}</td>}
              {visibleColumns.includes('EkleyenYonetici') && <td>{item.EkleyenYonetici}</td>}
              {visibleColumns.includes('EklenmeTarihi') && <td>{item.EklenmeTarihi}</td>}
              {visibleColumns.includes('YazarAdi') && <td>{item.YazarAdi}</td>}
              {visibleColumns.includes('CiltNo') && <td>{item.CiltNo}</td>}
              {visibleColumns.includes('OzellistigiAlan') && <td>{item.OzellistigiAlan}</td>}
              {visibleColumns.includes('YayinTarihi') && <td>{item.YayinTarihi}</td>}
              {visibleColumns.includes('Aralik') && <td>{item.Aralik}</td>}
              {visibleColumns.includes('Tur') && <td>{item.Tur}</td>}
              {visibleColumns.includes('Konu') && <td>{item.Konu}</td>}
              {visibleColumns.includes('Yayinevi') && <td>{item.Yayinevi}</td>}
              {visibleColumns.includes('KaynakKonumu') && <td>{item.KaynakKonumu}</td>}
              {visibleColumns.includes('DijitalFormat') && <td>{item.DijitalFormat}</td>}
              {visibleColumns.includes('URL') && <td><a href={item.URL}>{item.URL}</a></td>}
              {(compAfter !== undefined) && <td>{compAfter}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

KaynaklarList2.defaultProps = {
  compFilter: null,
  addTo: '/',
  unique: 'KaynakID',
  compAfter: null,
};

KaynaklarList2.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      KaynakID: PropTypes.number.isRequired,
      KaynakAdi: PropTypes.string.isRequired,
      KaynakCikisYili: PropTypes.number.isRequired,
      YazarAdi: PropTypes.string.isRequired,
      CiltNo: PropTypes.string,
      OzellistigiAlan: PropTypes.string,
      YayinTarihi: PropTypes.string,
      Aralik: PropTypes.string,
      Tur: PropTypes.string,
      Konu: PropTypes.string,
      Yayinevi: PropTypes.string,
      KaynakKonumu: PropTypes.string,
      DijitalFormat: PropTypes.string,
      URL: PropTypes.string,
    }),
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  compFilter: PropTypes.element,
  addTo: PropTypes.string,
  unique: PropTypes.string,
  compAfter: PropTypes.element,
};

export default KaynaklarList2;
