import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../style/AnaSayfa.css'; // Yeni bir CSS dosyası ekleyeceğiz

function EKaynakEkle() {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/AnsiklopediEkle2"><button type="button" className="nav-button">Ansiklopedi Ekle</button></Link>
        <br />
        <Link to="/DergiEkle2"><button type="button" className="nav-button">Dergi Ekle</button></Link>
        <br />
        <Link to="/KitapEkle2"><button type="button" className="nav-button">Kitap Ekle</button></Link>
      </div>
    </div>
  );
}

export default EKaynakEkle;
