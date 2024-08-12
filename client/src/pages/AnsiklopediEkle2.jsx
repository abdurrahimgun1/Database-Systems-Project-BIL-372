import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddPage.css';

function AnsiklopediEkle2() {
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
  const [CiltNo, setCiltNo] = useState('');
  const [Ozellistigi, setOzellistigi] = useState('');
  const [DijitalFormat, setDijitalFormat] = useState('');
  const [URL, setURL] = useState('');

  const handleAnsiklopediEkle = async () => {
    try {
      const response = await axios.get('http://localhost:3006/api/ansiklopedi/ansiklopediEkle', {
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
          CiltNo,
          Ozellistigi,
          DijitalFormat,
          URL,
        },
      });

      console.log(response.data); // Optional: Handle success response
    } catch (error) {
      console.error('Error adding ansiklopedi:', error);
      // Optional: Handle error response
    }
  };

  return (
    <div>
      <h2>Add Encyclopedia</h2>
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

        <label className="label-add" htmlFor="CiltNo">Volume No:
          <input className="input-add" type="text" id="CiltNo" value={CiltNo} onChange={(e) => setCiltNo(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="Ozellistigi">Specialty:
          <input className="input-add" type="text" id="Ozellistigi" value={Ozellistigi} onChange={(e) => setOzellistigi(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="DijitalFormat">Digital Format:
          <input className="input-add" type="text" id="DijitalFormat" value={DijitalFormat} onChange={(e) => setDijitalFormat(e.target.value)} />
        </label>

        <label className="label-add" htmlFor="URL">URL:
          <input className="input-add" type="text" id="URL" value={URL} onChange={(e) => setURL(e.target.value)} />
        </label>

        <button type="button" onClick={handleAnsiklopediEkle}>
          Add Encyclopedia
        </button>
      </form>
    </div>
  );
}

export default AnsiklopediEkle2;
