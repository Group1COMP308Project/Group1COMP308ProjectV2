import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import ApolloClient and related modules

// Import AddVisitForm component
import CreateVitals from './CreateVitals';
import ListVisits from './ListVisits'; // Import the ListVisits component
import SendMotivationalTips from './SendMotivationalTips'; // Import the SendMotivationalTips component

// Create an Apollo Client instance for the patient service
const visitClient = new ApolloClient({
  uri: 'http://localhost:4002/graphql', // Patient service URL
  cache: new InMemoryCache()
});

const nurseClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Nurse service URL
  cache: new InMemoryCache()
});

const NursePage = ({ setToken }) => {
  const [showAddVisitForm, setShowAddVisitForm] = useState(false); // State to control the visibility of the AddVisitForm
  const [showSendMotivationForm, setShowSendMotivationForm] = useState(false); // State to control the visibility of the SendMotivationTips form

  const AddVisitButton = () => {
    setShowAddVisitForm(true); // Show AddVisitForm when Button 1 is clicked
    setShowSendMotivationForm(false); // Hide SendMotivationTips form
  };

  const ListVisitButton = () => {
    setShowAddVisitForm(false); // Hide AddVisitForm
    setShowSendMotivationForm(false); // Hide SendMotivationTips form
  };

  const SendMotivationButton = () => {
    setShowAddVisitForm(false); // Hide AddVisitForm
    setShowSendMotivationForm(true); // Show SendMotivationTips form
  };

  const handleButton4Click = () => {
    setShowAddVisitForm(false); // Hide AddVisitForm
    setShowSendMotivationForm(false); // Hide SendMotivationTips form
  };

  return (
    <div className="nurse-page">
      <ApolloProvider client={visitClient}> {/* Provide the Apollo client to child components */}
        <h1>Nurse Page</h1>
        <p>Welcome to the Nurse Page. Here you can access patient-specific features.</p>
        <div className="button-container">
          <button onClick={AddVisitButton}>Add Visit</button>
          <button onClick={ListVisitButton}>Previous Clinics Info</button>
          <button onClick={SendMotivationButton}>Send Daily Motivation</button>
          <button onClick={handleButton4Click}>Intelligence</button>
          <LogoutButton setToken={setToken} />
        </div>
        {showAddVisitForm ? <CreateVitals /> : null} {/* Conditionally render CreateVitals component based on showAddVisitForm state */}
        {showSendMotivationForm ? (
          <ApolloProvider client={nurseClient}>
            <SendMotivationalTips />
          </ApolloProvider>
        ) : null} {/* Conditionally render SendMotivationalTips component based on showSendMotivationForm state */}
        {!showAddVisitForm && !showSendMotivationForm ? <ListVisits /> : null} {/* Conditionally render ListVisits component */}
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
