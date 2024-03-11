import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./sendMessages.css";

export default function SendMessage({ customerDetails, setCustomerDetails }) {
  const [cId, setCId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(customerDetails);
    if (customerDetails && customerDetails.customId) {
      setCId(customerDetails.customId);
    }
  }, [customerDetails]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    console.log(cId);
    console.log("in function");
    try {
      const response = await axios.post(`http://172.31.28.17:7000/customer/messageHelp/${cId}`, {
        message: message // Include the message in the request body
      });
      console.log(response);
      setMessage(response.data.message);
      setCustomerDetails({
        ...response.data.data,
        helpMessage: message // Update the helpMessage in the customerDetails
      });
      setCId("");
    } catch (error) {
      console.log(error);
      setMessage("Problem sending request");
    }
  };
  
  const handleReviewInput = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="message-new">
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={message}
          onChange={handleReviewInput}
          placeholder="Send your message"
        />
        <button className="glightbox3 btn__secondary" type="submit">Send</button>
      </form>
    </div>
  );
}
