import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './styles/list.css';

// Define the query to fetch all patients
const ALL_PATIENTS_QUERY = gql`
  query {
    allPatients {
      id
      firstName
      lastName
      email
    }
  }
`;

// Define the query to fetch daily vitals
const DAILY_VITALS_QUERY = gql`
  query dailyVitals {
    allDailyVitals {
      id
      pulseRate
      bloodPressure
      temperature
      weight
      respiratoryRate
      date
      patient {
        email
      }
    }
  }
`;

const PatientSearch = () => {
  const { loading: patientsLoading, error: patientsError, data: patientsData } = useQuery(ALL_PATIENTS_QUERY);
  const { loading: vitalsLoading, error: vitalsError, data: vitalsData } = useQuery(DAILY_VITALS_QUERY);
  const [filterEmail, setFilterEmail] = useState('');

  if (patientsLoading || vitalsLoading) return <p>Loading...</p>;
  if (patientsError || vitalsError) return <p>Error: {patientsError ? patientsError.message : vitalsError.message}</p>;

  const filteredPatients = patientsData.allPatients.filter(patient =>
    patient.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  const filteredVitals = vitalsData.allDailyVitals.filter(vital =>
    vital.patient.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="visit-list-container">
        <h2>Search for a patient</h2>
        <input
          type="text"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
          placeholder="Filter email"
        />
        <ul className="visit-list">
          {filteredPatients.map(patient => (
            <li key={patient.id} className="visit-item">
              <div className="visit-details">
                <div><strong>Name: </strong> {patient.firstName} {patient.lastName}</div>
                <div><strong>Email: </strong> {patient.email}</div>
                <div><strong>Id: </strong> {patient.id}</div>
              </div>   
            </li>
          ))}
        </ul>
      </div>

      <div className="visit-list-container">
        <h2>Daily Vitals</h2>
        
        <ul className="visit-list">
          {filteredVitals.map(vital => (
            <li key={vital.id} className="visit-item">
              <div className="visit-details">
                <div><strong>Date:</strong> {formatTimestampToDate(vital.date)}</div>
                <div><strong>Pulse Rate:</strong> {vital.pulseRate}</div>
                <div><strong>Blood Pressure:</strong> {vital.bloodPressure}</div>
                <div><strong>Temperature:</strong> {vital.temperature}</div>
                <div><strong>Weight:</strong> {vital.weight}</div>
                <div><strong>Respiratory Rate:</strong> {vital.respiratoryRate}</div>
                <div><strong>Patient Email:</strong> {vital.patient.email}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="visit-list-container">
        <h2>Emergencies</h2>
        <PatientEmergenciesList filterEmail={filterEmail} />
      </div>
    </div>
  );
};

// Define the query to fetch emergencies associated with all patients
const GET_PATIENT_EMERGENCIES_QUERY = gql`
  query Query {
    allEmergencies {
      id
      type
      message
      alertTime
      patient {
        email
      }
    }
  }
`;

const PatientEmergenciesList = ({ filterEmail }) => {
  const { loading, error, data } = useQuery(GET_PATIENT_EMERGENCIES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredEmergencies = data.allEmergencies.filter(emergency =>
    emergency.patient.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  return (
    <div className="visit-list-container">
      <ul className="visit-list">
        {filteredEmergencies.map(emergency => (
          <li key={emergency.id} className="visit-item">
            <div className="visit-details">
              <div><strong>Type:</strong> {emergency.type}</div>
              <div><strong>Message:</strong> {emergency.message}</div>
              <div><strong>Alert Time: </strong> {formatTimestampToDate(emergency.alertTime)}</div>
              <div><strong>Patient Email:</strong> {emergency.patient.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSearch;
