import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import close from '../../../assets/svg/close.svg';
import ModalClippedDiv from '../modal-timer/modalTimer';
import frontCover from "../3d-flipbook/front-cover.jpg"


const CustomModal = ({ showModal, handleCloseModal, handleLinkClick, heroData = {} }) => {
    const [checkboxError, setCheckboxError] = useState("")
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [showTermsError, setShowTermsError] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [secondsTimer, setSecondsTimer] = useState(99);

    useEffect(() => {
      const secondsInterval = setInterval(() => {
        setSecondsTimer((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
      }, 9000);
  
      return () => clearInterval(secondsInterval);
    }, []);
  
  const validateInputs = () => {
    let isValid = true;

    // Validate acceptance of terms
    if (!acceptTerms) {
      setCheckboxError('Please accept the terms.');
      isValid = false;
    } else {
      setCheckboxError('');
    }

    // Validate Name
    if (!name.trim()) {
      setNameError('Please enter your name.');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

const handleSubmit = async () => {
    try {
      if (!validateInputs()) {
        setShowTermsError(!acceptTerms);
        return;
      }
      console.log("Email submitted:", email);
      const emailCheckResponse = await axios.post('http://172.31.28.17:7000/customer/checkUser',{ email });
      if (emailCheckResponse.data.exists) {
        console.log("Email already exists. Choose another email.");
        setEmailExists(true);
        return;
      }
      const paymentResponse = await axios.get(`http://172.31.28.17:7000/payment/createPaymentIntent/?email=${email}&name=${name}`)
      console.log(paymentResponse.data.data.url)
      window.location.href = paymentResponse.data.data.url;
      // handleCloseModal(false);
    } catch (error) {
      console.error("Error handling submission and payment:", error);
    }
  };
  const updateFormData = async (formData) => {
    try {
      const formDataResponse = await axios.post("http://172.31.28.17:7000/content/formData", formData);
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
  return (
    <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal small-modal">
       <Modal.Header style={{ borderBottom: 'none' }}>
          <img
            src={close}
            alt="Close"
            className="close-icon-img"
            onClick={handleCloseModal}
          />
          <button className="ribbon-popup-21">
            <p style={{ textDecoration: 'line-through', paddingRight: '10px', fontFamily: 'cardo' }}></p>
            <p className='pop-buyNow' style={{ fontFamily: 'cardo' }}>Buy Now</p>
          </button>
          <button className="ribbon-top">
            <ModalClippedDiv  secondsTimer={secondsTimer} />
            <p className="button-para-1" style={{ fontFamily: 'cardo' }}> <span style={{ padding: '2px' }}>$</span><span>
              {heroData.offerPrice}
            </span></p>
            <p className="button-para-2" style={{ fontFamily: 'cardo' }} >
              $
              {heroData.originalPrice}
            </p>
          </button>
        </Modal.Header>
      <Modal.Body className="mdl-bdy" style={{ paddingBottom: '0', marginBottom: '-40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-fluid">
        <div className="row justify-content-center">
              <div className="col-md-5 text-center d-none d-md-block">
                <img
                  src={frontCover}
                  alt="Description of the image"
                  className="modal-image mb-4"
                />
              </div>
              <h2 class="display-6 d-md-none" id="mdl-bk-title">Book Title</h2>
              <div className="col-md-5 text-center" id="form-brdr">
                <Form className="modal-form small-form" >
                  <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      placeholder="Name  <immutable>"
                      value={name}
                      onChange={(e) => {
                        const isValidName = /^[a-zA-Z\s]*$/.test(e.target.value);
                        if (isValidName || e.target.value === '') {
                          setName(e.target.value);
                          setNameError('');
                        } else {
                          setNameError('Special characters are not allowed in the name.');
                        }
                      }}                      
                      required
                      className={nameError ? "error-input" : ""}
                    />
                    {nameError && <div className="inline-alert">{nameError}</div>}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email  <immutable>"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={emailError ? "error-input" : ""}
                    />
                    {emailError && <div className="inline-alert">{emailError}</div>}
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox" className="d-flex">
                    <div style={{ display: 'flex', paddingTop: '4%' }}>
                      <Form.Check
                        type="checkbox"
                        label=""
                        className={`checkbox-small ${checkboxError ? "error-inputs" : ""}`}
                        checked={acceptTerms}
                        onChange={() => setAcceptTerms(!acceptTerms)}
                        required
                        style={{ width: '12px', height: '12px' }}
                      />
                      <p className="pop-up-agrmnt">      <span className={`yes-up-agrmnt ${!acceptTerms ? 'red-text' : ''}`}>Yes,
                      </span>I understand and agree to the{' '}
                        <span classname="click-link" onClick={() => handleLinkClick('/t&c')} style={{ textDecoration: 'underline' }}>
                          Terms of Service
                        </span>, including the{' '}
                        <span classname="click-link" onClick={() => handleLinkClick('/user-agreement')} style={{ textDecoration: 'underline' }}>
                          User Agreement
                        </span> and{' '}
                        <span classname="click-link" onClick={() => handleLinkClick('/privacyPolicy')} style={{ textDecoration: 'underline' }}>
                          Privacy Policy
                        </span>
                      </p>
                    </div>
                    {checkboxError && <div className="inline-alert">{checkboxError}</div>}
                  </Form.Group>

                  <div className="text-right" style={{ display: 'flex', justifyContent: 'center', marginTop: '12%' }}>
                    <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'black', border: 'none', padding: '2% 20%' }} variant="primary" onClick={handleSubmit} className="glightbox3 btn__secondary" id="hoverEffect">
                      Enter
                    </Button>
                  </div>
                  {emailExists && (
                    <div className="alert alert-danger mt-3" role="alert" style={{ fontSize: '9px' }}>
                      Email already exists. Please choose another email.
                    </div>
                  )}
                </Form>
              </div>
            </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
