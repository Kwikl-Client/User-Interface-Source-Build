import React from 'react';

const talkAuthorCard = ({ titleImg, coverImg, characterImg, onClick, label }) => {
  return (
    <div className='ta-three-d-cards' id='ta-3d-cards' onClick={onClick}>
        <div className="cd-card">
          <div className="wrapper">
            <img src={coverImg} className="ta-cover-image" alt="Cover"/>
          </div>
          <img src={titleImg} className="cd-title" alt="Title" />
          <img src={characterImg} className="cd-character" alt="Character"style={{width:'240px'}} />
        </div>
    </div>);
};

export default talkAuthorCard;
