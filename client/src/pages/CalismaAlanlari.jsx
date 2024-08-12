import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CalismaAlanlariList from '../components/CalismaAlanlariList';

function CalismaAlanlari() {
  const [rows, setRows] = useState([]);
  const [Durum, setDurum] = useState('');
  const [CalismaAlaniID, setCalismaAlaniID] = useState('');
  const [Kapasite, setKapasite] = useState('');
  const [OdaNo, setOdaNo] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/calismaalani', {
          params: {
            Durum, CalismaAlaniID, Kapasite, OdaNo,
          },
        });
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching calismaalani data:', error);
      }
    };

    fetchData();
  }, [Durum, CalismaAlaniID, Kapasite, OdaNo]);

  const handleNavigateToCalismaAlaniEkle = () => {
    navigate('/CalismaAlaniEkle'); // Navigate to the CalismaAlaniEklePage
  };

  return (
    <div>
      <div className="filters">
        <label htmlFor="durum">Durum:
          <select id="durum" value={Durum} onChange={(e) => setDurum(e.target.value)}>
            <option value="">All</option>
            <option value="Boş">Boş</option>
            <option value="Dolu">Dolu</option>
          </select>
        </label>
        <label htmlFor="calismaAlaniID">Calisma Alani ID:
          <input
            type="text"
            id="calismaAlaniID"
            placeholder="Filter by Calisma Alani ID"
            value={CalismaAlaniID}
            onChange={(e) => setCalismaAlaniID(e.target.value)}
          />
        </label>
        <label htmlFor="kapasite">Kapasite:
          <input
            type="text"
            id="kapasite"
            placeholder="Filter by Kapasite"
            value={Kapasite}
            onChange={(e) => setKapasite(e.target.value)}
          />
        </label>
        <label htmlFor="odaNo">Oda No:
          <input
            type="text"
            id="odaNo"
            placeholder="Filter by Oda No"
            value={OdaNo}
            onChange={(e) => setOdaNo(e.target.value)}
          />
        </label>
        {/* New button to navigate to the CalismaAlaniEklePage */}
        <button type="button" onClick={handleNavigateToCalismaAlaniEkle}>Çalışma Alanı Ekle</button>
      </div>
      <CalismaAlanlariList rows={rows} /> {/* Display the filtered list of rows */}
    </div>
  );
}

export default CalismaAlanlari;
