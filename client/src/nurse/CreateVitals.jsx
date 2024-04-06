import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';

const ADD_VITAL_SIGN = gql`
  mutation AddVitalSign($Id: Float!,$bodytemperature:Float!,
$heartRate: Int!,$bloodpressure:Float!,$respiratoryrate: Float!) {
    addVitalSign(bodytemperature: $bodytemperature,
    heartRate: $heartRate,bloodpressure: $bloodpressure,respitoryrate:$respiratoryrate) {
      id
      bodytemperature
      heartRate
      bloodpressure
      respitatoryrate
     
    }
  }
`;

const VitalSignsForm = () => {
  const [bodytemperature, setBodytemperature] = useState('');

  const [addVitalSign] = useMutation(ADD_VITAL_SIGN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVitalSign({ variables: { value: parseFloat(value) } });
      alert('Vital sign added successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vital Sign</h2>
      <input type="number" placeholder="Value" value={bodytemperature} onChange={(e) => setBodytemperature(e.target.value)} />
      <button type="submit">Add Vital Sign</button>
    </form>
  );
};

export default VitalSignsForm;
