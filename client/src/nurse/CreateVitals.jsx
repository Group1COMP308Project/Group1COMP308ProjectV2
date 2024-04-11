import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './styles/addVisit.css'; // Import CSS file for component-specific styles

const ADD_VISIT_MUTATION = gql`
  mutation AddVisit($email: String!, $bodyTemperature: Float!, $heartRate: Float!, $bloodPressure: String!, $respiratoryRate: Float!, $visitDate: String!) {
    addVisit(email: $email, bodyTemperature: $bodyTemperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate, visitDate: $visitDate) {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

const AddVisitForm = () => {
  // State variables to store form input values and messages
  const [email, setEmail] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState(0);
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]); // Set current date as visitDate
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Mutation hook for adding a new visit
  const [addVisit, { loading }] = useMutation(ADD_VISIT_MUTATION);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form values:', { email, bodyTemperature, heartRate, bloodPressure, respiratoryRate, visitDate });

    try {
      // Execute the addVisit mutation with form data
      await addVisit({ variables: { email, bodyTemperature, heartRate, bloodPressure, respiratoryRate, visitDate } });
      // Reset form fields after successful submission
      setEmail('');
      setBodyTemperature(0);
      setHeartRate(0);
      setBloodPressure('');
      setRespiratoryRate(0);
      // Set success message
      setSuccessMessage('Visit added successfully.');
      // Clear error message
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding visit:', error);
      // Set error message
      setErrorMessage('Failed to add visit. Please try again.');
      // Clear success message
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-visit-container">
      <h2>Add New Visit</h2>
      <form className="visit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Body Temperature:</label>
          <input type="number" value={bodyTemperature} onChange={(e) => setBodyTemperature(parseFloat(e.target.value))} required />
        </div>
        <div className="form-row">
          <label>Heart Rate:</label>
          <input type="number" value={heartRate} onChange={(e) => setHeartRate(parseFloat(e.target.value))} required />
        </div>
        <div className="form-row">
          <label>Blood Pressure:</label>
          <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Respiratory Rate:</label>
          <input type="number" value={respiratoryRate} onChange={(e) => setRespiratoryRate(parseFloat(e.target.value))} required />
        </div>
        <div className="form-row">
          <label>Visit Date:</label>
          <input type="datetime-local" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} required /> {/* Use datetime-local input type */}
        </div>
        <button type="submit" disabled={loading}>Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddVisitForm;
