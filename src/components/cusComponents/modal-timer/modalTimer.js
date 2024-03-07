// ModalClippedDiv.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timer from '../3d-flipbook/timer.svg';
import './modaltimer.css';

const ModalClippedDiv = ({ secondsTimer }) => {
  const [userCount, setUserCount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://18.209.7.74:7000/customer/dailyUserCount'),

        ];

        const [userCountResponse] = await Promise.all(requests);
        setUserCount(userCountResponse.data);
        console.log(userCountResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  fetchData();
  }, []); 
  return (
    <div className="modal-clipped-div" style={{ position: 'relative' }}>
      <>
        <img src={Timer} alt="timer" />
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            color: 'black',
            textAlign: 'center',
            width: '100%',
            display: 'flex',
            marginTop: '-165%',
            marginLeft: '-54%',
        
          }}
          id="clipped-div"
        >
           <span className={`digit ${secondsTimer < 10 ? 'single-digit-timer' : ''}`} style={{background:'transparent',fontSize: '26px',
    marginTop: '20%'}}>
          {userCount.result}
        </span>
          {/* <span className={`m-digits ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
            {Math.floor(secondsTimer / 10)}
          </span>
          <span className={`m-digitssec ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
            {secondsTimer % 10} */}
          {/* </span> */}
           <span className='m-text-span'>Only Left</span>
        </div>
      </>
    </div>
  );
};

export default ModalClippedDiv;
