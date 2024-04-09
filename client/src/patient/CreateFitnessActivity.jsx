import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_VISIT_MUTATION = gql`
  mutation AddVisit($email: String!, $bodyTemperature: Float!, $heartRate: Float!, $bloodPressure: String!, $respiratoryRate: Float!) {
    addVisit(email: $email, bodyTemperature: $bodyTemperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

const AddVisitForm = () => {
  // State variables to store form input values
  const [email, setEmail] = useState('');
  const [bodyTemperature, setBodyTemperature] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState(0);

  // Mutation hook for adding a new visit
  const [addVisit, { loading, error }] = useMutation(ADD_VISIT_MUTATION);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Execute the addVisit mutation with form data
      await addVisit({ variables: { email, bodyTemperature, heartRate, bloodPressure, respiratoryRate } });
      // Reset form fields after successful submission
      setEmail('');
      setBodyTemperature(0);
      setHeartRate(0);
      setBloodPressure('');
      setRespiratoryRate(0);
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  return (
    <div>
      <h2>Add New Visit</h2>
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Body Temperature:
          <input type="number" value={bodyTemperature} onChange={(e) => setBodyTemperature(parseFloat(e.target.value))} required />
        </label>
        <label>
          Heart Rate:
          <input type="number" value={heartRate} onChange={(e) => setHeartRate(parseFloat(e.target.value))} required />
        </label>
        <label>
          Blood Pressure:
          <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
        </label>
        <label>
          Respiratory Rate:
          <input type="number" value={respiratoryRate} onChange={(e) => setRespiratoryRate(parseFloat(e.target.value))} required />
        </label>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
};

export default AddVisitForm;
