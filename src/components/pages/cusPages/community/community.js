import React, { useState } from 'react';
import axios from 'axios';
import Header from "../../../global/header";
import CusFooter from "../../../global/cusFooter";
import headerData from "../../../../data/header.json";
import dashsecondcover from '../../dashboard/dashsecondcover.jpg';
import dashsecond3d from '../../dashboard/dashsecond3d.webp';
import dashsecondTitle from '../../dashboard/dashsecondTitle.png';
import './community.css';
import CommunityCard from '../../dashboard/cardsComponent/communityCard';
import AnnouncementBar from '../../../cusComponents/announcement/announcement';

const Community = () => {
  const [cId, setCId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [secondsTimer, setSecondsTimer] = useState(99);
  const { header } = headerData;

  const handleSendRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/customer/raiseCommunityRequest/${cId}`);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setCId("");
    } catch (error) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage("Invalid reader id");
    }
  };
  const handleCIdChange = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z0-9]{0,6}$/.test(inputValue)) {
      setCId(inputValue);
    }
  };
  
  return (
    <>
      <Header header={header} />
      <AnnouncementBar  secondsTimer={secondsTimer}/>
      <section className="community-container">
        <div className="Jc-Tab" style={{ display: 'flex' }}>
          <div>
            <CommunityCard
              label={"pdf Book"}
              titleImg={dashsecondTitle}
              characterImg={dashsecond3d}
              coverImg={dashsecondcover}
            />
          </div>
          <div className='join-community-div'>
            <div className="jcc">
              <div className="authorv3__content" id="community-heading">
                <div className="authorv3__content--badge" style={{ fontSize: '12px', lineHeight: '0.99rem' }}>
                  Join the 'This Book' Community and Embrace Yourself!
                </div>
                <p style={{ fontSize: '24px', paddingLeft: '0px', marginTop: '3%', color: '#333' }}>Member</p>
                <p className="m-0px-b text-muted fs-5" id="c-crnc" style={{ paddingTop: '2px', marginTop: '-2%', fontSize: '12px' }}>
                  USD <span className="cc-span" style={{ fontSize: '18px', color: '#f14c42' }}>
                    $10 </span>/month
                </p>
              </div>
            </div>
            <div>
              <p className='community-para-sub'>
                <sup>*</sup>Enjoy a <span className="cc-spans" style={{ fontSize: '18px', color: '#f14c42', fontStyle: 'italic' }}>$66 Savings </span> on Yearly Subscription and an{' '}
                <span className="cc-spanss" style={{ fontSize: '18px', color: '#f14c42', fontStyle: 'italic' }}>Exclusive 15% Off </span>'Talk to the Author' Sessions
              </p>
            </div>
            <div className='community-fotr'>
              <h3 className='quote-cc'>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>

              <div className='cc-inpt-div' style={{ marginTop: '3%' }}>
                <input
                  type='text'
                  placeholder='Enter your reader id'
                  value={cId}
                  onChange={handleCIdChange}
                  className='community-input'
                />
                {cId.length > 0 && cId.length < 6 && <p style={{ color: 'red' }}>Reader ID must be 6 characters</p>}
                <button className="glightbox3 btn__secondary" id="lp-community-btn" onClick={handleSendRequest}>
                  Request For WaitList
                </button>

                {/* Display success and error messages */}
                {successMessage && (
                  <p style={{ color: 'green', fontSize: '12px' }}>{successMessage}</p>
                )}
                {errorMessage && (
                  <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CusFooter />
    </>
  );
};

export default Community;
