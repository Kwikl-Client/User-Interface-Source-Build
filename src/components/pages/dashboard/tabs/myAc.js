import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import eye from '../eye.svg';
import hide from '../hide.svg';
import "./myAc.css"
import { CountryDropdown } from 'react-country-region-selector';

export default function MyAc({ customerDetails, setCustomerDetails }) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [defaultCustomerData, setDefaultCustomerData] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(" ");
  const [country, setCountry] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [profession, setProfession] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);

  const phNoRef = useRef();

  useEffect(() => {
    if (customerDetails) {
      setDefaultCustomerData({
        ...customerDetails,
        orders: customerDetails?.orders || [],
      });
      setCountry(customerDetails?.country || "");
      setPhoneNumber(customerDetails?.phoneNumber || "");
    }
  }, [customerDetails]);

  const handleTogglePassword = (inputKey) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [inputKey]: !prevShowPasswords[inputKey],
    }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setIsEditModeOn(false);
    setDefaultCustomerData(customerDetails);
    setCountry(customerDetails.country);
    setPhoneNumber(customerDetails?.phoneNumber);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setReviewText(customerDetails?.reviewText);
    setProfession(customerDetails?.profession);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length > 0 || oldPassword.length > 0 || confirmPassword.length > 0) {
      if (!newPassword.length === 0 || oldPassword.length === 0 || confirmPassword.length === 0) {
        setErrorMessage("Please fill all three password fields to change password");
        return;
      }
      if (!isPasswordValid(newPassword)) {
        setErrorMessage("New password must be at least 12 characters long and include an uppercase letter, a number, and a special character.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage("New passwords are not matching");
        return;
      }
    }
    let payload = { country, phoneNumber, oldPassword, newPassword };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    };

    try {
      const response = await axios.patch("http://localhost:7000/customer/editCustomerDetails", payload, config);
      if (response?.data?.accessToken)
        localStorage.setItem("tkn", response.data.accessToken);
      setCustomerDetails(response.data.data);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditModeOn(false);
      setIsReviewFormVisible(false);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      if (error.response.data.message)
        setErrorMessage(error.response.data.message);
      else
        setErrorMessage("Error changing password");

      console.log(error);
      setCustomerDetails(customerDetails);
    }
  };


  const handleReviewSubmit = async (e) => {
    setIsReviewFormVisible(false);
    console.log(customerDetails._id);
    try {
      const response = await axios.post(`http://localhost:7000/customer/usersReview/${customerDetails._id}`, {
        starRating,
        reviewText,
        profession,
      });
      console.log(response.data.message);
      console.log(response.data.data);
      setReviewText("");
      setProfession("");
      setIsReviewFormVisible(false);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error submitting review. Please try again later.");
      setSuccessMessage("");
    }
  };
  const isPasswordValid = (password) => {
    if (password.length !== 12) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/\d/.test(password)) {
      return false;
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      return false;
    }

    return true;
  };


  const handleReviewInput = (e) => {
    const inputText = e.target.value;

    if (inputText.length > 200) {
      setReviewText(inputText.slice(0, 200));
      setErrorMessage('Cannot add more than 200 characters.');
    } else {
      setReviewText(inputText);
      setErrorMessage('');
    }
    if (inputText.length === 200) {
      setReminderMessage('You have reached the limit of 200 characters.');
    } else {
      setReminderMessage('');
    }
  };
  const EyeIcon = (inputKey) => (
    <img
      src={showPasswords[inputKey] ? hide : eye}
      alt={showPasswords[inputKey] ? 'Hide Password' : 'Show Password'}
      style={{
        width: '5%',
        cursor: 'pointer',
        transition: 'opacity 2s ease-in-out', // Adjust the transition property
        opacity: showPasswords[inputKey] ? 1 : 0.7, // Set initial opacity
      }}
      onClick={() => handleTogglePassword(inputKey)}
    />
  );
  const handleStarClick = (rating) => {
    setStarRating(rating);
  };

  const turnOnEdit = () => {
    setIsEditModeOn(true);
    phNoRef.current.focus();
  };

  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    if (/^\d{0,10}$/.test(inputPhoneNumber) || inputPhoneNumber === "") {
      setPhoneNumber(inputPhoneNumber);
    }
  };

  const maxHeight = isHistoryVisible ? '500px' : '0';
  
  return (
    <div className='accounts-tab' style={{ flexDirection: 'column' }}>
      <form className='myAc-container'>
        <div>
          <input type="text" value={`Type: ${defaultCustomerData?.customerType}`} readOnly />
          <input type="text" value={`Id: ${defaultCustomerData?.customId}`} style={{ borderLeft: "1px solid", paddingLeft: 10 }} />
        </div>
        <hr style={{ margin: '0px', width: '100%' }} />
        <input type='text' value={defaultCustomerData?.name || ""} readOnly />
        <hr style={{ margin: '0px', width: '100%' }} />
        <input type='email' value={defaultCustomerData?.email || ""} readOnly />
        <hr style={{ margin: '0px', width: '100%' }} />
        <input type='tel' value={phoneNumber || ""} onChange={handlePhoneNumberChange} placeholder='Phone Number' readOnly={!isEditModeOn} ref={phNoRef} />
        <hr style={{ margin: '0px', width: '100%' }} />
        <CountryDropdown value={country || ""} onChange={(value) => setCountry(value)} disabled={!isEditModeOn} />
        <hr style={{ margin: '0px', width: '100%' }} />
        <div className="password-input-container">
          <input
            type={showPasswords['oldPassword'] ? 'text' : 'password'}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder='Old Password'
            readOnly={!isEditModeOn}
          />
          {isEditModeOn && oldPassword && EyeIcon('oldPassword')}
        </div>

        <hr style={{ margin: '0px', width: '100%' }} />

        <div className="password-input-container">
          <input
            type={showPasswords['newPassword'] ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='New Password'
            maxLength={12}
            readOnly={!isEditModeOn}
          />
          {isEditModeOn && newPassword && EyeIcon('newPassword')}
        </div>

        <hr style={{ margin: '0px', width: '100%' }} />

        <div className="password-input-container">
          <input
            type={showPasswords['confirmPassword'] ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            maxLength={12}
            readOnly={!isEditModeOn}
          />
          {isEditModeOn && confirmPassword && EyeIcon('confirmPassword')}
        </div>

        <hr style={{ margin: '0px', width: '100%' }} />
        <div className='btn-container'>
          {!isEditModeOn && <div onClick={turnOnEdit}>Edit</div>}
          {isEditModeOn && (
            <div className='saveCancel-container'>
              <div onClick={handleSubmit} id="save-btn">Save</div>
              <div onClick={handleReset} id="cncl-btn">Cancel</div>
            </div>
          )}
        </div>
      </form>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      {/* <div className='reviews-user'>
        <p style={{ display: 'flex', alignItems: 'center', fontWeight: '500', color: '#2f4858', fontSize: '18px' }} onClick={() => setIsReviewFormVisible(!isReviewFormVisible)}>
          Review
          <i className="material-icons" style={{ fontSize: '18px', marginLeft: '86.5%' }}>create</i>
        </p>
      </div>
      {isReviewFormVisible && (
        <form className="review-form" onSubmit={handleReviewSubmit}>
          <div className="star-rating">
            <div className="star-icons">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={rating <= starRating ? "star-filled" : "star-empty"}
                  onClick={() => setStarRating(rating)}
                >
                  &#9733; 
                </span>
              ))}
            </div>
          </div>
          <textarea
            value={reviewText || ""}
            onInput={handleReviewInput}
            maxLength={200}
            placeholder="Write your review here..."
            style={{ fontFamily: 'Soehne, sans-serif' }}
          />
          {reminderMessage && <p style={{ color: 'red' }}>{reminderMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <input
            type="text"
            placeholder="Profession"
            className='prof-inpt'
            value={profession || ""}
            onChange={(e) => setProfession(e.target.value)}
            style={{ fontFamily: 'Soehne, sans-serif' }}
          />
          <button type="submit">Submit Review</button>
        </form>
      )} */}
      <div className="account-history">
        <div className='acnt-hst'>
          <h2 className="h2-styling-myac">
            Order History
          </h2>
          <p className="change-password" onClick={() => setIsHistoryVisible(!isHistoryVisible)}>
            <span style={{ fontSize: '38px' }}>{isHistoryVisible ? '-' : '+'}</span>
          </p>
        </div>
        <div className="order-table-container">
          {isHistoryVisible && (
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item</th>
                  <th>Date</th>
                  <th>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{defaultCustomerData._id && defaultCustomerData._id.slice(0, 8)}</td>
                  <td>{defaultCustomerData.customerType === 'reader' ? 'seo brook' : defaultCustomerData.customerType}</td>
                  <td>{defaultCustomerData.createdAt && new Date(defaultCustomerData.createdAt).toLocaleDateString()}</td>
                  <td>${defaultCustomerData.amtPaid/100}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>

  )
}