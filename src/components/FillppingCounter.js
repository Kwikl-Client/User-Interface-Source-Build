import React, { useState, useEffect } from 'react';
import "./FlippingCounter.css"

const FlippingCounter = () => {
  const [minutes, setMinutes] = useState(99);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId; // Declare intervalId in the scope of useEffect

    const updateTime = () => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        // Optionally, you can perform an action when the timer reaches 0, e.g., show a message.
      } else {
        if (seconds === 0) {
          setMinutes((prevMinutes) => (prevMinutes - 1 >= 0 ? prevMinutes - 1 : 0));
          setSeconds(59);
          // Trigger flipping animation for both top and bottom elements
          const topElement = document.querySelector('.flip-card__top');
          const bottomElement = document.querySelector('.flip-card__bottom');

          topElement.classList.add('flipping');
          bottomElement.classList.add('flipping');

          setTimeout(() => {
            topElement.classList.remove('flipping');
            bottomElement.classList.remove('flipping');
          }, 500);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }
    };

    intervalId = setInterval(updateTime, 100); // Assign the intervalId here
    return () => clearInterval(intervalId);
  }, [minutes, seconds]); // Add dependencies to the dependency array

  return (
    <div className="timer-container">
      <div className="timer">
        <div className="flip-clock">
          <div className="flip-card">
            <div className="flip-card__top">{String(minutes).padStart(2, '0')}</div>
            <div className="flip-card__bottom" data-value={String(minutes).padStart(2, '0')}></div>
          </div>
          <div>
          <p className='filp-card-left'>Left Only</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FlippingCounter;
