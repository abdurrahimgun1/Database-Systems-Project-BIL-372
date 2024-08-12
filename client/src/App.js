import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import EtkinliklerPage from './pages/Etkinlikler';
import KaynaklarPage from './pages/Kaynaklar';
import KullaniciBilgileriPage from './pages/KullaniciBilgileri';
import KullanicilarPage from './pages/Kullanicilar';
import RezervasyonlarPage from './pages/Rezervasyonlar';
import YoneticilerPage from './pages/Yoneticiler';
import EtkinlikBilgileriPage from './pages/EtkinlikBilgileri';
import KayitOlPage from './pages/KayitOl';
import RezervasyonlarimPage from './pages/Rezervasyonlarim';
import RezervasyonYapPage from './pages/RezervasyonYap';
import RezervasyonEklePage from './pages/RezervasyonEkle';
import EtkinliklerimPage from './pages/Etkinliklerim';
import OduncAlPage from './pages/OduncAl';
import CalismaAlanlariPage from './pages/CalismaAlanlari';
import IstatistiklerPage from './pages/Istatistikler';
import YoneticiBilgileriPage from './pages/YoneticiBilgileri';
import Kaynaklar2Page from './pages/Kaynaklar2';
import Etkinlikler2Page from './pages/Etkinlikler2';
import KaynakEklePage from './pages/KaynakEkle';
import FizikselKaynakEklePage from './pages/FizikselKaynakEkle';
import AnsiklopediEklePage from './pages/AnsiklopediEkle';
import DergiEklePage from './pages/DergiEkle';
import KitapEklePage from './pages/KitapEkle';
import EKaynakEklePage from './pages/EkaynakEkle';
import AnsiklopediEkle2Page from './pages/AnsiklopediEkle2';
import DergiEkle2Page from './pages/DergiEkle2';
import KitapEkle2Page from './pages/KitapEkle2';
import CalismaAlaniEklePage from './pages/CalismaAlaniEkle';
import EtkinlikEklePage from './pages/EtkinlikEkle';
import IstatistikEkle from './pages/IstatistikEkle';
import OduncAlma from './pages/OduncAlma';
import IadeEtme from './pages/IadeEtme';

import './style/FilterableTableList.css';
import './style/AnaSayfa.css';

function AnaSayfa() {
  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="main-container">
      <div className="header">
        <h1>WELCOME!</h1>
        <p>{currentDate}</p>
      </div>
      <div className="button-container">
        <Link to="/Kullanicilar">
          <button type="button" className="nav-button">
            Kullanıcı
          </button>
        </Link>
        <Link to="/Yoneticiler">
          <button type="button" className="nav-button">
            Yönetici
          </button>
        </Link>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <AnaSayfa />
    </div>
  );
}

function Hello() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/Etkinlikler" element={<EtkinliklerPage />} />
      <Route path="/Kaynaklar" element={<KaynaklarPage />} />
      <Route path="/KullaniciBilgileri" element={<KullaniciBilgileriPage />} />
      <Route path="/Kullanicilar" element={<KullanicilarPage />} />
      <Route path="/Rezervasyonlar" element={<RezervasyonlarPage />} />
      <Route path="/Yoneticiler" element={<YoneticilerPage />} />
      <Route path="/EtkinlikBilgileri" element={<EtkinlikBilgileriPage />} />
      <Route path="/KayitOl" element={<KayitOlPage />} />
      <Route path="/Rezervasyonlarim" element={<RezervasyonlarimPage />} />
      <Route path="/RezervasyonYap" element={<RezervasyonYapPage />} />
      <Route path="/RezervasyonEkle" element={<RezervasyonEklePage />} />
      <Route path="/Etkinliklerim" element={<EtkinliklerimPage />} />
      <Route path="/OduncAl" element={<OduncAlPage />} />
      <Route path="/CalismaAlanlari" element={<CalismaAlanlariPage />} />
      <Route path="/Istatistikler" element={<IstatistiklerPage />} />
      <Route path="/IstatistikEkle" element={<IstatistikEkle />} />
      <Route path="/YoneticiBilgileri" element={<YoneticiBilgileriPage />} />
      <Route path="/Yoneticiler" element={<YoneticilerPage />} />
      <Route path="/Kaynaklar2" element={<Kaynaklar2Page />} />
      <Route path="/Etkinlikler2" element={<Etkinlikler2Page />} />
      <Route path="/KaynakEkle" element={<KaynakEklePage />} />
      <Route path="/FizikselKaynakEkle" element={<FizikselKaynakEklePage />} />
      <Route path="/AnsiklopediEkle" element={<AnsiklopediEklePage />} />
      <Route path="/DergiEkle" element={<DergiEklePage />} />
      <Route path="/KitapEkle" element={<KitapEklePage />} />
      <Route path="/EkaynakEkle" element={<EKaynakEklePage />} />
      <Route path="/AnsiklopediEkle2" element={<AnsiklopediEkle2Page />} />
      <Route path="/DergiEkle2" element={<DergiEkle2Page />} />
      <Route path="/KitapEkle2" element={<KitapEkle2Page />} />
      <Route path="/CalismaAlaniEkle" element={<CalismaAlaniEklePage />} />
      <Route path="/EtkinlikEkle" element={<EtkinlikEklePage />} />
      <Route path="/OduncAlma" element={<OduncAlma />} />
      <Route path="/IadeEtme" element={<IadeEtme />} />
    </Routes>
  );
}

export default Hello;
