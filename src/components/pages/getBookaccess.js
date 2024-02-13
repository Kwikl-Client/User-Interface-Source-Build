import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AnnouncementBar from '../cusComponents/announcement/announcement';
import BecomeStarCard from './dashboard/cardsComponent/becomeStar';
import Header from "../global/header";
import CusFooter from "../global/cusFooter";
import headerData from "../../data/header.json";
import dashfirstTitle from './dashboard/dashfirstTitle.png';
import firstdash3d from './dashboard/firstdash3d.webp';
import dashfirstcover from './dashboard/dashfirstcover.jpg';
import './getBookaccess.css'; // Import the CSS file

export default function GetBookAccess() {
  const [errorMessage, setErrorMessage] = useState("");
  const { header } = headerData;
  const [cId, setCId] = useState("")
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
  };
  const handleCheckAvailability = () => {
    if (cId.trim() === "") {
      setErrorMessage("Please enter your follower id");
    } else {
      setErrorMessage("Incorrect follower id");
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
      <AnnouncementBar  secondsTimer={secondsTimer}/>
      <div className="get-book-access-container" style={{ marginTop: '14%', marginLeft: '0%' }}>
        <div className="Jc-Tab" id="Jc-Tab" style={{ display: 'flex' }}>
          <div>
            <BecomeStarCard
              label={"pdf Book"}
              titleImg={dashfirstTitle}
              characterImg={firstdash3d}
              coverImg={dashfirstcover}
            />
          </div>
          <div className="jc-container-div" id="jc-container-div">
            <div className="jcc">
              <div className="authorv3__content" id="jc-auth-cnt">
                <div className="authorv3__content--badge join-community-badge">
                  Join the 'This Book' Community and Embrace Yourself!
                </div>
                <p className="member-title">Member</p>
                <p className="membership-info text-muted fs-5" id="c-crnc">
                  USD <span className="cc-span membership-price">$10 </span>/month
                </p>
              </div>
            </div>
            <div>
              <p className="discount-info" id="discount-info">
                <sup>*</sup>Enjoy a{' '}
                <span className="cc-spans discount-amount">$66 Savings </span> on
                Yearly Subscription and an{' '}
                <span className="cc-spanss discount-15">Exclusive 15% Off </span>
                'Talk to the Author' Sessions
              </p>
            </div>
            <div className="cc-fotr">
              <h3 className="quote-cc">
                "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit..."
              </h3>
              <div className="cc-inpt-div" style={{ marginTop: '3%' }}>
                <input
                  type="text"
                  placeholder="Enter your follower id"
                  value={cId}
                  onChange={handleCIdChange}
                  id="jc-inpt-style"
                />
                {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red' }}>Reader ID must be 6 characters</p>}

                <button
                  className="glightbox3 btn__secondary"
                  id="jc-btn-id"
                  onClick={handleCheckAvailability}
                >
                  Request For Eligibility
                </button>
                {errorMessage && <p style={{ color: 'red', marginTop: '8px', fontSize: '12px' }}>{errorMessage}</p>}

              </div>
            </div>
          </div>
        </div>
      </div>
      <CusFooter />
    </>

  );
}
