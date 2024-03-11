
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import close from "../assets/svg/close.svg";
import ModalClippedDiv from "./cusComponents/modal-timer/modalTimer";
import ClippedDiv from "./cusComponents/3d-flipbook/animatedShape";
import frontCover from "./cusComponents/3d-flipbook/frontCover.jpg"
import data from "../data/bookAbout.json";
import videoBackground from '../assets/videoBackground/videoBackground.mp4';
import { Link } from "react-router-dom";
import CustomModal from "./cusComponents/modal/modal";
import "./bookAboutCus.css";

const BookAbout = ({ isBg,heroData = {},overviewData }) => {
  const { content } = data;
  const navigate = useNavigate();
  const handleLinkClick = (link) => {
    navigate(link)
  }
  const [checkboxError, setCheckboxError] = useState("")
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTermsError, setShowTermsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleCloseModal = () => {
    setName("");
    setEmail("");
    setShowModal(false);
  }
  const updateFormData = async (formData) => {
    try {
      const formDataResponse = await axios.post("http://172.31.28.17:7000/content/formData", formData);
      return formDataResponse.data;
    } catch (error) {
      console.error("Error updating form data:", error);
      throw error;
    }
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
      const paymentResponse = await axios.get(`http://172.31.28.17:7000/payment/createPaymentIntent/?email=${email}&name=${name}`)
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
    // <!-- ========== Book About section starts ========== -->
    <section
      id="events"
      className={`section-padding event bookAbout-cont-cus ${isBg === "yes" ? "bg-one" : ""}`}
    >
      <video autoPlay muted loop playsInline className="video-background">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="video-overlay"></div> */}
      <div className="container">
        <div className="row">
          <div className="col-xl-6 offset-xl-3 col-lg-10 offset-lg-1">
            <div className="section-title-center text-center">
              <span style={{ color: "Black" }}>{overviewData.title}</span>
              <h2 className="display-6" style={{ color: "Black" }}>{overviewData.overallTitle}</h2>
              {/* <div className="section-divider divider-traingle"></div> */}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {content.singleContent.slice(0, 3).map((data, i) => (
            <div
              key={i}
              className="col-md-6 col-lg-4 mb-4"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={(i + 2) * 50}
            >
              <article className="events__single-event h-100 translateEffect1">
                {/* <div className="events__single-event__image">
                  <Link to="/single-event">
                    <img className="img-fluid" src={data.image} alt="" />
                  </Link>
                </div> */}
                <div className="events__single-event__body">
                  <div className="events__single-event__content">
                    <h2 className="fs-4 text-center" style={{ paddingBottom: '3%' }}>
                      <Link to="/single-event">{data.title}</Link>
                    </h2>
                    <p className="m-0 text-center">{data.description}</p>
                  </div>
                  {/* <div className="events__single-event__meta">
                    <div>
                      <FaRegCalendarAlt /> {data.date} {data.month}, {data.year}
                    </div>
                    <div>
                      <FaMapMarkerAlt /> {data.location}
                    </div>
                  </div> */}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      <div className="section-btn-cta">
        <button onClick={() => setShowModal(true)}
          className="glightbox3 btn__secondary" id="three-box">
          {overviewData.button}
        </button>
      </div>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLinkClick={handleLinkClick}
        heroData={heroData}
      />
    </section>
    // <!-- ========== Book about section end ========== -->
  );
};

export default BookAbout;

