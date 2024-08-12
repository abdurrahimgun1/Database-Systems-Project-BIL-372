import React, { useState } from 'react';
import axios from 'axios';
import '../style/EtkinlikEkle.css';

function EtkinlikEkle() {
  const [EtkinlikID, setEtkinlikID] = useState('');
  const [Ad, setAd] = useState('');
  const [Aciklama, setAciklama] = useState('');
  const [BaslangicTarihi, setBaslangicTarihi] = useState('');
  const [BitisTarihi, setBitisTarihi] = useState('');
  const [Konum, setKonum] = useState('');
  const [Kapasite, setKapasite] = useState('');
  const [KatilimciSayisi, setKatilimciSayisi] = useState('');
  const [Durum, setDurum] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/etkinlik', {
        EtkinlikID,
        Ad,
        Aciklama,
        BaslangicTarihi,
        BitisTarihi,
        Konum,
        Kapasite,
        KatilimciSayisi,
        Durum,
      });
      setMessage(response.data.message);
      // Clear the form fields after successful submission
      setEtkinlikID('');
      setAd('');
      setAciklama('');
      setBaslangicTarihi('');
      setBitisTarihi('');
      setKonum('');
      setKapasite('');
      setKatilimciSayisi('');
      setDurum('');
    } catch (error) {
      setMessage('Etkinlik eklenirken bir hata oluştu.');
      console.error('Error adding etkinlik:', error);
    }
  };

  return (
    <div className="etkinlik-ekle-container">
      <h2>Etkinlik Ekle</h2>
      <form onSubmit={handleSubmit} className="etkinlik-ekle-form">
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

        <div className="form-group">
          <label htmlFor="Ad">Ad:
            <input
              type="text"
              id="Ad"
              value={Ad}
              onChange={(e) => setAd(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Aciklama">Açıklama:
            <textarea
              id="Aciklama"
              value={Aciklama}
              onChange={(e) => setAciklama(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="BaslangicTarihi">Başlangıç Tarihi:
            <input
              type="date"
              id="BaslangicTarihi"
              value={BaslangicTarihi}
              onChange={(e) => setBaslangicTarihi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="BitisTarihi">Bitiş Tarihi:
            <input
              type="date"
              id="BitisTarihi"
              value={BitisTarihi}
              onChange={(e) => setBitisTarihi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Konum">Konum:
            <input
              type="text"
              id="Konum"
              value={Konum}
              onChange={(e) => setKonum(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Kapasite">Kapasite:
            <input
              type="text"
              id="Kapasite"
              value={Kapasite}
              onChange={(e) => setKapasite(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="KatilimciSayisi">Katılımcı Sayısı:
            <input
              type="text"
              id="KatilimciSayisi"
              value={KatilimciSayisi}
              onChange={(e) => setKatilimciSayisi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Durum">Durum:
            <select
              id="Durum"
              value={Durum}
              onChange={(e) => setDurum(e.target.value)}
              required
            >
              <option value="">Seçin...</option>
              <option value="Boş">Boş</option>
              <option value="Dolu">Dolu</option>
            </select>
          </label>
        </div>

        <button type="submit" className="submit-button">Ekle</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default EtkinlikEkle;
