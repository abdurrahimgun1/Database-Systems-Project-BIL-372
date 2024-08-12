import React, { useState } from 'react';
import axios from 'axios';
import '../style/Rezervasyonlarim.css';

function Rezervasyonlarim() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [reservations, setReservations] = useState([]);

  const handleFetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rezervasyonlar/${KullaniciID}`);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  return (
    <div className="rezervasyonlarim-container">
      <h2>Rezervasyonlarım</h2>
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
        <button type="button" onClick={handleFetchReservations}>Rezervasyonları Getir</button>
      </div>

      <div className="reservations-list">
        {reservations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Kullanıcı ID</th>
                <th>Çalışma Alanı ID</th>
                <th>Rezervasyon Saati</th>
                <th>Rezervasyon Tarihi</th>
                <th>Kişi Sayısı</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={`${reservation.KullaniciID}-${reservation.CalismaAlaniID}-${reservation.RezervasyonTarihi}-${reservation.RezervasyonSaati}`}>
                  <td>{reservation.KullaniciID}</td>
                  <td>{reservation.CalismaAlaniID}</td>
                  <td>{reservation.RezervasyonSaati}</td>
                  <td>{reservation.RezervasyonTarihi}</td>
                  <td>{reservation.KisiSayisi}</td>
                  <td>{reservation.RezervasyonDurumu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reservations found for this Kullanıcı ID.</p>
        )}
      </div>
    </div>
  );
}

export default Rezervasyonlarim;
