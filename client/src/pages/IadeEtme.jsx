import React, { useState } from 'react';
import axios from 'axios';
import '../style/IadeEtme.css';

function IadeEtme() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [KaynakID, setKaynakID] = useState('');
  const [GeriVermeTarihi, setGeriVermeTarihi] = useState('');
  const [IadeEdilmesiGerekenTarih, setIadeEdilmesiGerekenTarih] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/iadeeder', {
        KullaniciID,
        KaynakID,
        GeriVermeTarihi,
        IadeEdilmesiGerekenTarih,
      });

      setMessage(response.data.message);

      // Clear the form fields after successful submission
      setKullaniciID('');
      setKaynakID('');
      setGeriVermeTarihi('');
      setIadeEdilmesiGerekenTarih('');
    } catch (error) {
      setMessage('İade etme işlemi eklenirken bir hata oluştu.');
      console.error('Error adding iadeeder:', error);
    }
  };

  return (
    <div className="iade-etme-container">
      <h2>İade Etme</h2>
      <form onSubmit={handleSubmit} className="iade-etme-form">
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
          <label htmlFor="KaynakID">Kaynak ID:
            <input
              type="text"
              id="KaynakID"
              value={KaynakID}
              onChange={(e) => setKaynakID(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="GeriVermeTarihi">Geri Verme Tarihi:
            <input
              type="date"
              id="GeriVermeTarihi"
              value={GeriVermeTarihi}
              onChange={(e) => setGeriVermeTarihi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="IadeEdilmesiGerekenTarih">İade Edilmesi Gereken Tarih:
            <input
              type="date"
              id="IadeEdilmesiGerekenTarih"
              value={IadeEdilmesiGerekenTarih}
              onChange={(e) => setIadeEdilmesiGerekenTarih(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" className="submit-button">İade Et</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default IadeEtme;
