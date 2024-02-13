import React from 'react';

const BecomeStarCard = ({ titleImg, coverImg, characterImg, onClick, label }) => {
  return (
    <div className='ba-three-d-cards' onClick={onClick} >
        <div className="cd-card" style={{width:'52%'}}>
          <div className="wrapper">
            <img src={coverImg} className="ta-cover-image" alt="Cover"/>
          </div>
          <img src={titleImg} className="cd-title" alt="Title" />
          <img src={characterImg} className="cd-character" alt="Character"  style={{width: '550%'}}/>
        </div>
    </div>);
};

export default BecomeStarCard;
