import React, { useState } from 'react';
import axios from 'axios';
import CommunityCard from '../cardsComponent/communityCard';
import dashsecondcover from '../dashsecondcover.jpg';
import dashsecond3d from '../dashsecond3d.webp';
import dashsecondTitle from '../dashsecondTitle.png';

export default function JoinCommunity({ customerDetails, setCustomerDetails }) {
  const [cId, setCId] = useState("")
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Added state for message type (success or error)

  const handleSendRequest = async () => {
    try {
      const response = await axios.get(`http://18.207.152.156:7000/customer/raiseCommunityRequest/${cId}`);
      setMessage(response.data.message);
      setCustomerDetails(response.data.data);
      setCId("");
      setMessageType("success"); // Set message type to success
    } catch (error) {
      console.log(error);
      setMessage("Problem sending request");
      setMessageType("error"); // Set message type to error
    }
  };
  const handleCIdChange = (e) => {
    const inputValue = e.target.value;  
    if (/^[a-zA-Z0-9]{0,6}$/.test(inputValue)) {
      setCId(inputValue);
    }
  };
  
  return (
    <div className="Jc-Tab" style={{ display: 'flex' }}>
      <div>
        <CommunityCard
          label={"pdf Book"}
          titleImg={dashsecondTitle}
          characterImg={dashsecond3d}
          coverImg={dashsecondcover}
        />
      </div>
      <div className="jc-container-div">
        <div className="jcc">
          <div className="authorv3__content" id="jc-auth-cnt">
            <div className="authorv3__content--badge join-community-badge">
              Join the 'This Book' Community and Embrace Yourself!
            </div>
            <p className="member-title">Member</p>
            <p className="membership-info text-muted fs-5" id="c-crnc">USD <span className="cc-span membership-price">$10 </span>/month</p>
          </div>
        </div>
        <div>
          <p className="discount-info"><sup>*</sup>Enjoy a <span className="cc-spans discount-amount">$66 Savings </span> on Yearly Subscription and an <span className="cc-spanss discount-15">Exclusive 15% Off </span>'Talk to the Author' Sessions
          </p>
        </div>
        <div className='cc-fotr'>
          <h3 className='quote-cc'>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>
          {customerDetails?.joinCommunityStatus === "not raised" ? (
            <div className='cc-inpt-div'>
              <input
                type='text'
                placeholder='Enter your reader id'
                value={cId}
                onChange={handleCIdChange}
                id="jc-inpt-style"
              />
{cId.length > 0 && cId.length < 6 && <p style={{ color: 'red' }}>Reader ID must be 6 characters</p>}
              <button className="glightbox3 btn__secondary" id="jc-btn-id" onClick={handleSendRequest}>
                Request For WaitList
              </button>
              {message && (
                <p className={`request-message ${messageType === 'success' ? 'success' : 'error'}`}>
                  {message}
                </p>
              )}
            </div>
          ) : (
            <div className={`status-message ${messageType === 'success' && message.includes('Request has been raised') ? 'success' : 'success'}`}>
              {`Request has been ${customerDetails?.joinCommunityStatus}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}