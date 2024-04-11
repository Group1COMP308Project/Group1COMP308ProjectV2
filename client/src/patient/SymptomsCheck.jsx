import React from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_SYMPTOMS_CHECKLIST = gql`
  mutation CreateSymptomsChecklist($input: SymptomsChecklistInput!) {
    createSymptomsChecklist(input: $input) {
      id
      patient {
        email
      }
      symptoms
      createdAt
    }
  }
`;

const SymptomsCheck = ({ patientId }) => {
  const [createSymptomsChecklist] = useMutation(CREATE_SYMPTOMS_CHECKLIST);

  const handleCheckboxChange = async (e) => {
    const symptom = e.target.value;
    try {
      const { data } = await createSymptomsChecklist({
        variables: {
          input: {
            patientId,
            symptoms: [symptom],
          },
        },
      });
      console.log('Symptoms checklist created:', data.createSymptomsChecklist);
    } catch (error) {
      console.error('Error creating symptoms checklist:', error);
    }
  };

  return (
    <div>
      <h2>Symptoms Checklist</h2>
      <form>
        <label>
          Select symptoms (check all that apply):
          <br />
          <input type="checkbox" value="Fever" onChange={handleCheckboxChange} /> Fever
          <br />
          <input type="checkbox" value="Cough" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Shortness of Breath" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Fatigue" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Muscle or Body Aches" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Loss of Taste or Smell" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Sore Throat" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Congestion or Runny Nose" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Nausea and/or Vomiting" onChange={handleCheckboxChange} /> Cough
          <br />
          <input type="checkbox" value="Diarrhea" onChange={handleCheckboxChange} /> Cough
          <br />
         
        </label>
      </form>
    </div>
  );
};

export default SymptomsCheck;
