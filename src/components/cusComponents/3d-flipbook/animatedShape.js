import React, { useState, useEffect } from 'react';
import Timer from '../3d-flipbook/timer.svg'; 
import "./animatedShape.css";
const ClippedDiv = () => {
  const [secondsTimer, setSecondsTimer] = useState(99);
  useEffect(() => {
    const secondsInterval = setInterval(() => {
      setSecondsTimer((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 9000); 

    return () => clearInterval(secondsInterval);
  }, []);

  return (
    <div className="clipped-div" style={{ position: 'relative' }}>
      <>
        <img src={Timer} style={{ width: '97px', height: '97px', marginLeft: '-87px' }} />
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
          <span className={`digits ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
            {Math.floor(secondsTimer / 10)}
          </span>
          <span className={`digitssec ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
            {secondsTimer % 10}
          </span> <span className='text-span' style={{marginTop: '55px',marginLeft: '-36px',lineHeight: '0.8', fontSize: '10px'}}>Only Left</span>
        </div>
      </>
    </div>
  );
};

export default ClippedDiv;
