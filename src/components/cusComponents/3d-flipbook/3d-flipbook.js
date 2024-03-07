import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './3d-flipbook.css';
import ClippedDiv from './animatedShape';
import CustomModal from '../modal/modal';

export default function Flipbook({ heroData }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isRotatingLeft, setIsRotatingLeft] = useState(false);
  const [isRotatingRight, setIsRotatingRight] = useState(false);
  const flipbookRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [checkboxError, setCheckboxError] = useState("")
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTermsError, setShowTermsError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleBookClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFirstHalfEnter = () => {
    setIsRotatingLeft(true);
  };

  const handleFirstHalfLeave = () => {
    setIsRotatingLeft(false);
  };

  const handleSecondHalfEnter = () => {
    setIsRotatingRight(true);
  };

  const handleSecondHalfLeave = () => {
    setIsRotatingRight(false);
  };
  const navigate = useNavigate();
  const handleLinkClick = (link, e) => {
    e.preventDefault();
    navigate(link)
  }
  const handleCloseModal = () => {
    setName("");
    setEmail("");
    setShowModal(false);
  }
  const validateInputs = () => {
    let isValid = true;

    // Validate acceptance of terms
    if (!acceptTerms) {
      setCheckboxError(true);
      isValid = false;
    } else {
      setCheckboxError(false);
    }

    // Validate Name
    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    return isValid;
  };


  const handleSubmit = async () => {
    try {
      setSubmitError("");
      if (!validateInputs()) {
        setShowTermsError(!acceptTerms);
        return;
      }
      const paymentResponse = await axios.get(`http://18.209.7.74:7000/payment/createPaymentIntent/?email=${email}&name=${name}`)
      window.location.href = paymentResponse?.data?.data?.url;
    }
    catch (error) {
      console.log(error)
      if (error.response.data.message)
        setSubmitError(error.response.data.message);
      else
        setSubmitError("Error creating payment intent")
    }
  };

  return (
    <div className="flipBook-container">
      <div className="hero__images text-center">
        <div
          onMouseLeave={() => {
            handleFirstHalfLeave();
            handleSecondHalfLeave();
          }}
          className={`book ${isRotatingLeft && 'rotateLeft'} ${isRotatingRight && 'rotateRight'} ${isFlipped && 'flip'}`}
          onClick={handleBookClick}
          ref={flipbookRef}
        >
          <div className="front-cover">
          <div
              className="first-half"
              style={{backgroundImage: `url(${heroData?.image})`}}
              onMouseEnter={handleFirstHalfEnter}
            ></div>
          </div>
          <button
            className="ribbon-2 "
          >
            <a onClick={(e) => handleLinkClick('/book', e)}>
              Preview
            </a>
          </button>
          <button className="ribbon-1" onClick={() => setShowModal(true)} id='ribbons-1'>
            <ClippedDiv />
            {/* <img src={Timer} style={{width:'97px',height:'97px',marginLeft: '-120px'}}><ClippedDiv></ClippedDiv></img> */}
            <p style={{ fontSize: '26px', paddingRight: '10px' }}> <span style={{ padding: '2px' }}>$</span><span>
              {heroData?.offerPrice}
            </span></p>
            <p style={{ textDecoration: 'line-through', paddingRight: '10px', fontSize: '20px' }}>
              ${heroData?.originalPrice}
            </p>
          </button>
          <button className="ribbon" onClick={() => setShowModal(true)} id='ribbons-2'>
            <p style={{ textDecoration: 'line-through', paddingRight: '10px' }}>
            </p>
            <p className='buyNow'>Buy Now</p>
          </button>
        </div>
      </div>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLinkClick={handleLinkClick}
        heroData={heroData}
      />
    </div>
  );
}
