// ModalClippedDiv.jsx

import React, { useState, useEffect } from 'react';
import Timer from '../3d-flipbook/timer.svg';
import './modaltimer.css';

const ModalClippedDiv = ({ secondsTimer }) => {
  return (
    <div className="modal-clipped-div" style={{ position: 'relative' }}>
      <>
        <img src={Timer} alt="timer" />
        <div
          style={{
            position: 'absolute',
            top: '32%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            textAlign: 'center',
            width: '100%',
            display: 'flex'
          }}
        >
          <span className={`m-digits ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
            {Math.floor(secondsTimer / 10)}
          </span>
          <span className={`m-digitssec ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
            {secondsTimer % 10}
          </span> <span className='m-text-span'>Only Left</span>
        </div>
      </>
    </div>
  );
};

export default ModalClippedDiv;
