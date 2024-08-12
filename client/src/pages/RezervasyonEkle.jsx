import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/RezervasyonEkle.css'; // Add a custom CSS file for styling

function RezervasyonEkle() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [CalismaAlaniID, setCalismaAlaniID] = useState('');
  const [RezervasyonSaati, setRezervasyonSaati] = useState('');
  const [RezervasyonTarihi, setRezervasyonTarihi] = useState('');
  const [KisiSayisi, setKisiSayisi] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insert the new reservation into rezervasyonyapar table
      await axios.post('http://localhost:5000/api/rezervasyonlar', {
        KullaniciID,
        CalismaAlaniID,
        RezervasyonSaati,
        RezervasyonTarihi,
        KisiSayisi,
      });

      // Update the Durum of the selected calismaalani to 'Dolu'
      await axios.put(`http://localhost:5000/api/calismaalani/${CalismaAlaniID}`, {
        Durum: 'Dolu',
      });

      // Navigate back to the RezervasyonYap page or any other page after successful submission
      navigate('/RezervasyonYap');
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="rezervasyon-ekle-container">
      <h2>Rezervasyon Ekle</h2>
      <form onSubmit={handleSubmit} className="rezervasyon-form">
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
          <label htmlFor="CalismaAlaniID">Çalışma Alanı ID:
            <input
              type="text"
              id="CalismaAlaniID"
              value={CalismaAlaniID}
              onChange={(e) => setCalismaAlaniID(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="RezervasyonSaati">Rezervasyon Saati:
            <input
              type="time"
              id="RezervasyonSaati"
              value={RezervasyonSaati}
              onChange={(e) => setRezervasyonSaati(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="RezervasyonTarihi">Rezervasyon Tarihi:
            <input
              type="date"
              id="RezervasyonTarihi"
              value={RezervasyonTarihi}
              onChange={(e) => setRezervasyonTarihi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="KisiSayisi">Kişi Sayısı:
            <input
              type="number"
              id="KisiSayisi"
              value={KisiSayisi}
              onChange={(e) => setKisiSayisi(e.target.value)}
              required
              min="1"
            />
          </label>
        </div>

        <button type="submit" className="submit-button">Rezervasyon Ekle</button>
      </form>
    </div>
  );
}

export default RezervasyonEkle;
