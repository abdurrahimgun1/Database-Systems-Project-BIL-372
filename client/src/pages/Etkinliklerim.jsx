import React, { useState } from 'react';
import axios from 'axios';
import '../style/Etkinliklerim.css';

function Etkinliklerim() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [etkinlikler, setEtkinlikler] = useState([]);

  const handleFetchEtkinlikler = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/etkinliklerim/${KullaniciID}`);
      setEtkinlikler(response.data);
    } catch (error) {
      console.error('Error fetching etkinliklerim:', error);
    }
  };

  return (
    <div className="etkinliklerim-container">
      <h2>Etkinliklerim</h2>
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
        <button type="button" onClick={handleFetchEtkinlikler}>Etkinlikleri Getir</button>
      </div>

      <div className="etkinlikler-list">
        {etkinlikler.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Etkinlik ID</th>
                <th>Ad</th>
                <th>Açıklama</th>
                <th>Konum</th>
                <th>Başlangıç Tarihi</th>
                <th>Bitiş Tarihi</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {etkinlikler.map((etkinlik) => (
                <tr key={etkinlik.EtkinlikID}>
                  <td>{etkinlik.EtkinlikID}</td>
                  <td>{etkinlik.Ad}</td>
                  <td>{etkinlik.Aciklama}</td>
                  <td>{etkinlik.Konum}</td>
                  <td>{etkinlik.BaslangicTarihi}</td>
                  <td>{etkinlik.BitisTarihi}</td>
                  <td>{etkinlik.Durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No past etkinliks found for this Kullanıcı ID.</p>
        )}
      </div>
    </div>
  );
}

export default Etkinliklerim;
