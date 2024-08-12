import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import IstatistikList from '../components/IstatistikList';
import '../style/Istatistikler.css';

function Istatistikler() {
  const [YoneticiID, setYoneticiID] = useState('');
  const [rows, setRows] = useState([]);
  const [IstatistikID, setIstatistikID] = useState('');
  const [Tarih, setTarih] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleFetchIstatistikler = async () => {
    setMessage('');
    setRows([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/istatistikler/${YoneticiID}`, {
        params: { IstatistikID, Tarih },
      });
      setRows(response.data);
    } catch (error) {
      setMessage('İstatistikler getirilirken bir hata oluştu.');
      console.error('Error fetching istatistikler:', error);
    }
  };

  const handleNavigateToIstatistikEkle = () => {
    navigate('/IstatistikEkle'); // Navigate to the IstatistikEkle page
  };

  return (
    <div className="istatistikler-container">
      <h2>İstatistikler</h2>
      <div className="form-group">
        <label htmlFor="YoneticiID">Yönetici ID:
          <input
            type="text"
            id="YoneticiID"
            value={YoneticiID}
            onChange={(e) => setYoneticiID(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="filters">
        <label htmlFor="IstatistikID">İstatistik ID:
          <input
            type="text"
            id="IstatistikID"
            placeholder="Filter by İstatistik ID"
            value={IstatistikID}
            onChange={(e) => setIstatistikID(e.target.value)}
          />
        </label>

        <label htmlFor="Tarih">Tarih:
          <input
            type="date"
            id="Tarih"
            placeholder="Filter by Tarih"
            value={Tarih}
            onChange={(e) => setTarih(e.target.value)}
          />
        </label>

        <button type="button" onClick={handleFetchIstatistikler}>İstatistikleri Getir</button>
        <button type="button" onClick={handleNavigateToIstatistikEkle}>İstatistik Ekle</button>
      </div>

      {message && <p>{message}</p>}

      {rows.length > 0 && <IstatistikList rows={rows} />}
    </div>
  );
}

export default Istatistikler;
