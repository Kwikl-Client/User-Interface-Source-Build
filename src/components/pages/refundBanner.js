import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CustomModal from '../cusComponents/modal/modal';
import "./refundBanner.css"

const RefundBanner = ({refundData, heroData = {} }) => {
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
    const updateFormData = async (formData) => {
        try {
          const formDataResponse = await axios.post("http://172.31.28.17:7000/content/formData", formData);
          return formDataResponse.data;
          console.log(formDataResponse);
        } catch (error) {
          console.error("Error updating form data:", error);
          throw error;
        }
      };

    return (
        <section id="refundd" style={{ backgroundColor: '#f8f9fb', padding: '60px 0px' }}>
            <div className='refund-space'>
                <div className="margin">
                    <div className='btn-double-border-left border-gold bg-gold-on-hover color-gold'>
                        <div className="authorv3__content--badge">
                           {refundData.heading}
                        </div>
                        <h3 className="display-5 mb-0">{refundData.subHeading}</h3>
                        <p className="m-30px-b text-muted fs-5">{refundData.tagline}</p>
                        <p>{refundData.description}</p>
                        <div className="Refund-container">
                            <button className="glightbox3 btn__secondary" onClick={() => setShowModal(true)}>{refundData.button}</button>
                            {/* <div class="button__bottom"></div>
                        <div class="button__shadow"></div> */}
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

    )
}

export default RefundBanner