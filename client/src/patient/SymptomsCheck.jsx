import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_SYMPTOMS_CHECKLIST = gql`
  mutation CreateSymptomsChecklist($input: SymptomsChecklistInput!) {
    createSymptomsChecklist(input: $input) {
      id
      patientEmail
      symptoms
    }
  }
`;

const SymptomsChecklistForm = ({ patientEmail }) => {
    const [symptoms, setSymptoms] = useState('');
    const [createSymptomsChecklist] = useMutation(CREATE_SYMPTOMS_CHECKLIST);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createSymptomsChecklist({
        variables: {
          input: {
            patientEmail,
            symptoms,
          },
        },
      });
      console.log('Symptoms checklist created:', data.createSymptomsChecklist);
      //resetting form fields after successful submission
      setSymptoms('');
    } catch (error) {
      console.error('Error creating symptoms checklist:', error);
    }
  };

  return (
    <div>
      <h2>Symptoms Checklist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Symptoms:</label>
          <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SymptomsChecklistForm;