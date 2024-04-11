


import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_SYMPTOM = gql`
  mutation AddSymptom($input: SymptomInput!) {
    addSymptom(input: $input) {
      id
      patient {
        id
        email
      }
      symptoms
      createdAt
    }
  }
`;

const SymptomsCheck = () => {
  const [patientId, setPatientId] = useState('');
  const [addSymptom] = useMutation(ADD_SYMPTOM);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

 const handleCheckboxChange = (e) => {
  const symptom = e.target.value;
  const isChecked = e.target.checked;

  setSelectedSymptoms(prevSelectedSymptoms => {
    if (isChecked) {
      // Add the symptom to the array if checked
      return [...prevSelectedSymptoms, symptom];
    } else {
      // Remove the symptom from the array if unchecked
      return prevSelectedSymptoms.filter(item => item !== symptom);
    }
  });
};





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!patientId) {
        setErrorMessage('Please provide a valid Patient ID.');
        return;
      }
  
      if (selectedSymptoms.length === 0) {
        setErrorMessage('Please select at least one symptom.');
        return;
      }
  
      await addSymptom({
        variables: {
          input: {
            patientId,
            symptoms: selectedSymptoms,
          },
        },
      });
      
      setErrorMessage('Symptoms added successfully');
    } catch (error) {
      console.error('Error adding symptoms:', error);
      setErrorMessage('Failed to add symptoms. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Symptoms Checklist</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient ID:
          <input 
            type="text" 
            value={patientId} 
            onChange={(e) => setPatientId(e.target.value)} 
            placeholder="Enter Patient ID" 
          />
        </label>
        <br />
          <input type="checkbox" value="Fever" onChange={handleCheckboxChange} /> Fever
          <br />
          <input type="checkbox" value="Cough" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="ShortnessOfBreath" onChange={handleCheckboxChange} /> Shortness of breath
          <br />
          <input type="checkbox" value="Fatigue" onChange={handleCheckboxChange} /> Fatigue
          <br />
          <input type="checkbox" value="MuscleOrBodyAches" onChange={handleCheckboxChange} /> Muscle or body aches
          <br />
          <input type="checkbox" value="LossOfTasteOrSmell" onChange={handleCheckboxChange} /> Loss of taste or smell
          <br />
          <input type="checkbox" value="SoreThroat" onChange={handleCheckboxChange} /> Sore throat
          <br />
          <input type="checkbox" value="CongestionOrRunnyNose" onChange={handleCheckboxChange} /> Congestion or runny nose
          <br />
          <input type="checkbox" value="NauseaOrVomiting" onChange={handleCheckboxChange} /> Nausea or vomiting
          <br />
          <input type="checkbox" value="Diarrhea" onChange={handleCheckboxChange} /> Diarrhea
          <br />
        <button type="submit">Add Symptoms</button>
      </form>
      { errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SymptomsCheck;
