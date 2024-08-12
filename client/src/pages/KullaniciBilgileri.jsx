import React, { useState } from 'react';
import axios from 'axios';
import '../style/KullaniciBilgileri.css';

function KullaniciBilgileri() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [kullanici, setKullanici] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetchKullanici = async () => {
    setMessage('');
    setKullanici(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/kullanici/${KullaniciID}`);
      setKullanici(response.data);
    } catch (error) {
      setMessage('Kullanıcı bilgileri getirilirken bir hata oluştu.');
      console.error('Error fetching kullanici:', error);
    }
  };

  return (
    <div className="kullanici-bilgileri-container">
      <h2>Kullanıcı Bilgileri</h2>
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
        <button type="button" onClick={handleFetchKullanici}>Bilgileri Getir</button>
      </div>

      {message && <p>{message}</p>}

      {kullanici && (
        <div className="kullanici-details">
          <h3>{kullanici.Ad} {kullanici.Soyad}</h3>
          <p><strong>Email:</strong> {kullanici.Email}</p>
          <p><strong>Telefon:</strong> {kullanici.Telefon}</p>
          <p><strong>Adres:</strong> {kullanici.Adres}</p>
          <p><strong>Kayıt Tarihi:</strong> {new Date(kullanici.KayitTarihi).toLocaleDateString()}</p>
          <p><strong>Ceza Puanı:</strong> {kullanici.CezaPuani}</p>
        </div>
      )}
    </div>
  );
}

export default KullaniciBilgileri;
