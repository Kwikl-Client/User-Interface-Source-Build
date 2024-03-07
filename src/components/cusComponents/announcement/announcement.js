import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import CustomModal from '../modal/modal';
import './announcement.css';

const AnnouncementBar = ({ heroData, secondsTimer }) => {
  const [checkboxError, setCheckboxError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userCount, setUserCount] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showTermsError, setShowTermsError] = useState(false);
  const [timer, setTimer] = useState(() => {
    const storedTimer = localStorage.getItem('timer');
    return storedTimer ? parseInt(storedTimer, 10) : calculateTimeRemaining();
  });
  const [isClosed, setIsClosed] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    navigate(link);
  };

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCloseModal = () => {
    setName("");
    setEmail("");
    setShowModal(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!acceptTerms) {
      setCheckboxError(true);
      isValid = false;
    } else {
      setCheckboxError(false);
    }

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

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
      const paymentResponse = await axios.get(`http://18.209.7.74:7000/payment/createPaymentIntent/?email=${email}&name=${name}`);
      window.location.href = paymentResponse?.data?.data?.url;
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError("Error creating payment intent");
      }
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

  const timerRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = calculateTimeRemaining();
        localStorage.setItem('timer', newTimer.toString());
        return newTimer;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://18.209.7.74:7000/customer/dailyUserCount'),

        ];

        const [userCountResponse] = await Promise.all(requests);
        setUserCount(userCountResponse.data);
        console.log(userCountResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; fetchData();
  }, []);
  useEffect(() => {
    const secondsInterval = setInterval(() => {
      setTimer((prevSeconds) => {
        const newTimer = prevSeconds > 0 ? prevSeconds - 1 : 0;
        localStorage.setItem('timer', newTimer.toString()); // Update local storage
        return newTimer;
      });
    }, 9000);

    return () => clearInterval(secondsInterval);
  }, [/* dependencies */]);

  const updateTimer = () => {
    setTimer(calculateTimeRemaining());
  };

  const startTimerInterval = () => {
    timerRef.current = setInterval(updateTimer, 100);
  };

  const stopTimerInterval = () => {
    clearInterval(timerRef.current);
  };

  const handleCounterUpdate = () => {
    setTimer((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
  };

  const startCounterInterval = () => {
    timerRef.current = setInterval(handleCounterUpdate, 9000);
  };

  const stopCounterInterval = () => {
    clearInterval(timerRef.current);
  };

  const handleCloseButtonClick = () => {
    setIsClosed(true);
    setShowStickyFooter(true);
    stopCounterInterval();
  };

  function calculateTimeRemaining() {
    const now = new Date();
    const estOffset = -5 * 60 * 60 * 1000; // Offset for EST (-5 hours)
    const estNow = new Date(now.getTime() + estOffset);
    const endOfDay = new Date(estNow.getFullYear(), estNow.getMonth(), estNow.getDate(), 23, 59, 59, 999);

    const timeDiff = endOfDay - estNow;
    return timeDiff > 0 ? timeDiff : 0;
  }


  function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    const paddedSeconds = seconds.toString().padStart(2, '0');

    return `${hours.toString().padStart(2, '0')}h:${minutes
      .toString()
      .padStart(2, '0')}m:${paddedSeconds}s:${ms
        .toString()
        .padStart(2, '0')}ms`;
  }

  startTimerInterval();
  startCounterInterval();
  return (
    <div className={isClosed ? "announcement-bar hidden" : "announcement-bar"}>
      <div className="sectimer">
        <span className={`digit ${secondsTimer < 10 ? 'single-digit-timer' : ''}`}>
          {userCount.result}
        </span>
        <span className='timer-text'>End-of-day {window.innerWidth < 600 && <br />}special offer</span>
      </div>
      <div className="center-content">
        Unlock <span className='ninty-percentage'>90% </span>Saving {window.innerWidth < 600 && <br />}<span className={`timer ${secondsTimer < 10 ? 'seconds-timer' : ''}`}>
          {formatTime(timer)}
        </span>
      </div>
      <button className="right-button" onClick={() => setShowModal(true)}>
        Read Now
      </button>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLinkClick={handleLinkClick}
        heroData={heroData}
      />
    </div>
  );
};

export default AnnouncementBar;
