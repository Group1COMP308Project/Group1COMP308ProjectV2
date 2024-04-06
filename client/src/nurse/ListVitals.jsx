import React from 'react';
import { useQuery, gql } from '@apollo/client';




const GET_VITAL_SIGNS = gql`
  query GetVitalSigns {
    vitalSigns {
      id
      bodytemperature
      heartrate
      bloodpressure
      respitoryrate
    }
  }
`;

function VitalSignsList() {
  const { loading, error, data } = useQuery(GET_VITAL_SIGNS);

  if (loading) return <p>Loading Vitals...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Vital Signs:</h3>
      <ul>
        {data.vitalSigns.map(({ id,bodytemp, bodytemperature,hrate, heartrate,bpressure,bloodpressure,respt,respitoryrate }) => (
          <li key={id}>
            {bodytemp}: {bodytemperature}
            {hrate}: {heartrate}
            {bpressure}:{bloodpressure}
            {respt}:{respitoryrate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VitalSignsList;
