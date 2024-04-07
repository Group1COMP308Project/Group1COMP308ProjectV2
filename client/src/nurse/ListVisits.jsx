import React from 'react';
import { useQuery, gql } from '@apollo/client';




const GET_VISITS = gql`
  query GetVitalSigns {
    nurse {
    id
    firstname
    lastname
    email
}
    patient {
    id
    bodytemperature
    heartrate
    bloodpressure
    respitoryrate

    }
  }
`;

function FetchVisits() {
  const { loading, error, data } = useQuery(GET_VISITS);

  if (loading) return <p>Loading Vitals...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h3>Clinical Visits:</h3>
      <ul>
        {data.GetVitalSigns.map(({idnurse,firstname,
        fname,lname,lastname,mail,email,_id, id,bodytemp, bodytemperature,hrate, heartrate,bpressure,bloodpressure,respt,respitoryrate }) => (
          <li key={idnurse}>
            {firstname}:{fname}
            {lastname}:{lname}
            {email}:{mail}
            {id}:{_id}
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

export default FetchVisits;
