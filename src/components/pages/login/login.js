import React, { useState, useEffect } from 'react';
import Header from '../../global/header';
import CusFooter from '../../global/cusFooter';
import headerData from '../../../data/header.json';
import AnnouncementBar from '../../cusComponents/announcement/announcement';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import eye from '../../pages/dashboard/eye.svg';
import hide from '../../pages/dashboard/hide.svg';
import './login.css';

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [headerData, setHeaderData] = useState({});
  const [password, setPassword] = useState('');
  const [forgetCreds, setForgetCreds] = useState('');
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const EyeIcon = (
    <img
      src={showPassword ? hide : eye}
      alt={showPassword ? 'Hide Password' : 'Show Password'}
      style={{
        width: '7%',
        cursor: 'pointer',
        transition: 'opacity 2s ease-in-out', // Adjust the transition property
        opacity: showPassword ? 1 : 0.7, // Set initial opacity
      }}
      onClick={() => setShowPassword(!showPassword)}
    />
  );

  const HandleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!isEmailValid(email) || !password) {
      setError('Invalid emailId /password');
      return;
    }
    const credentials = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post('http://18.209.7.74:7000/customer/loginCustomer', credentials);
      localStorage.setItem('tkn', response.data.accessToken);
      localStorage.setItem('name', response.data.data.name);
      navigate('/dashboard');
    } catch (error) {
      if (error.response.data.message) setError(error.response.data.message);
      else setError('Invalid credentials. Please try again.');
    }
  };

  const HandlepasswordForgot = async (e) => {
    e.preventDefault();
    setEmailError('');
    setOtpMessage('');
    setError('');
    try {
      const response = await axios.post('http://18.209.7.74:7000/customer/forgotPassword', { email: forgetCreds });
      if (response.data && response.data.success) {
        setShowForgotPasswordForm(true);
        setOtpMessage('OTP has been sent to your email.');
      } else {
        setError('Email verification failed. Please try again.');
      }
    } catch (error) {
      setError('Please try again with proper registered email Id.');
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordForm(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://18.209.7.74:7000/cms/getHeader'),
        ];
        const [headerResponse] = await Promise.all(requests);
        setHeaderData(headerResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('tkn');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`http://18.209.7.74:7000/customer/verifyTkn/${token}`)
      .then(() => {
        if (showForgotPasswordForm) {
          navigate('/dashboard');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, [showForgotPasswordForm]);

  const { header } = headerData;
  const [secondsTimer, setSecondsTimer] = useState(99);

  return (
    <>
      <Header headerData={headerData} />
      <AnnouncementBar  secondsTimer={secondsTimer}/>
      <div className="my-5 d-flex justify-content-center align-items-center" id="lgn-pg">
        <form
          style={{
            fontFamily: 'soehne, sans-serif',
            width: '300px',
            padding: '20px',
            border: 'none',
            borderRadius: '5px',
            boxShadow: 'none',
          }}
        >
          {showForgotPasswordForm ? (
            <>
              <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: '1px', textAlign: 'center' }}>
                Forgot Password
              </h5>
              <div className="mb-4">
                <input
                  type="text"
                  id="forgotEmail"
                  className={`form-control ${emailError ? 'is-invalid' : ''}`}
                  placeholder="Enter your registered email id"
                  value={forgetCreds}
                  onChange={(e) => setForgetCreds(e.target.value)}
                  style={{ border: 'none', borderBottom: '1px solid gray' }}
                />
                {emailError && <div className="invalid-feedback" style={{ fontSize: '12px' }}>{emailError}</div>}
              </div>
              <button className="glightbox3 btn__secondary" onClick={HandlepasswordForgot} style={{ width: '100%' }}>
                Send OTP
              </button>
              {otpMessage && <div className="text-success mt-3">{otpMessage}</div>}
              {error && <div className="custom-error-message mt-3">{error}</div>}
              <div className="text-center mt-3" id="frgt-p">
                <span className="link" onClick={() => setShowForgotPasswordForm(false)}>
                  <p style={{ color: '#333', fontSize: '11px' }} className='logout-div'>Back</p>
                </span>
              </div>
            </>
          ) : (
            <>
              <h5 className="fw-normal mb-4 pb-3" style={{ letterSpacing: '1px', textAlign: 'center' }}>
                Login
              </h5>
              <div className="mb-4" style={{ marginTop: '4rem', position: 'relative' }}>
                <input
                  type="text"
                  id="email"
                  className={`form-control ${error && (!email || !isEmailValid(email)) ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  style={{ border: 'none', borderBottom: '1px solid gray' }}
                />
              </div>
              <div className="mb-4" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`form-control ${error && !password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  style={{ border: 'none', borderBottom: '1px solid gray' }}
                />
                {password && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '-282px',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {EyeIcon}
                  </div>
                )}
              </div>
              {error && (
                <div className="custom-error-message mt-3">
                  {error}
                </div>
              )}
              <button className="glightbox3 btn__secondary" onClick={(e) => HandleLogin(e)} style={{ width: '100%' }}>
                Login
              </button>
              <div className="text-center mt-3" id="frgt-p">
                <span className="link" onClick={handleForgotPasswordClick}>
                  <p style={{ color: '#333', fontSize: '11px' }} className='logout-div'>Forgot Password?</p>
                </span>
              </div>
            </>
          )}
        </form>
      </div>
      <CusFooter />
    </>
  );
}

export default LoginPage;
