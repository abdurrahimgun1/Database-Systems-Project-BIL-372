import React, { useState } from 'react';
import axios from 'axios';
import '../style/KaynakEkle.css';

function KaynakEkle() {
  const [KaynakAdi, setKaynakAdi] = useState('');
  const [KaynakCikisYili, setKaynakCikisYili] = useState('');
  const [StokSayisi, setStokSayisi] = useState('');
  const [IadeEdilmesiGerekenMaxSure, setIadeEdilmesiGerekenMaxSure] = useState('');
  const [SayfaSayisi, setSayfaSayisi] = useState('');
  const [Dil, setDil] = useState('');
  const [FizikselTur, setFizikselTur] = useState('');
  const [KaynakTuru, setKaynakTuru] = useState('');
  const [EkleyenYonetici, setEkleyenYonetici] = useState('');
  const [EklenmeTarihi, setEklenmeTarihi] = useState('');
  const [KaynakKonumu, setKaynakKonumu] = useState('');
  const [DijitalFormat, setDijitalFormat] = useState('');
  const [URL, setURL] = useState('');
  const [CiltNo, setCiltNo] = useState('');
  const [Alan, setAlan] = useState('');
  const [YayinTarihi, setYayinTarihi] = useState('');
  const [Aralik, setAralik] = useState('');
  const [Tur, setTur] = useState('');
  const [Konu, setKonu] = useState('');
  const [Yayinevi, setYayinevi] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const requestData = {
      KaynakAdi,
      KaynakCikisYili,
      StokSayisi,
      IadeEdilmesiGerekenMaxSure,
      SayfaSayisi,
      Dil,
      FizikselTur,
      KaynakTuru,
      EkleyenYonetici,
      EklenmeTarihi,
      KaynakKonumu,
      DijitalFormat,
      URL,
      CiltNo,
      Alan,
      YayinTarihi,
      Aralik,
      Tur,
      Konu,
      Yayinevi,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/kaynak', requestData);
      setMessage(response.data.message);
      setKaynakAdi('');
      setKaynakCikisYili('');
      setStokSayisi('');
      setIadeEdilmesiGerekenMaxSure('');
      setSayfaSayisi('');
      setDil('');
      setFizikselTur('');
      setKaynakTuru('');
      setEkleyenYonetici('');
      setEklenmeTarihi('');
      setKaynakKonumu('');
      setDijitalFormat('');
      setURL('');
      setCiltNo('');
      setAlan('');
      setYayinTarihi('');
      setAralik('');
      setTur('');
      setKonu('');
      setYayinevi('');
    } catch (error) {
      setMessage('Kaynak eklenirken bir hata oluştu.');
      console.error('Error adding kaynak:', error);
    }
  };

  return (
    <div className="kaynak-ekle-container">
      <h2>Kaynak Ekle</h2>
      <form onSubmit={handleSubmit} className="kaynak-ekle-form">
        <div className="form-group">
          <label htmlFor="KaynakAdi">Kaynak Adı:
            <input
              type="text"
              id="KaynakAdi"
              value={KaynakAdi}
              onChange={(e) => setKaynakAdi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="KaynakCikisYili">Kaynak Çıkış Yılı:
            <input
              type="text"
              id="KaynakCikisYili"
              value={KaynakCikisYili}
              onChange={(e) => setKaynakCikisYili(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="StokSayisi">Stok Sayısı:
            <input
              type="text"
              id="StokSayisi"
              value={StokSayisi}
              onChange={(e) => setStokSayisi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="IadeEdilmesiGerekenMaxSure">İade Edilmesi Gereken Max Süre:
            <input
              type="text"
              id="IadeEdilmesiGerekenMaxSure"
              value={IadeEdilmesiGerekenMaxSure}
              onChange={(e) => setIadeEdilmesiGerekenMaxSure(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="SayfaSayisi">Sayfa Sayısı:
            <input
              type="text"
              id="SayfaSayisi"
              value={SayfaSayisi}
              onChange={(e) => setSayfaSayisi(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="Dil">Dil:
            <input
              type="text"
              id="Dil"
              value={Dil}
              onChange={(e) => setDil(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="FizikselTur">Fiziksel Tür:
            <select
              id="FizikselTur"
              value={FizikselTur}
              onChange={(e) => setFizikselTur(e.target.value)}
              required
            >
              <option value="">Seçin...</option>
              <option value="Fiziksel">Fiziksel</option>
              <option value="EKaynak">E-Kaynak</option>
            </select>
          </label>
        </div>

        {FizikselTur === 'Fiziksel' && (
          <div className="form-group">
            <label htmlFor="KaynakKonumu">Kaynak Konumu:
              <input
                type="text"
                id="KaynakKonumu"
                value={KaynakKonumu}
                onChange={(e) => setKaynakKonumu(e.target.value)}
                required
              />
            </label>
          </div>
        )}

        {FizikselTur === 'EKaynak' && (
          <>
            <div className="form-group">
              <label htmlFor="DijitalFormat">Dijital Format:
                <input
                  type="text"
                  id="DijitalFormat"
                  value={DijitalFormat}
                  onChange={(e) => setDijitalFormat(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="URL">URL:
                <input
                  type="text"
                  id="URL"
                  value={URL}
                  onChange={(e) => setURL(e.target.value)}
                  required
                />
              </label>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="KaynakTuru">Kaynak Türü:
            <select
              id="KaynakTuru"
              value={KaynakTuru}
              onChange={(e) => setKaynakTuru(e.target.value)}
              required
            >
              <option value="">Seçin...</option>
              <option value="Ansiklopedi">Ansiklopedi</option>
              <option value="Dergi">Dergi</option>
              <option value="Kitap">Kitap</option>
            </select>
          </label>
        </div>

        {KaynakTuru === 'Ansiklopedi' && (
          <>
            <div className="form-group">
              <label htmlFor="CiltNo">Cilt No:
                <input
                  type="text"
                  id="CiltNo"
                  value={CiltNo}
                  onChange={(e) => setCiltNo(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="Alan">Alan:
                <input
                  type="text"
                  id="Alan"
                  value={Alan}
                  onChange={(e) => setAlan(e.target.value)}
                  required
                />
              </label>
            </div>
          </>
        )}

        {KaynakTuru === 'Dergi' && (
          <>
            <div className="form-group">
              <label htmlFor="YayinTarihi">Yayın Tarihi:
                <input
                  type="date"
                  id="YayinTarihi"
                  value={YayinTarihi}
                  onChange={(e) => setYayinTarihi(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="Aralik">Aralık:
                <input
                  type="text"
                  id="Aralik"
                  value={Aralik}
                  onChange={(e) => setAralik(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="Tur">Tür:
                <input
                  type="text"
                  id="Tur"
                  value={Tur}
                  onChange={(e) => setTur(e.target.value)}
                  required
                />
              </label>
            </div>
          </>
        )}

        {KaynakTuru === 'Kitap' && (
          <>
            <div className="form-group">
              <label htmlFor="Konu">Konu:
                <input
                  type="text"
                  id="Konu"
                  value={Konu}
                  onChange={(e) => setKonu(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="Tur">Tür:
                <input
                  type="text"
                  id="Tur"
                  value={Tur}
                  onChange={(e) => setTur(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="Yayinevi">Yayınevi:
                <input
                  type="text"
                  id="Yayinevi"
                  value={Yayinevi}
                  onChange={(e) => setYayinevi(e.target.value)}
                  required
                />
              </label>
            </div>
          </>
        )}

        <div className="form-group">
          <label htmlFor="EkleyenYonetici">Ekleyen Yönetici (Yönetici ID):
            <input
              type="text"
              id="EkleyenYonetici"
              value={EkleyenYonetici}
              onChange={(e) => setEkleyenYonetici(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="EklenmeTarihi">Eklenme Tarihi:
            <input
              type="date"
              id="EklenmeTarihi"
              value={EklenmeTarihi}
              onChange={(e) => setEklenmeTarihi(e.target.value)}
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

export default KaynakEkle;
