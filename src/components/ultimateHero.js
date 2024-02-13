import React, { useState } from 'react';
import data from "../data/hero.json";
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Flipbook from './cusComponents/3d-flipbook/3d-flipbook';
import close from "../assets/svg/close.svg";
import frontCover from "../components/cusComponents/3d-flipbook/frontCover.jpg";
import ModalClippedDiv from './cusComponents/modal-timer/modalTimer';
import ClippedDiv from "./cusComponents/3d-flipbook/animatedShape";
import CustomModal from './cusComponents/modal/modal';
import './ultimate.css';
// import './3d-ultimateFB.css';

const UltimateHero = ({ isBg, ultimateData,heroData = {} }) => {
  const { herov2 } = data; // Make sure 'data' is properly defined
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [checkboxError, setCheckboxError] = useState("")
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTermsError, setShowTermsError] = useState(false); const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLinkClick = (link) => {
    navigate(link);
  };

  const handleCloseModal = () => {
    setName("");
    setEmail("");
    setShowModal(false);
  };

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
      const paymentResponse = await axios.get(`http://localhost:7000/payment/createPaymentIntent/?email=${email}&name=${name}`)
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
    <section
      id="hero"
      className={`hero hero__padding overflow-hidden position-relative custom-ultimate ${isBg === "yes" ? "bg-one" : ""
        }`}
      style={{ background: `url('/assets/images/background-img.jpg')` }}
    >
      <div className="container  position-relative">
        <div className="row align-items-center justify-content-between ultimate-cont-cus">
          <div className="col-md-7 col-lg-6 m-0px-b md-m-40px-b">
            <div className="hero__content position-relative">
              <h1 className="display-4 mb-4 text-capitalize" id="ultimate-title">{ultimateData.titleText}</h1>
              <p className="text-muted mb-5 fs-5" id='ultimate-text'>{ultimateData.shortDescription}</p>
              <div className='ulti-btn'>
                <a href="#" className="glightbox3 btn__secondary" onClick={() => setShowModal(true)}>
                  {herov2.aboutBtn}
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 offset-lg-15 text-center badge-image">
            <Flipbook heroData={heroData} />
            {/* <div className="hero__images--badge" onClick={(e) => handleLinkClick('/book', e)}>
                <span>
                  <span className="hero__images--badge--text1">
                    {herov2.tagTitle}
                  </span>
                  <span className="hero__images--badge--text2">
                    {herov2.tagText}
                  </span>
                </span>
            </div> */}
          </div>
        </div>
      </div>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLinkClick={handleLinkClick}
        heroData={heroData}
      />
    </section>
  );
};


export default UltimateHero;