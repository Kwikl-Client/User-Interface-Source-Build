import React from 'react';
import './cardAnimation.css';

const CardAnimation = ({ titleImg, coverImg, characterImg, onClick, label }) => {
  return (
    <div className='three-d-cards' onClick={onClick}>
        <div className="cd-card">
          <div className="wrapper">
            <img src={coverImg} className="cover-image" alt="Cover" />
          </div>
          <img src={titleImg} className="cd-title" alt="Title" />
          <img src={characterImg} className="cd-character" alt="Character" />
        </div>
        <label>{label}</label>
    </div>);
};

export default CardAnimation;
