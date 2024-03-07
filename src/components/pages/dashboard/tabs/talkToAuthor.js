import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TalkAuthorCard from '../cardsComponent/talkToAuthor';
import websiteTAjpg from "../websiteTAjpg.jpg";
import websiteTApng from "../websiteTApng.png";
import websiteTAwebp from "../websiteTAwebp.webp";
import "./talkToAuthor.css";

export default function TalkToAuthor() {
  const [cId, setCId] = useState("");
  const [talkToAuthorData, setTalkToAuthorData] = useState({});
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://18.209.7.74:7000/cms/getTalktoAuthor'),

        ];

        const [talk2AuthorResponse] = await Promise.all(requests);
        setTalkToAuthorData(talk2AuthorResponse.data.data);
        console.log(talk2AuthorResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; fetchData();
  }, []);
  return (<>
    <div className="Jc-Tab" style={{ display: 'flex' }}>
      <div className='ta-div-sub' id='ta-div-sub'>
        <TalkAuthorCard
          label={"pdf Book"}
          titleImg={websiteTApng}
          characterImg={websiteTAwebp}
          coverImg={websiteTAjpg}
        />
      </div>
      <div className='ta-fotr' id='ta-fotr'>
        <h3 className='quote-cc'>"{talkToAuthorData.content}"</h3>
        <div className='cc-inpt-div' id="cc-input-div-dash" style={{ marginTop: '30%' }}>
          <input type='text' placeholder='Enter your member id' value={cId} id='ta-inpt-id'
            onChange={handleCIdChange}
          />
          <p className='mob-tooltip-text-dash'>Your member Id is in your account details if you have joined our coummunity only</p>
          {/* <span className="mob-tooltip-text-dash">
            <img src={Info} style={{ width: '6.6%' }} />
            <span className="tooltip-text right">Your member Id is in your account details if you have joined our coummunity only.</span>
          </span> */}
          {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red', fontSize: '10px' }}>Member ID must be 6 characters</p>}
          <button className="glightbox3 btn__secondary" onClick={handleCheckAvailability} id='dshbrd-btn-ta'>
            Check Availbility</button>
          {errorMessage && <p style={{ color: 'red', fontSize: '10px', marginTop: '8px', fontSize: '12px' }}>{errorMessage}</p>}
        </div>
      </div>
    </div>

  </>)
}
