/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import CustomModal from '../cusComponents/modal/modal';
import data from "../../data/author.json";
import "./authorv5.css";

const Authorv5 = ({isBg, fomoAuthorData,heroData}) => {
  const { authorv3 } = data;
  console.log(fomoAuthorData, "working")
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
      const formDataResponse = await axios.post("http://18.207.152.156:7000/content/formData", formData);
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
      const paymentResponse = await axios.get(`http://18.207.152.156:7000/payment/createPaymentIntent/?email=${email}&name=${name}`)
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
    <section id="author" className={`section-padding authorv3 ${isBg === "yes" ? "bg-one": "" }`}>
      <div className="container">
        <div className="row-author-container">
          <div
            className="col-lg-6"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="author-image">
              <img className="img-fluid" src={fomoAuthorData?.image} alt={fomoAuthorData?.name} style={{width:'700px'}}/>
              <button className="glightbox3 btn__secondary"  onClick={() => setShowModal(true)}>Fomo</button>

            </div>

          </div>
          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div className="authorv3__content" style={{backgroundColor:'rgb(248 253 251)'}}>
              <div className="authorv3__content--badge">
                {authorv3.subtitle}
              </div>
              <h3 className="display-5 mb-0">{fomoAuthorData?.name}</h3>
              <p className="m-30px-b text-muted fs-5">{fomoAuthorData?.shortDescription}</p>
              <p className="m-30px-b">{fomoAuthorData?.briefDescription}</p>
              <ul className="social-icon mt-0 mb-0">
                {authorv3.social?.map((data, i) => (
                  <li key={i}>
                    {data.link === "" ? (
                      ""
                    ) : (
                      <a href={data.link}>
                        <img
                          className="img-fluid"
                          src={data.icon}
                          alt="icon"
                          width="25"
                          height="25"
                        />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
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

export default Authorv5;

