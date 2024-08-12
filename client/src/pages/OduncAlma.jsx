import React, { useState } from 'react';
import axios from 'axios';
import '../style/OduncAlma.css';

function OduncAlma() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [KaynakID, setKaynakID] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/oduncalir', {
        KullaniciID,
        KaynakID,
      });

      setMessage(response.data.message);

      // Clear the form fields after successful submission
      setKullaniciID('');
      setKaynakID('');
    } catch (error) {
      setMessage('Ödünç alma işlemi eklenirken bir hata oluştu.');
      console.error('Error adding oduncalir:', error);
    }
  };

  return (
    <div className="odunc-alma-container">
      <h2>Ödünç Alma</h2>
      <form onSubmit={handleSubmit} className="odunc-alma-form">
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

        <button type="submit" className="submit-button">Ödünç Al</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default OduncAlma;
