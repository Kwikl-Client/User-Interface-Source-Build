import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnnouncementBar from '../cusComponents/announcement/announcement';
import BecomeStarCard from './dashboard/cardsComponent/becomeStar';
import Header from "../global/header";
import Info from "../../assets/svg/Info.svg";
import CusFooter from "../global/cusFooter";
import headerData from "../../data/header.json";
import websiteBSpng from "./dashboard/websiteBSpng.png";
import websiteBSjpg from "./dashboard/websiteBSjpg.jpg";
import websiteBSwebp from "./dashboard/websiteBSwebp.webp";
import './getBookaccess.css'; // Import the CSS file

export default function GetBookAccess() {
  const [errorMessage, setErrorMessage] = useState("");
  const [headerData, setHeaderData] = useState({});
  const [becomeAStar, setBecomeAStar] = useState({});
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

        const [becomeAStarResponse] = await Promise.all(requests);
        setBecomeAStar(becomeAStarResponse.data.data);
        console.log(becomeAStarResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; fetchData();
  }, []);
  const [secondsTimer, setSecondsTimer] = useState(99);

  return (
    <>
      <Header headerData={headerData} />
      <AnnouncementBar secondsTimer={secondsTimer} />
      <div className="get-book-access-container" style={{ marginTop: '14%', marginLeft: '0%' }}>
        <div className="Jc-Tab" id="Jc-Tab" style={{ display: 'flex' }}>
          <div>
            <BecomeStarCard
              label={"pdf Book"}
              titleImg={websiteBSpng}
              characterImg={websiteBSwebp}
              coverImg={websiteBSjpg}
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
                <p className='mob-tooltip-text'>Your Follower Id is in your account details,if you are our member.</p>
                {/* <span className="hover-text-book-app">
                  <img src={Info} style={{ width: '6.6%' }} className="info-class" />
                  <span className="tooltip-text right">Your Follower Id is in your account details,if you are our member.</span>
                </span> */}
                {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red', fontSize: '10px', fontSize: '10px' }}>Follower ID must be 6 characters</p>}

                <button
                  className="glightbox3 btn__secondary"
                  id="jc-btn-id"
                  onClick={handleCheckAvailability}
                >
                  Request For Eligibility
                </button>
                {errorMessage && <p style={{ color: 'red', fontSize: '10px', marginTop: '8px', fontSize: '12px' }}>{errorMessage}</p>}

              </div>
            </div>
          </div>
        </div>
      </div>
      <CusFooter />
    </>

  );
}
