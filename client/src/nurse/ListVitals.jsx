import React from 'react';
import { useQuery, gql } from '@apollo/client';



bodytemperature
heartRate
bloodpressure
respitatoryrate



const GET_VITAL_SIGNS = gql`
  query GetVitalSigns {
    vitalSigns {
      id
      type
      value
    }
  }
`;

function VitalSignsList() {
  const { loading, error, data } = useQuery(GET_VITAL_SIGNS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Vital Signs:</h3>
      <ul>
        {data.vitalSigns.map(({ id, type, value }) => (
          <li key={id}>
            {type}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VitalSignsList;