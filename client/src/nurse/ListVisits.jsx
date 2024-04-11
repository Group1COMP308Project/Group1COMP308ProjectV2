import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './styles/list.css';

const ALL_VISITS_QUERY = gql`
  query {
    allVisits {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      patient 
      visitDate
    }
  }
`;

const AllVisits = () => {
  const [refresh, setRefresh] = useState(false);

  const { loading, error, data, refetch } = useQuery(ALL_VISITS_QUERY, {
    skip: refresh // Skip query on initial load, and only fetch data on refresh
  });

  const handleRefresh = () => {
    setRefresh(true);
    refetch(); // Refetch data
    setRefresh(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort visits by most recent visitDate
  const sortedVisits = [...data.allVisits].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  return (
    <div className="visit-list-container">
      <h1>All Visits</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul className="visit-list">
        {sortedVisits.map(visit => (
          <li key={visit.id} className="visit-item">
            <div className="visit-details">
              <div><strong>Visit Date: </strong> {formatTimestampToDate(visit.visitDate)}</div>
              <div><strong>Body Temperature:</strong> {visit.bodyTemperature}</div>
              <div><strong>Heart Rate:</strong> {visit.heartRate}</div>
              <div><strong>Blood Pressure:</strong> {visit.bloodPressure}</div>
              <div><strong>Respiratory Rate:</strong> {visit.respiratoryRate}</div>
              <div><strong>Patient ID:</strong> {visit.patient}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllVisits;
