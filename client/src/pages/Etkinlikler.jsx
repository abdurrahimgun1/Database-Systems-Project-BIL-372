import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/AnaSayfa.css';

function Etkinlikler() {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/Etkinliklerim">
          <button type="button" className="nav-button">
            Geçmiş Etkinliklerim
          </button>
        </Link>
        <Link to="/EtkinlikBilgileri">
          <button type="button" className="nav-button">
            EtkinlikBilgileri
          </button>
        </Link>
        <Link to="/KayitOl">
          <button type="button" className="nav-button">
            Kayıt Ol
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Etkinlikler;
