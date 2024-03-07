import React, { useState } from 'react';

export default function HelpModal({ isOpen, onClose }) {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Handle submission of feedback here
    console.log('Feedback submitted:', feedback);
    // You can add your logic to submit the feedback to your backend or perform any other action
    // Clear the feedback input after submission
    setFeedback('');
    // Close the modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Help Modal</h2>
        <p>This is the help modal content.</p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback..."
          rows="4"
          cols="50"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
