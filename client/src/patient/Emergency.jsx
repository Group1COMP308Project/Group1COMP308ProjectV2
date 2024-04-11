import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './Emergency.css'; // Import the CSS file for styling

const ADD_EMERGENCY = gql`
  mutation AddEmergency($email: String!, $type: String!, $message: String!, $alertTime: String!) {
    addEmergency(email: $email, type: $type, message: $message, alertTime: $alertTime) {
      id
      type
      message
      alertTime
      patient {
        email
      }
    }
  }
`;

const Emergency = () => {
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [addEmergency] = useMutation(ADD_EMERGENCY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmergency({
        variables: {
          email,
          type,
          message,
          alertTime,
        },
      });
      // Reset form fields after successful submission
      setEmail('');
      setType('');
      setMessage('');
      setAlertTime('');
      setErrorMessage('Emergency added successfully');
      console.log('Emergency added successfully');
    } catch (error) {
      setErrorMessage('Error adding emergency: ' + error.message);
      console.error('Error adding emergency:', error);
    }
  };

  return (
    <div className="emergency-container">
      <h2>Add New Emergency</h2>
      <form className="emergency-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Confirm Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            <option value="Chest Pain">Chest Pain</option>
            <option value="Choking">Choking</option>
            <option value="Stroke">Stroke</option>
            <option value="Heavy Bleeding">Heavy Bleeding</option>
            <option value="Severe Head Injury">Severe Head Injury</option>
          </select>
        </div>
        <div className="form-row">
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Alert Time:</label>
          <input type="datetime-local" value={alertTime} onChange={(e) => setAlertTime(e.target.value)} required />
        </div>
        <button type="submit">Add Emergency</button>
        {errorMessage && <p className={errorMessage.startsWith('Error') ? 'error-message' : 'success-message'}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Emergency;
