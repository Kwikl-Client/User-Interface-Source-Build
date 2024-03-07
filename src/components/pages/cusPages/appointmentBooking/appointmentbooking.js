import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TalkAuthorCard from '../../dashboard/cardsComponent/talkToAuthor';
import Header from "../../../global/header";
import CusFooter from "../../../global/cusFooter";
import AnnouncementBar from '../../../cusComponents/announcement/announcement';
import Info from '../../../../assets/svg/Info.svg';
import headerData from "../../../../data/header.json";
import websiteTAjpg from "../../dashboard/websiteTAjpg.jpg";
import websiteTApng from "../../dashboard/websiteTApng.png";
import websiteTAwebp from "../../dashboard/websiteTAwebp.webp";

import "./booking.css";

const AppointmentBooking = () => {
  const [cId, setCId] = useState("");
  const [headerData, setHeaderData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [talkToAuthorData, setTalkToAuthorData] = useState({});
  const { header } = headerData;
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
  const [secondsTimer, setSecondsTimer] = useState(99);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://18.209.7.74:7000/cms/getHeader'),
        ];
        const [headerResponse] = await Promise.all(requests);
        setHeaderData(headerResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
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
  return (
    <>
      <Header headerData={headerData} />
      <AnnouncementBar secondsTimer={secondsTimer} />
      <section className="talktoAuthor-container" >
        <div className="Jc-Tab" style={{ display: 'flex' }} id="talkAuthor-tab">
          <div>
            <TalkAuthorCard
              label={"pdf Book"}
              titleImg={websiteTApng}
              characterImg={websiteTAwebp}
              coverImg={websiteTAjpg}
            />
          </div>
          <div className='ta-fotr' style={{ marginLeft: '0%' }} id="author-fotr">
            <h3 className='quote-cc'>"{talkToAuthorData.content}"</h3>
            <div className='cc-inpt-div' id='ta-input-id' style={{ marginTop: '30%' }}>
              <input
                type='text'
                placeholder='Enter your member id'
                value={cId}
                onChange={handleCIdChange}
                className='authr-inpt'
              />
              <p className='mob-tooltip-text'>Your member Id is in your account details if you have joined our coummunity only</p>
              {/* <span className="hover-text-app">
                <img src={Info} style={{ width: '6.6%' }} />
                <span className="tooltip-text right">Your member Id is in your account details if you have joined our coummunity only.</span>
              </span> */}
              {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red', fontSize: '10px' }}>Reader ID must be 6 characters</p>}
              <button className="glightbox3 btn__secondary" onClick={handleCheckAvailability}>
                Check Availability
              </button>
              {errorMessage && <p style={{ color: 'red', fontSize: '10px', marginTop: '8px', fontSize: '12px' }}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </section>
      <CusFooter />
    </>
  );
};

export default AppointmentBooking;
