import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function OduncAl() {
  const [KullaniciID, setKullaniciID] = useState('');
  const [KaynakID, setKaynakID] = useState('');
  const [OduncAlmaTarihi, setOduncAlmaTarihi] = useState('');

  const handleAddOduncAl = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/oduncAl/oduncAlEkle', {
        params: {
          KullaniciID,
          KaynakID,
          OduncAlmaTarihi,
        },
      });

      // Handle the response as needed, e.g., show a success message or redirect to another page
      console.log('Odunc added successfully:', response.data);
    } catch (error) {
      console.error('Error adding Odunc:', error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="odunc-al-container">
      <h2>Borrow Resource</h2>

      <label className="label-add" htmlFor="KullaniciID">User ID:
        <input className="input-add" type="number" id="KullaniciID" value={KullaniciID} onChange={(e) => setKullaniciID(parseInt(e.target.value, 10))} />
      </label>

      <label className="label-add" htmlFor="KaynakID">Resource ID:
        <input className="input-add" type="number" id="KaynakID" value={KaynakID} onChange={(e) => setKaynakID(parseInt(e.target.value, 10))} />
      </label>

      <label className="label-add" htmlFor="OduncAlmaTarihi">Borrow Date:
        <input className="input-add" type="date" id="OduncAlmaTarihi" value={OduncAlmaTarihi} onChange={(e) => setOduncAlmaTarihi(e.target.value)} />
      </label>

      <button className="button-add" type="button" onClick={handleAddOduncAl}>
        OduncAl
      </button>
    </div>
  );
}

export default OduncAl;
