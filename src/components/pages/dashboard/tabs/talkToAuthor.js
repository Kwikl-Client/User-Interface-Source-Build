import React, { useState } from 'react';
import TalkAuthorCard from '../cardsComponent/talkToAuthor';
import dashfirstcover from '../dashfirstcover.jpg';
import dashfirstTitle from '../dashfirstTitle.png';
import firstdash3d from '../firstdash3d.webp';

import "./talkToAuthor.css";

export default function TalkToAuthor() {
	const [cId,setCId]= useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const handleCheckAvailability = () => {
    if (cId.trim() === "") {
      setErrorMessage("Please enter your member id");
    } else {
      setErrorMessage("Incorrect member id");
    }
  };
  const handleCIdChange = (e) => {
    const inputValue = e.target.value;  
    if (/^[a-zA-Z0-9]{0,6}$/.test(inputValue)) {
      setCId(inputValue);
    }
  };
	return (<>
	<div className="Jc-Tab" style={{ display: 'flex' }}>
      <div className='ta-div-sub' id='ta-div-sub'>
        <TalkAuthorCard
          label={"pdf Book"}
          titleImg = {dashfirstTitle}
          characterImg={firstdash3d}
          coverImg={dashfirstcover}
        />
      </div>
          <div className='ta-fotr' id='ta-fotr'>
          <h3 className='quote-cc'>"Neque porro quisquam est qui"</h3>
          <div className='cc-inpt-div' style={{marginTop:'30%'}}>
            <input type='text' placeholder='Enter your member id' value={cId} id='ta-inpt-id'
                                onChange={handleCIdChange}
                                />
                              {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red' }}>Reader ID must be 6 characters</p>}
            <button className="glightbox3 btn__secondary"onClick={handleCheckAvailability} id='dshbrd-btn-ta'>
              Check Availbility</button>
              {errorMessage && <p style={{ color: 'red', marginTop: '8px', fontSize:'12px' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
		
	</>)
}
