import React, { useState } from 'react';
import axios from 'axios';
import '../style/IstatistikEkle.css';

function IstatistikEkle() {
  const [IstatistikID, setIstatistikID] = useState('');
  const [Tarih, setTarih] = useState('');
  const [ZiyaretSayisi, setZiyaretSayisi] = useState('');
  const [OduncAlmaSayisi, setOduncAlmaSayisi] = useState('');
  const [RezervasyonSayisi, setRezervasyonSayisi] = useState('');
  const [CezaliKullaniciSayisi, setCezaliKullaniciSayisi] = useState('');
  const [YoneticiID, setYoneticiID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Insert into istatistik table
      const responseIstatistik = await axios.post('http://localhost:5000/api/istatistik', {
        IstatistikID,
        Tarih,
        ZiyaretSayisi,
        OduncAlmaSayisi,
        RezervasyonSayisi,
        CezaliKullaniciSayisi,
      });

      // Insert into istatistikgorur table
      const responseIstatistikGorur = await axios.post('http://localhost:5000/api/istatistikgorur', {
        YoneticiID,
        IstatistikID,
      });

      setMessage('İstatistik başarıyla eklendi ve yönetici ile ilişkilendirildi.');

      // Clear the form fields after successful submission
      setIstatistikID('');
      setTarih('');
      setZiyaretSayisi('');
      setOduncAlmaSayisi('');
      setRezervasyonSayisi('');
      setCezaliKullaniciSayisi('');
      setYoneticiID('');
    } catch (error) {
      setMessage('İstatistik eklenirken bir hata oluştu.');
      console.error('Error adding istatistik:', error);
    }
  };

  return (
    <div className="istatistik-ekle-container">
      <h2>İstatistik Ekle</h2>
      <form onSubmit={handleSubmit} className="istatistik-ekle-form">
        <div className="form-group">
          <label htmlFor="IstatistikID">İstatistik ID:
            <input
              type="text"
              id="IstatistikID"
              value={IstatistikID}
              onChange={(e) => setIstatistikID(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Tarih">Tarih:
            <input
              type="date"
              id="Tarih"
              value={Tarih}
              onChange={(e) => setTarih(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="ZiyaretSayisi">Ziyaret Sayısı:
            <input
              type="text"
              id="ZiyaretSayisi"
              value={ZiyaretSayisi}
              onChange={(e) => setZiyaretSayisi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="OduncAlmaSayisi">Ödünç Alma Sayısı:
            <input
              type="text"
              id="OduncAlmaSayisi"
              value={OduncAlmaSayisi}
              onChange={(e) => setOduncAlmaSayisi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="RezervasyonSayisi">Rezervasyon Sayısı:
            <input
              type="text"
              id="RezervasyonSayisi"
              value={RezervasyonSayisi}
              onChange={(e) => setRezervasyonSayisi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="CezaliKullaniciSayisi">Cezalı Kullanıcı Sayısı:
            <input
              type="text"
              id="CezaliKullaniciSayisi"
              value={CezaliKullaniciSayisi}
              onChange={(e) => setCezaliKullaniciSayisi(e.target.value)}
              required
            />
          </label>
        </div>

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

        <button type="submit" className="submit-button">Ekle</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default IstatistikEkle;
