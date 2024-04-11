import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import '../nurse/styles/addVisit.css'; // Import CSS file for component-specific styles

const ADD_DAILY_VITALS_MUTATION = gql`
  mutation AddDailyVitals($email: String!, $pulseRate: Float!, $bloodPressure: String!, $weight: Float!, $temperature: Float!, $respiratoryRate: Float!) {
    addDailyVitals(email: $email, pulseRate: $pulseRate, bloodPressure: $bloodPressure, weight: $weight, temperature: $temperature, respiratoryRate: $respiratoryRate) {
      id
      pulseRate
      bloodPressure
      weight
      temperature
      respiratoryRate
    }
  }
`;

const AddDailyVitalsForm = () => {
  // State variables to store form input values and messages
  const [email, setEmail] = useState('');
  const [pulseRate, setPulseRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [respiratoryRate, setRespiratoryRate] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Mutation hook for adding new daily vitals
  const [addDailyVitals, { loading }] = useMutation(ADD_DAILY_VITALS_MUTATION);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form values:', { email, pulseRate, bloodPressure, weight, temperature, respiratoryRate });

    try {
      // Execute the addDailyVitals mutation with form data
      await addDailyVitals({ variables: { email, pulseRate, bloodPressure, weight, temperature, respiratoryRate } });
      // Reset form fields after successful submission
      setEmail('');
      setPulseRate(0);
      setBloodPressure('');
      setWeight(0);
      setTemperature(0);
      setRespiratoryRate(0);
      // Set success message
      setSuccessMessage('Daily vitals added successfully.');
      // Clear error message
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding daily vitals:', error);
      // Set error message
      setErrorMessage('Failed to add daily vitals. Please try again.');
      // Clear success message
      setSuccessMessage('');
    }
  };

  return (
    <div className="add-visit-container">
      <h2>Add Daily Vitals</h2>
      <form className="visit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Pulse Rate:</label>
          <input type="number" value={pulseRate} onChange={(e) => setPulseRate(parseFloat(e.target.value))} required />
        </div>
        <div className="form-row">
          <label>Blood Pressure:</label>
          <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Weight:</label>
          <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} required />
        </div>
        <div className="form-row">
          <label>Temperature:</label>
          <input type="number" value={temperature} onChange={(e) => setTemperature(parseFloat(e.target.value))} required />
        </div>
        <div className="form-row">
          <label>Respiratory Rate:</label>
          <input type="number" value={respiratoryRate} onChange={(e) => setRespiratoryRate(parseFloat(e.target.value))} required />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default AddDailyVitalsForm;
