import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Import components
import CreateVitals from './CreateVitals';
import ListVisits from './ListVisits';
import SendMotivationalTips from './SendMotivationalTips';
import ListEmergencies from './ListEmergencies';
import PatientSearch from './PatientSearch';

// Create Apollo Client instances for each service
const visitClient = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  cache: new InMemoryCache()
});

const nurseClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const patientClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
});

const NursePage = ({ setToken }) => {
  const [showAddVisitForm, setShowAddVisitForm] = useState(false);
  const [showSendMotivationForm, setShowSendMotivationForm] = useState(false);
  const [showListVisits, setShowListVisits] = useState(false);
  const [showListEmergencies, setShowListEmergencies] = useState(false);
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  const handleButtonClick = (option) => {
    setShowAddVisitForm(option === 'addVisit');
    setShowSendMotivationForm(option === 'sendMotivation');
    setShowListVisits(option === 'listVisits');
    setShowListEmergencies(option === 'listEmergencies');
    setShowPatientSearch(option === 'patientSearch');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Nurse Page</h1>
      <p>Welcome to the Nurse Page. Here you can access patient-specific features.</p>
      <div className="d-flex flex-wrap justify-content-center mb-4">
        <button className="btn btn-primary mr-2 mb-2" onClick={() => handleButtonClick('addVisit')}>Add Visit</button>
        <button className="btn btn-primary mr-2 mb-2" onClick={() => handleButtonClick('listVisits')}>Previous Clinics Info</button>
        <button className="btn btn-primary mr-2 mb-2" onClick={() => handleButtonClick('sendMotivation')}>Send Daily Motivation</button>
        <button className="btn btn-primary mr-2 mb-2" onClick={() => handleButtonClick('listEmergencies')}>List Emergencies</button>
        <button className="btn btn-primary mb-2" onClick={() => handleButtonClick('patientSearch')}>Patient Search</button>
        <LogoutButton setToken={setToken} />
      </div>
      {/* Render components based on state */}
      {showAddVisitForm && (
        <ApolloProvider client={visitClient}>
          <CreateVitals />
        </ApolloProvider>
      )}
      {showSendMotivationForm && (
        <ApolloProvider client={nurseClient}>
          <SendMotivationalTips />
        </ApolloProvider>
      )}
      {showListVisits && (
        <ApolloProvider client={visitClient}>
          <ListVisits />
        </ApolloProvider>
      )}
      {showListEmergencies && (
        <ApolloProvider client={patientClient}>
          <ListEmergencies />
        </ApolloProvider>
      )}
      {showPatientSearch && (
        <ApolloProvider client={patientClient}>
          <PatientSearch />
        </ApolloProvider>
      )}
    </div>
  );
};

const LogoutButton = ({ setToken }) => {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <button className="btn btn-danger ml-2 mb-2" onClick={handleLogout}>Logout</button>
  );
};

export default NursePage;
