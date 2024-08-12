import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/AnaSayfa.css';

function Yöneticiler() {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/Istatistikler">
          <button type="button" className="nav-button">
            İstatistikler
          </button>
        </Link>
        <Link to="/Kaynaklar2">
          <button type="button" className="nav-button">
            Kaynaklar
          </button>
        </Link>
        <Link to="/CalismaAlanlari">
          <button type="button" className="nav-button">
            Çalışma Alanları
          </button>
        </Link>
        <Link to="/Etkinlikler2">
          <button type="button" className="nav-button">
            Etkinlikler
          </button>
        </Link>
        <Link to="/YoneticiBilgileri">
          <button type="button" className="nav-button">
            Yönetici Bilgisi
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Yöneticiler;
