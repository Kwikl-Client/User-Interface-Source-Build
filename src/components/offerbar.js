import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './sales.css';

const SalesCountdownTimer = () => {
  const [countdown, setCountdown] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleCloseModal = () => {
    setName('');
    setEmail('');
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      console.log('Email submitted:', email);
      const emailCheckResponse = await axios.post('http://localhost:7000/customer/checkUser', { email });
      if (emailCheckResponse.data.exists) {
        console.log('Email already exists. Choose another email.');
        setEmailExists(true);
        return;
      }
      const paymentResponse = await axios.get(
        `http://localhost:7000/payment/createOfferPaymentIntent/?email=${email}&name=${name}`
      );
      console.log(paymentResponse.data.data.url);
      window.location.href = paymentResponse.data.data.url;
    } catch (error) {
      console.error('Error handling submission and payment:', error);
    }
  };

  const getTimeComponents = (distance) => {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  useEffect(() => {
    const updateCountdown = () => {
      const countdownDate = new Date('2024-01-01T00:00:00Z').getTime();
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        setCountdown('Sale has ended!');
      } else {
        const { days, hours, minutes } = getTimeComponents(distance);
        const formattedDays = Number.isNaN(days) ? 0 : days;
        const formattedHours = Number.isNaN(hours) ? 0 : hours;
        const formattedMinutes = Number.isNaN(minutes) ? 0 : minutes;

        setCountdown(`${formattedDays}d ${formattedHours}h ${formattedMinutes}m`);
      }
    };

    const countdownInterval = setInterval(() => {
      console.log('Updating countdown...');
      updateCountdown();
    }, 1000);

    return () => {
      console.log('Clearing interval...');
      clearInterval(countdownInterval);
    };
  }, []);

  const { carts } = useSelector((state) => state.allCart);

  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setPrice(totalprice);
  };

  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);

  return (
    <div className="countdown-banner">
      <span id="countdown" className="countdown">
                   <span style={{marginRight:"12px"}}>Hurry, Sale Ends In:{' '}</span>
        {countdown}
      </span>
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
  <Modal.Header closeButton>
    <Modal.Title className="modal-title text-center">Enter Your Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29zbWljfGVufDB8fDB8fHww"
            alt="Description of the image"
            className="modal-image mb-4"
          />
        </div>
        <div className="col-md-6 text-left">
          <Form className="modal-form">
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox" className="d-flex align-items-center">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Check
                      type="checkbox"
                      label=""
                      style={{ fontSize: '14px', marginTop: '8px' }}
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                    />
                    <span style={{ fontSize: '14px', marginLeft: '4px' }}>I accept the terms and conditions</span>
                  </div>
                </Form.Group>
              </Form>
              {emailExists && (
                <div className="alert alert-danger mt-3" role="alert">
                  Email already exists. Please choose another email.
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} disabled={!acceptTerms} className="modal-button">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default SalesCountdownTimer;
