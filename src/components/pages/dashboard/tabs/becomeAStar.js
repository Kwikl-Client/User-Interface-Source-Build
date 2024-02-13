import React, { useState } from 'react';
import CommunityCard from '../cardsComponent/communityCard';
import dashfirstcover from '../dashfirstcover.jpg';
import dashfirstTitle from '../dashfirstTitle.png';
import firstdash3d from '../firstdash3d.webp';

export default function BecomeStar(){
    const [cId,setCId]= useState("")
    const [errorMessage, setErrorMessage] = useState("");
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
    return (
      <>
        <div className="Jc-Tab" style={{ display: 'flex' }}>
          <div>
            <CommunityCard
              label={"pdf Book"}
              titleImg = {dashfirstTitle}
          characterImg={firstdash3d}
          coverImg={dashfirstcover}
            />
          </div>
          <div className="jc-container-div">
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
              <p className="discount-info">
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
                  placeholder="Enter your follower Id"
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
                {errorMessage && <p style={{ color: 'red', marginTop: '8px', fontSize:'12px' }}>{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </>
    )
                }
    