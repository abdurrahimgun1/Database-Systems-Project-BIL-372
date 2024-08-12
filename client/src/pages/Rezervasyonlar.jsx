import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/AnaSayfa.css';

function Rezervasyonlar() {
  return (
    <div className="main-container">
      <div className="button-container">
        <Link to="/Rezervasyonlarim">
          <button type="button" className="nav-button">
            Geçmiş Rezervasyonlarım
          </button>
        </Link>
        <Link to="/RezervasyonYap">
          <button type="button" className="nav-button">
            Rezervasyon Yap
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Rezervasyonlar;
