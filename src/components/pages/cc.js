import React, { useState } from 'react';
import axios from 'axios';
import CommunityCard from './dashboard/cardsComponent/communityCard';

export default function ComC({customerDetails, setCustomerDetails}) {
  const [cId, setCId] = useState("")

  const handleSendRequest = async() => {
    try {
      const response = await axios.get(`http://localhost:7000/customer/raiseCommunityRequest/${cId}`);
      window.alert(response.data.message)
      setCustomerDetails(response.data.data)
      setCId("")
    } catch (error) {
      console.log(error)
      window.alert("Problem sending request")
    }
  }

  return (
    <div className="Jc-Tab" style={{ display: 'flex' }}>
      <div>
        <CommunityCard
          label={"pdf Book"}
          titleImg={"https://ggayane.github.io/css-experiments/cards/dark_rider-title.png"}
          characterImg={"https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp"}
          coverImg={"https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg"}
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
        {customerDetails?.joinCommunityStatus==="not raised"?
            <div className='cc-inpt-div' style={{marginTop:'3%'}}>
                <input type='text' placeholder='Enter your reader id' value={cId}
                    onChange={(e) => { setCId(e.target.value) }} id="jc-inpt-style" />
                <button className="glightbox3 btn__secondary" id="jc-btn-id" onClick={handleSendRequest}>
                    Request For WaitList</button>
            </div>:
            <div>{`Request has been ${customerDetails?.joinCommunityStatus}`}</div>
        }
    </div>
</div>

    </div>
  );
}
