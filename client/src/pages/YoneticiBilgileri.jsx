import React, { useState } from 'react';
import axios from 'axios';
import '../style/YoneticiBilgileri.css';

function YoneticiBilgileri() {
  const [YoneticiID, setYoneticiID] = useState('');
  const [yonetici, setYonetici] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetchYonetici = async () => {
    setMessage('');
    setYonetici(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/yonetici/${YoneticiID}`);
      setYonetici(response.data);
    } catch (error) {
      setMessage('Yönetici bilgileri getirilirken bir hata oluştu.');
      console.error('Error fetching yonetici:', error);
    }
  };

  return (
    <div className="yonetici-bilgileri-container">
      <h2>Yönetici Bilgileri</h2>
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
        <button type="button" onClick={handleFetchYonetici}>Bilgileri Getir</button>
      </div>

      {message && <p>{message}</p>}

      {yonetici && (
        <div className="yonetici-details">
          <h3>{yonetici.Ad} {yonetici.Soyad}</h3>
          <p><strong>Email:</strong> {yonetici.Email}</p>
          <p><strong>Telefon:</strong> {yonetici.Telefon}</p>
          <p><strong>Adres:</strong> {yonetici.Adres}</p>
        </div>
      )}
    </div>
  );
}

export default YoneticiBilgileri;
