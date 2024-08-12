import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/AnaSayfa.css';

function Kullanicilar() {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/Rezervasyonlar">
          <button type="button" className="nav-button">
            Rezervasyon
          </button>
        </Link>
        <Link to="/Etkinlikler">
          <button type="button" className="nav-button">
            Etkinlik
          </button>
        </Link>
        <Link to="/Kaynaklar">
          <button type="button" className="nav-button">
            Kaynak
          </button>
        </Link>
        <Link to="/KullaniciBilgileri">
          <button type="button" className="nav-button">
            Kullanici Bilgisi
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Kullanicilar;
