import React, { useState, useEffect } from 'react';
import TalkAuthorCard from '../../dashboard/cardsComponent/talkToAuthor';
import Header from "../../../global/header";
import CusFooter from "../../../global/cusFooter";
import AnnouncementBar from '../../../cusComponents/announcement/announcement';
import headerData from "../../../../data/header.json";
import dashfirstcover from '../../dashboard/dashfirstcover.jpg';
import dashfirstTitle from '../../dashboard/dashfirstTitle.png';
import firstdash3d from '../../dashboard/firstdash3d.webp'
import "./booking.css";

const AppointmentBooking = () => {
  const [cId, setCId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  return (
    <>
      <Header header={header} />
      <AnnouncementBar secondsTimer={secondsTimer}/>
      <section className="talktoAuthor-container" >
        <div className="Jc-Tab" style={{ display: 'flex' }} id="talkAuthor-tab">
          <div>
            <TalkAuthorCard
              label={"pdf Book"}
              titleImg={dashfirstTitle}
              characterImg={firstdash3d}
              coverImg={dashfirstcover}
            />
          </div>
          <div className='ta-fotr' style={{ marginLeft: '0%' }} id="author-fotr">
            <h3 className='quote-cc'>"Neque porro quisquam est qui"</h3>
            <div className='cc-inpt-div' style={{ marginTop: '30%' }}>
              <input
                type='text'
                placeholder='Enter your member id'
                value={cId}
                onChange={handleCIdChange}
                className='authr-inpt'
              />
              {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red' }}>Reader ID must be 6 characters</p>}
              <button className="glightbox3 btn__secondary" onClick={handleCheckAvailability}>
                Check Availability
              </button>
              {errorMessage && <p style={{ color: 'red', marginTop: '8px', fontSize: '12px' }}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </section>
      <CusFooter />
    </>
  );
};

export default AppointmentBooking;
