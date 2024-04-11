import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './styles/list.css';

const ALL_EMERGENCIES_QUERY = gql`
  query Query {
    allEmergencies {
      id
      type
      message
      alertTime
      patient{
        email
      }
    }
  }
`;

const ListEmergencies = () => {
  const [checkedEmergencies, setCheckedEmergencies] = useState([]);

  const { loading, error, data, refetch } = useQuery(ALL_EMERGENCIES_QUERY);

  const handleCheckboxChange = (emergencyId) => {
    const isChecked = checkedEmergencies.includes(emergencyId);

    if (isChecked) {
      setCheckedEmergencies(checkedEmergencies.filter((id) => id !== emergencyId));
    } else {
      setCheckedEmergencies([...checkedEmergencies, emergencyId]);
    }
  };

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const handleRefresh = () => {
    refetch(); // Trigger data refetch
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort emergencies by most recent alertTime
  const sortedEmergencies = [...data.allEmergencies].sort((a, b) => b.alertTime - a.alertTime);

  return (
    <div className="visit-list-container">
      <h2>All Emergencies</h2>
      <button onClick={handleRefresh}>Refresh</button> {/* Refresh button */}
      {sortedEmergencies.map((emergency) => (
        <div key={emergency.id} className="visit-item">
          <div className="visit-details">
            <div>
              <div><strong>Type:</strong></div>
              <div>{emergency.type}</div>
            </div>
            <div>
              <div><strong>Message:</strong></div>
              <div>{emergency.message}</div>
            </div>
            <div>
              <div><strong>Alert Time:</strong></div>
              <div>{formatTimestampToDate(emergency.alertTime)}</div>
            </div>
            <div>
              <div><strong>Patient Email:</strong></div>
              <div>{emergency.patient.email}</div>
            </div>
            <div>
              <div><strong>Check if handled</strong></div>
              <input
                type="checkbox"
                checked={checkedEmergencies.includes(emergency.id)}
                onChange={() => handleCheckboxChange(emergency.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListEmergencies;
