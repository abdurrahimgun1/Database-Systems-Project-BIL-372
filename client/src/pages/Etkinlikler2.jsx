import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../style/Etkinlikler2.css';

function Etkinlikler2() {
  const [etkinlikler, setEtkinlikler] = useState([]);
  const [Durum, setDurum] = useState('');
  const [EtkinlikID, setEtkinlikID] = useState('');
  const [Ad, setAd] = useState('');
  const [Aciklama, setAciklama] = useState('');
  const [Konum, setKonum] = useState('');

  const navigate = useNavigate();

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

  const handleNavigateToEtkinlikEkle = () => {
    navigate('/EtkinlikEkle');
  };

  return (
    <div className="etkinlikler2-container">
      <div className="filters">
        <label htmlFor="durum">Durum:
          <select id="durum" value={Durum} onChange={(e) => setDurum(e.target.value)}>
            <option value="">All</option>
            <option value="Boş">Boş</option>
            <option value="Dolu">Dolu</option>
          </select>
        </label>
        <label htmlFor="etkinlikID">Etkinlik ID:
          <input
            type="text"
            id="etkinlikID"
            placeholder="Filter by Etkinlik ID"
            value={EtkinlikID}
            onChange={(e) => setEtkinlikID(e.target.value)}
          />
        </label>
        <label htmlFor="ad">Ad:
          <input
            type="text"
            id="ad"
            placeholder="Filter by Ad"
            value={Ad}
            onChange={(e) => setAd(e.target.value)}
          />
        </label>
        <label htmlFor="aciklama">Açıklama:
          <input
            type="text"
            id="aciklama"
            placeholder="Filter by Açıklama"
            value={Aciklama}
            onChange={(e) => setAciklama(e.target.value)}
          />
        </label>
        <label htmlFor="konum">Konum:
          <input
            type="text"
            id="konum"
            placeholder="Filter by Konum"
            value={Konum}
            onChange={(e) => setKonum(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleNavigateToEtkinlikEkle}>Etkinlik Ekle</button>
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
          <p>No events found matching the criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Etkinlikler2;
