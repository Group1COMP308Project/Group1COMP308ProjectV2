import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_VISITS_QUERY = gql`
  query {
    allVisits {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
     
    }
  }
`;

const AllVisits = () => {
  const { loading, error, data } = useQuery(ALL_VISITS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Visits</h1>
      <ul>
        {data.allVisits.map(visit => (
          <li key={visit.id}>
            <strong>Visit ID:</strong> {visit.id}<br />
            <strong>Body Temperature:</strong> {visit.bodyTemperature}<br />
            <strong>Heart Rate:</strong> {visit.heartRate}<br />
            <strong>Blood Pressure:</strong> {visit.bloodPressure}<br />
            <strong>Respiratory Rate:</strong> {visit.respiratoryRate}<br />
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllVisits;
