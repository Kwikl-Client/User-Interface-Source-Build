import React, { useState } from 'react';
import Header from '../global/header';
import axios from 'axios';
import CusFooter from '../global/cusFooter';
import './refundForm.css';
import { useNavigate } from 'react-router-dom';

const RefundForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [percent, setPercent] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const nextStep = (num) => {
    setStep(num);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear the error when the user starts typing
    setFormError("");
  };

  const refundSubmit = async () => {
    try {
      await axios.post('http://18.207.152.156:7000/payment/refund', { email, percent });
      setStep(6);
    }
    catch (error) {
      console.log(error)
      if (error.response.data.message)
        setFormError(error.response.data.message);
      else
        setFormError("Error sending refund request")
    }
  };

  const handleLinkClick = (link) => {
    navigate(link);
  };

  const evaluateEmail = async()=>{
    try {
      const response = await axios.post('http://18.207.152.156:7000/customer/checkUser', { email });
      // if(response.data.data.refundStatus==="not raised")
      //   setStep(3);
      // else
      // setEmailError(error.response.data.message);
      setStep(3)
    }
    catch (error) {
      console.log(error)
      if (error.response.data.message)
        setEmailError(error.response.data.message);
      else
        setEmailError("Error sending refund request")
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <fieldset className={step === 1 ? 'active' : ''}>
            <h2 className="fs-title">Refund Options</h2>
            <h3 className="fs-subtitle">Are You Sure To Refund?</h3>
            <button className="next action-button" style={{ backgroundColor: 'red' }} onClick={()=>setStep(2)}>
              Yes
            </button>
            <button className="next action-button" style={{ backgroundColor: 'green' }} onClick={() => handleLinkClick('/')}>
              No
            </button>
          </fieldset>
        );
      case 2:
        return (
          <fieldset className={step === 2 ? 'active' : ''}>
            <h3 className="fs-subtitle">Please Provide Your Registered Email</h3>
            <div className={step === 2 ? 'form-group' : 'form-group hidden'}>
              <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <button className="previous action-button" style={{ backgroundColor: 'red' }} onClick={()=>setStep(1)}>
              Back
            </button>
            <button className="next action-button" style={{ backgroundColor: 'green' }} onClick={evaluateEmail}>
              Next
            </button>
          </fieldset>
        );
      case 3:
        return (
          <fieldset className={step === 3 ? 'active' : ''}>
            <h3 className="fs-subtitle">You Are Going To Miss The Best Book. Are You Sure To Get Refund?</h3>
            <button className="previous action-button" style={{ backgroundColor: 'red' }} onClick={()=>setStep(2)}>
              No
            </button>
            <button className="next action-button" style={{ backgroundColor: 'green' }} onClick={()=>setStep(4)}>
              Yes
            </button>
          </fieldset>
        );
      case 4:
        return (
          <fieldset className={step === 4 ? 'active' : ''}>
            <h3 className="fs-subtitle">How Much % You Need Refund?<span style={{ color: 'blue', textDecoration: 'underline'}} onClick={() => setStep(3)}>Back</span></h3>
            <button className="previous action-button" style={{ backgroundColor: 'red' }} onClick={() => {setPercent(80);setStep(5)}}>
              80%
            </button>
            <button className="next action-button" style={{ backgroundColor: 'green' }} onClick={() => {setPercent(100);setFormError("");setStep(5)}}>
              100%
            </button>
          </fieldset>
        );
      case 5:
        return (
          <fieldset className={step === 5 ? 'active' : ''}>
            <h3 className="fs-subtitle">Request for refund?</h3>
            <button className="previous action-button" style={{ backgroundColor: 'red' }} onClick={() => setStep(4)}>
              Back
            </button>
            <button className="next action-button" style={{ backgroundColor: 'green' }} onClick={refundSubmit}>
              Submit
            </button>
            {formError && <p className="error-message">{formError}</p>}
          </fieldset>
        );
      case 6:
        return (
          <fieldset className={step === 6 ? 'active' : ''}>
            <h2>Refund process initiated successfully</h2>
            <h3 className="fs-subtitle">We will refund you when you meet our refund policy.</h3>
            {/* Add any additional actions or buttons for the "Thank You" step */}
          </fieldset>
        );

      default:
        return null;
    }
  };

  const changeSteps=(num)=>{
    console.log(step, num)
    // if(step>=num){
    //   setStep(num)
    // }
  }
  return (
    <>
      <Header />
      <div id="multistepsform">
        <ul id="progressbar" style={{ paddingLeft: '0px' }}>
          <li className={step === 1 ? 'active' : ''} onClick={()=>changeSteps(1)}>Step-1</li>
          <li className={step === 2 ? 'active' : ''} onClick={()=>changeSteps(2)}>Step-2</li>
          <li className={step === 3 ? 'active' : ''} onClick={()=>changeSteps(3)}>Step-3</li>
          <li className={step === 4 ? 'active' : ''} onClick={()=>changeSteps(4)}>Step-4</li>
          <li className={step === 5 ? 'active' : ''} onClick={()=>changeSteps(5)}>Step-5</li>
          <li className={step === 6 ? 'active' : ''} onClick={()=>changeSteps(6)}>Step-6</li>

        </ul>
        {renderStep()}
      </div>
      <CusFooter />
    </>
  );
};

export default RefundForm;
