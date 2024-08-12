import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../style/FilterableTableList.css';

function KaynaklarList({
  rows, visibleColumns, filterKaynakAdi, filterYazarAdi, filterCikisYili, unique,
}) {
  const [filteredData, setFilteredData] = useState(rows);

  useEffect(() => {
    const filtered = rows.filter((item) => {
      const isKaynakAdiMatch = item.KaynakAdi.toLowerCase().includes(filterKaynakAdi.toLowerCase());
      const isYazarAdiMatch = item.YazarAdi.toLowerCase().includes(filterYazarAdi.toLowerCase());
      const isCikisYiliMatch = item.KaynakCikisYili.toString().includes(filterCikisYili);

      return isKaynakAdiMatch && isYazarAdiMatch && isCikisYiliMatch;
    });

    setFilteredData(filtered);
  }, [rows, filterKaynakAdi, filterYazarAdi, filterCikisYili]);

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
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
          {visibleColumns.includes('Alan') && <th>Alan</th>}
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
            {visibleColumns.includes('Alan') && <td>{item.Alan}</td>}
            {visibleColumns.includes('YayinTarihi') && <td>{item.YayinTarihi}</td>}
            {visibleColumns.includes('Aralik') && <td>{item.Aralik}</td>}
            {visibleColumns.includes('Tur') && <td>{item.Tur}</td>}
            {visibleColumns.includes('Konu') && <td>{item.Konu}</td>}
            {visibleColumns.includes('Yayinevi') && <td>{item.Yayinevi}</td>}
            {visibleColumns.includes('KaynakKonumu') && <td>{item.KaynakKonumu}</td>}
            {visibleColumns.includes('DijitalFormat') && <td>{item.DijitalFormat}</td>}
            {visibleColumns.includes('URL') && <td><a href={item.URL}>{item.URL}</a></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

KaynaklarList.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterKaynakAdi: PropTypes.string.isRequired,
  filterYazarAdi: PropTypes.string.isRequired,
  filterCikisYili: PropTypes.string.isRequired,
  unique: PropTypes.string.isRequired,
};

export default KaynaklarList;
