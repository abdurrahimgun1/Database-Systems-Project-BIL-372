import React, { useState } from 'react';
import axios from 'axios';
import '../style/KayitOl.css';

function KayitOl() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [EtkinlikID, setEtkinlikID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/kayit', {
        KullaniciID,
        EtkinlikID,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Kayıt yapılırken bir hata oluştu.');
      console.error('Error creating kayit:', error);
    }
  };

  return (
    <div className="kayit-ol-container">
      <h2>Etkinlik Kaydı</h2>
      <form onSubmit={handleSubmit} className="kayit-form">
        <div className="form-group">
          <label htmlFor="KullaniciID">Kullanıcı ID:
            <input
              type="text"
              id="KullaniciID"
              value={KullaniciID}
              onChange={(e) => setKullaniciID(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="EtkinlikID">Etkinlik ID:
            <input
              type="text"
              id="EtkinlikID"
              value={EtkinlikID}
              onChange={(e) => setEtkinlikID(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" className="submit-button">Kayıt Ol</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default KayitOl;
