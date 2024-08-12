import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../style/EtkinlikBilgileri.css';

function EtkinlikBilgileri() {
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [Durum, setDurum] = useState('');
  const [EtkinlikID, setEtkinlikID] = useState('');
  const [Ad, setAd] = useState('');
  const [Aciklama, setAciklama] = useState('');
  const [Konum, setKonum] = useState('');

  useEffect(() => {
    const fetchEtkinlikler = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/etkinlikler', {
          params: {
            Durum, EtkinlikID, Ad, Aciklama, Konum,
          },
        });
        setEtkinlikler(response.data);
      } catch (error) {
        console.error('Error fetching etkinlikler:', error);
      }
    };

    fetchEtkinlikler();
  }, [Durum, EtkinlikID, Ad, Aciklama, Konum]);

  return (
    <div className="etkinlik-bilgileri-container">
      <div className="filters">
        <div className="form-group">
          <label htmlFor="Durum">
            <select id="Durum" value={Durum} onChange={(e) => setDurum(e.target.value)}>
              <option value="">All</option>
              <option value="Boş">Boş</option>
              <option value="Dolu">Dolu</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="EtkinlikID">
            <input
              type="text"
              id="EtkinlikID"
              placeholder="Filter by Etkinlik ID"
              value={EtkinlikID}
              onChange={(e) => setEtkinlikID(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Ad">
            <input
              type="text"
              id="Ad"
              placeholder="Filter by Ad"
              value={Ad}
              onChange={(e) => setAd(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Aciklama">
            <input
              type="text"
              id="Aciklama"
              placeholder="Filter by Açıklama"
              value={Aciklama}
              onChange={(e) => setAciklama(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Konum">
            <input
              type="text"
              id="Konum"
              placeholder="Filter by Konum"
              value={Konum}
              onChange={(e) => setKonum(e.target.value)}
            />
          </label>
        </div>
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
                  <td>{etkinlik.Durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No etkinliks found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}

export default EtkinlikBilgileri;
