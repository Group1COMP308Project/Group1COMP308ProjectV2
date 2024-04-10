import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import ApolloClient and related modules

// Import AddVisitForm component
import CreateVitals from './CreateVitals';
import ListVisits from './ListVisits'; // Import the ListVisits component
import SendMotivationalTips from './SendMotivationalTips'; // Import the SendMotivationalTips component
import ListEmergencies from './ListEmergencies'; // Import the ListEmergencies component

// Create an Apollo Client instance for the patient service
const visitClient = new ApolloClient({
  uri: 'http://localhost:4002/graphql', // Patient service URL
  cache: new InMemoryCache()
});

const nurseClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Nurse service URL
  cache: new InMemoryCache()
});

const patientClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql', // Patient service URL
  cache: new InMemoryCache()
});

const NursePage = ({ setToken }) => {
  const [showAddVisitForm, setShowAddVisitForm] = useState(false);
  const [showSendMotivationForm, setShowSendMotivationForm] = useState(false);
  const [showListVisits, setShowListVisits] = useState(false);
  const [showListEmergencies, setShowListEmergencies] = useState(false);

  const AddVisitButton = () => {
    setShowAddVisitForm(true);
    setShowSendMotivationForm(false);
    setShowListVisits(false);
    setShowListEmergencies(false);
  };

  const ListVisitButton = () => {
    setShowAddVisitForm(false);
    setShowSendMotivationForm(false);
    setShowListVisits(true);
    setShowListEmergencies(false);
  };

  const SendMotivationButton = () => {
    setShowAddVisitForm(false);
    setShowSendMotivationForm(true);
    setShowListVisits(false);
    setShowListEmergencies(false);
  };

  const EmergencyButton = () => {
    setShowAddVisitForm(false);
    setShowSendMotivationForm(false);
    setShowListVisits(false);
    setShowListEmergencies(true);
  };

  const handleButton4Click = () => {
    setShowAddVisitForm(false);
    setShowSendMotivationForm(false);
    setShowListVisits(false);
    setShowListEmergencies(false);
  };

  return (
    <div className="nurse-page">
      <ApolloProvider client={visitClient}>
        <h1>Nurse Page</h1>
        <p>Welcome to the Nurse Page. Here you can access patient-specific features.</p>
        <div className="button-container">
          <button onClick={AddVisitButton}>Add Visit</button>
          <button onClick={ListVisitButton}>Previous Clinics Info</button>
          <button onClick={SendMotivationButton}>Send Daily Motivation</button>
          <button onClick={EmergencyButton}>List Emergencies</button>
          <button onClick={handleButton4Click}>Intelligence</button>
          <LogoutButton setToken={setToken} />
        </div>
        {/* Render components based on state */}
        {showAddVisitForm && <CreateVitals />}
        {showSendMotivationForm && (
          <ApolloProvider client={nurseClient}>
            <SendMotivationalTips />
          </ApolloProvider>
        )}
        {showListVisits && <ListVisits />}
        {showListEmergencies && (
          <ApolloProvider client={patientClient}>
            <ListEmergencies />
          </ApolloProvider>
        )}
      </ApolloProvider>
    </div>
  );
};

const LogoutButton = ({ setToken }) => {
  const handleLogout = () => {
    setToken(null);
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default NursePage;
