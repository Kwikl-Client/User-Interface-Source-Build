import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../../global/header";
import CusFooter from "../../global/cusFooter";
import headerData from "../../../data/header.json";
import "./sucess.css";

const Success = () => {
  const { header } = headerData;
  const [billDetails, setBillDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', email: '', orderId: '' });
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    navigate(link);
  };
  useEffect(() => {
    const exampleBillDetails = {
      items: [
        { id: 1, name: 'Book 1', price: 1500, quantity: 1 },
        { id: 2, name: 'Book 2', price: 2000, quantity: 2 },
      ],
      totalAmount: 5500,
      orderId: 'ABC123',
      paymentStatus: 'Paid',
    };
    setBillDetails(exampleBillDetails);
  }, []);

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
    const sessionId = urlParams.get('sessionId');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    setCustomerDetails({ name: name, email: email, orderId: sessionId });
    const payload = {
      name: name,
      email: email,
      stripeDetails: sessionId,
    };
    setIsLoading(true)
    axios.post("http://localhost:7000/customer/registerCustomer", payload)
      .then((response) => {
        console.log(response.data.accessToken);
        localStorage.setItem("tkn", response.data.accessToken);
        localStorage.setItem("name", response.data.data.name)
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{setIsLoading(false)})
  }, []);

  return (
    <>
      {isLoading?
      <div className='loader-div'>
<div className="unique-loader">
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
    </div>
    <p>please wait...</p>
      </div>
      
   :
      <>
        <Header header={header} />
        <div className="success-content">
        <div className="success-wrapper">
        <div className="success-wrapper-two">
  <h6 className="thank-you">
     Congratulations! 
  </h6>
  
  <p className="paragraph-styles">
    You've just taken your first steps towards a journey of success and self-discovery.
    As you embark on this exciting path, remember that every page you turn and every chapter you delve into brings you a step closer to realizing your full potential.
    Your decision to start this journey is a testament to your commitment to growth and excellence.
    Your adventure is just beginning...
  </p>
  <button className="glightbox3 btn__secondary" onClick={() => handleLinkClick('/dashboard')} id="thankyou-btn">
    Read Now
  </button>
</div>

</div>

          
        </div>
        <CusFooter/>
      </>}
    </>
  );
};

export default Success;
