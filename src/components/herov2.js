import React from "react";
import data from "../data/hero.json";
import Flipbook from "./cusComponents/3d-flipbook/3d-flipbook";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import close from "../assets/svg/close.svg";
import CustomModal from "./cusComponents/modal/modal";
import line from "./line.svg";
import frontCover from "../components/cusComponents/3d-flipbook/frontCover.jpg";
import ClippedDiv from "./cusComponents/3d-flipbook/animatedShape";
import "./herov2.css"
import ModalClippedDiv from "./cusComponents/modal-timer/modalTimer";
// import Book from "./cusComponents/book/book";

const Herov2 = ({ isBg, heroData = {} }) => {
  const { herov2 } = data;
  const navigate = useNavigate();
  const handleLinkClick = (link) => {
    navigate(link)
  }
  const [checkboxError, setCheckboxError] = useState("")
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptTermsError, setAcceptTermsError] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleCloseModal = () => {
    setName("");
    setEmail("");
    setShowModal(false);
    setSubmitError("");
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

  const updateFormData = async (formData) => {
    try {
      const formDataResponse = await axios.post("http://18.209.7.74:7000/content/formData", formData);
      return formDataResponse.data;
    } catch (error) {
      console.error("Error updating form data:", error);
      throw error;
    }
  };

  const handleFormSubmission = async (formData) => {
    try {
      const formDataUpdateResponse = await updateFormData(formData);
      console.log("Form data update response:", formDataUpdateResponse);
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };

  const formData = {
    heading1: "Example Heading",
    descrip1: "Example Description",
  };

  return (
    <section
      id="hero"
      className={`hero hero__padding overflow-hidden position-relative custom-hero ${isBg === "yes" ? "bg-one" : ""
        }`}
    >
      <div className="circle x1"></div>
      <div className="circle x2"></div>
      <div className="circle x3"></div>
      <div className="circle x4"></div>
      <div className="circle x5"></div>
      <div className="container  position-relative" >
        <div className="row align-items-center justify-content-between home-cont-cus">
          <div className="col-md-7 col-lg-6 m-0px-b md-m-40px-b">
            <div className="hero__content position-relative">
              <h1 className="display-4 mb-4 text-capitalize">
                <span className="title-text">
                  {heroData.titleText}
                </span>
              </h1>
              <p className="text-muted mb-5 fs-5" id="hero-text">{heroData.shortDescription}
              </p>
              <div className="buttonsDiv">
                <a
                  href="#pricing"
                  className="smooth button button__primary me-3"
                  onClick={() => handleLinkClick('/book')}
                >
                  <span>{heroData.button1}</span>
                </a>
                <button
                  className="glightbox3 btn__secondary"
                  onClick={() => setShowModal(true)}
                >
                  {heroData.button2}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5 offset-lg-1 text-center badge-image">
            <Flipbook heroData={heroData} />
            <div className="hero__images--badge">
              <span>
                <span className="hero__images--badge--text1">
                  {herov2.tagTitle}
                </span>
                <span className="hero__images--badge--text2">
                  {herov2.tagText}
                </span>
              </span>
            </div>
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

export default Herov2;
