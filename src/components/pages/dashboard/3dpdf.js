import React from 'react';
import closeIcon from '../../pages/cusPages/book/assets/close.svg'; // Update this path
import { Link, useNavigate } from 'react-router-dom';
import "./3dpdf.css";

export default function PDF() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/dashboard">
        <button style={{float:'right'}}>
          <img src={closeIcon} alt="close" />
        </button>
      </Link>
    <div className='pdf-viewer'>
      <iframe  
        title="PDF Viewer"
        src="https://932208b6-trial.flowpaper.com/DecathlonCatalog2022/"
        width="90%"
        height="800"
        style={{ border: 'none', maxWidth: '100%' }}
        allowFullScreen
      ></iframe>
      <style>{`
        @media (max-width: 780px) {
          iframe {
            width: 100%;
          }
        }
      `}</style>
    </div>
    </div>
  );
}
