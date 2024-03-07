import React from 'react';
const CommunityCard = ({ titleImg, coverImg, characterImg, onClick, label }) => {
  return (
    <div className='three-d-cards-cc' onClick={onClick} >
        <div className="cd-card" >
          <div className="wrapper">
            <img src={coverImg} className="cover-cc-image" alt="Cover"/>
          </div>
          <img src={titleImg} className="cd-title" alt="Title" />
          <img src={characterImg} id= "id-ccd-card" className="cd-character" alt="Character" style={{width:'240px'}}/>
        </div>
    </div>);
};

export default CommunityCard;
