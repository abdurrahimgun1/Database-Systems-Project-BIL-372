import React, { useState } from 'react';
import axios from 'axios';
import '../style/CalismaAlaniEkle.css';

function CalismaAlaniEkle() {
  const [CalismaAlaniID, setCalismaAlaniID] = useState('');
  const [Kapasite, setKapasite] = useState('');
  const [Durum, setDurum] = useState('');
  const [OdaNo, setOdaNo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/calismaalani', {
        CalismaAlaniID,
        Kapasite,
        Durum,
        OdaNo,
      });
      setMessage(response.data.message);
      // Clear the form fields after successful submission
      setCalismaAlaniID('');
      setKapasite('');
      setDurum('');
      setOdaNo('');
    } catch (error) {
      setMessage('Çalışma alanı eklenirken bir hata oluştu.');
      console.error('Error adding calismaalani:', error);
    }
  };

  return (
    <div className="calisma-alani-ekle-container">
      <h2>Çalışma Alanı Ekle</h2>
      <form onSubmit={handleSubmit} className="calisma-alani-ekle-form">
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

        <div className="form-group">
          <label htmlFor="OdaNo">Oda No:
            <input
              type="text"
              id="OdaNo"
              value={OdaNo}
              onChange={(e) => setOdaNo(e.target.value)}
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

export default CalismaAlaniEkle;
