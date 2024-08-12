import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function DergiEkle() {
  const [KaynakID, setKaynakID] = useState('');
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
  const [Yazar, setYazar] = useState('');
  const [KaynakKonumu, setKaynakKonumu] = useState('');
  const [YayinTarihi, setYayinTarihi] = useState('');
  const [Aralik, setAralik] = useState('');
  const [Tur, setTur] = useState('');

  const handleDergiEkle = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/dergi/dergiEkle', {
        params: {
          KaynakID,
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
          Yazar,
          KaynakKonumu,
          YayinTarihi,
          Aralik,
          Tur,
        },
      });

      console.log(response.data); // Optional: Handle success response
    } catch (error) {
      console.error('Error adding dergi:', error);
      // Optional: Handle error response
    }
  };

  return (
    <div>
      <h2>Add Magazine</h2>
      <form>
        <label className="label-add" htmlFor="KaynakID">Resource ID:
          <input className="input-add" type="text" id="KaynakID" value={KaynakID} onChange={(e) => setKaynakID(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="KaynakAdi">Resource Name:
          <input className="input-add" type="text" id="KaynakAdi" value={KaynakAdi} onChange={(e) => setKaynakAdi(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="KaynakCikisYili">Publication Year:
          <input className="input-add" type="text" id="KaynakCikisYili" value={KaynakCikisYili} onChange={(e) => setKaynakCikisYili(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="StokSayisi">Stock Count:
          <input className="input-add" type="text" id="StokSayisi" value={StokSayisi} onChange={(e) => setStokSayisi(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="IadeEdilmesiGerekenMaxSure">Max Return Period:
          <input className="input-add" type="text" id="IadeEdilmesiGerekenMaxSure" value={IadeEdilmesiGerekenMaxSure} onChange={(e) => setIadeEdilmesiGerekenMaxSure(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="SayfaSayisi">Page Count:
          <input className="input-add" type="text" id="SayfaSayisi" value={SayfaSayisi} onChange={(e) => setSayfaSayisi(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="Dil">Language:
          <input className="input-add" type="text" id="Dil" value={Dil} onChange={(e) => setDil(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="FizikselTur">Physical Type:
          <input className="input-add" type="text" id="FizikselTur" value={FizikselTur} onChange={(e) => setFizikselTur(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="KaynakTuru">Resource Type:
          <input className="input-add" type="text" id="KaynakTuru" value={KaynakTuru} onChange={(e) => setKaynakTuru(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="EkleyenYonetici">Adding Manager:
          <input className="input-add" type="text" id="EkleyenYonetici" value={EkleyenYonetici} onChange={(e) => setEkleyenYonetici(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="EklenmeTarihi">Adding Date:
          <input className="input-add" type="date" id="EklenmeTarihi" value={EklenmeTarihi} onChange={(e) => setEklenmeTarihi(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="Yazar">Author:
          <input className="input-add" type="text" id="Yazar" value={Yazar} onChange={(e) => setYazar(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="KaynakKonumu">Resource Location:
          <input className="input-add" type="text" id="KaynakKonumu" value={KaynakKonumu} onChange={(e) => setKaynakKonumu(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="YayinTarihi">Publication Date:
          <input className="input-add" type="date" id="YayinTarihi" value={YayinTarihi} onChange={(e) => setYayinTarihi(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="Aralik">Period:
          <input className="input-add" type="text" id="Aralik" value={Aralik} onChange={(e) => setAralik(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="Tur">Type:
          <input className="input-add" type="text" id="Tur" value={Tur} onChange={(e) => setTur(e.target.value)} />
        </label>

        <button type="button" onClick={handleDergiEkle}>
          Add Magazine
        </button>
      </form>
    </div>
  );
}

export default DergiEkle;
