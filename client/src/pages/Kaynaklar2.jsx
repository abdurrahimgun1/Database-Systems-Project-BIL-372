import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import KaynaklarList2 from '../components/KaynaklarList2';
import '../style/FilterableTableList.css';

function KaynakSelect({
  kaynakType,
  setKaynakType,
  secondType,
  setSecondType,
}) {
  return (
    <div className="filters">
      <label htmlFor="kaynakTypeDropdown">
        <select
          id="kaynakTypeDropdown"
          value={kaynakType}
          onChange={(e) => setKaynakType(e.target.value)}
        >
          <option value="fiziksel">Fiziksel Kaynak</option>
          <option value="ekaynak">E-Kaynak</option>
        </select>
      </label>
      <label htmlFor="secondTypeDropdown">
        <select
          id="secondTypeDropdown"
          value={secondType}
          onChange={(e) => setSecondType(e.target.value)}
        >
          <option value="hiçbiri">Hiçbiri</option>
          <option value="ansiklopedi">Ansiklopedi</option>
          <option value="dergi">Dergi</option>
          <option value="kitap">Kitap</option>
        </select>
      </label>
    </div>
  );
}

KaynakSelect.propTypes = {
  kaynakType: PropTypes.string.isRequired,
  setKaynakType: PropTypes.func.isRequired,
  secondType: PropTypes.string.isRequired,
  setSecondType: PropTypes.func.isRequired,
};

function Kaynaklar() {
  const [rows, setRows] = useState([]);
  const [kaynakType, setKaynakType] = useState('fiziksel');
  const [secondType, setSecondType] = useState('hiçbiri');
  const [visibleColumns, setVisibleColumns] = useState([
    'KaynakID', 'KaynakAdi', 'KaynakCikisYili', 'StokSayisi', 'IadeEdilmesiGerekenMaxSure', 'SayfaSayisi', 'Dil', 'KaynakTuru', 'EkleyenYonetici', 'EklenmeTarihi', 'YazarAdi',
  ]);

  useEffect(() => {
    const updateVisibleColumns = () => {
      const columns = [
        'KaynakID', 'KaynakAdi', 'KaynakCikisYili', 'StokSayisi', 'IadeEdilmesiGerekenMaxSure', 'SayfaSayisi', 'Dil', 'KaynakTuru', 'EkleyenYonetici', 'EklenmeTarihi', 'YazarAdi',
      ];

      if (kaynakType === 'fiziksel') {
        columns.push('FizikselTur', 'KaynakKonumu');
      } else if (kaynakType === 'ekaynak') {
        columns.push('DijitalFormat', 'URL');
      }

      if (secondType === 'ansiklopedi') {
        columns.push('CiltNo', 'OzellistigiAlan');
      } else if (secondType === 'dergi') {
        columns.push('YayinTarihi', 'Aralik', 'Tur');
      } else if (secondType === 'kitap') {
        columns.push('Konu', 'Tur', 'Yayinevi');
      }

      setVisibleColumns(columns);
    };

    const fetchData = async () => {
      const endpoint = 'http://localhost:5000/api/kaynaklar';
      try {
        const response = await axios.get(endpoint, {
          params: { kaynakType, secondType },
        });
        console.log('Received data:', response.data);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    updateVisibleColumns();
    fetchData();
  }, [kaynakType, secondType]);

  return (
    <div>
      <KaynaklarList2
        rows={rows}
        visibleColumns={visibleColumns}
        compFilter={<KaynakSelect kaynakType={kaynakType} setKaynakType={setKaynakType} secondType={secondType} setSecondType={setSecondType} />}
        unique="KaynakID"
        addTo="/KaynakEkle/"
      />
    </div>
  );
}

function KaynaklarPage() {
  return (
    <div>
      <Kaynaklar />
    </div>
  );
}

export default KaynaklarPage;
