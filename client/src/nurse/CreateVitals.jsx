import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { validateSDL } from 'graphql/validation/validate';

//Create Vitals done


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
    const [bodytemperature, setBodytemperature]= useState('');
    const [heartRate,setHeartrate] = useState('');
    const [bloodpressure,setBloodpressure] = useState('');
    const [respitatoryrate,setRespitoryrate] = useState('');
 

  const [addVitalSign] = useMutation(ADD_VITAL_SIGN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVitalSign({ 
        bodytemperature:{value: parseFloat(value)},
        heartRate: {value: parseFloat(value)},
        bloodpressure: {value: parseFloat(value)},
        respitoryrate: {value: parseFloat(value)},
        
    });
      alert('Vital signs added successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vital Sign</h2>
      <input type="number" placeholder="Enter Body Temperature" value={bodytemperature} onChange={(e) => setBodytemperature(e.target.value)} />
      <input type="number" placeholder="Enter Heart Rate" value={heartRate} onChange={(e) => setHeartrate(e.target.value)}/>
      <input type="number" placeholder="Enter Blood pressure" value={bloodpressure} onChange={(e)=> setBloodpressure(e.target.value)}/>
      <input type="number" placeholder="Enter Respitory Rate" value={respitatoryrate} onChange={(e) => setRespitoryrate(e.target.value)}/>

      <button type="submit">Add Vital Signs</button>
    </form>
  );
};

export default VitalSignsForm;
