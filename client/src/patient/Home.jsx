import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DailyTips from './DailyTips';
import Emergency from './Emergency'; // Import the Emergency component
import SymptomsCheck from './SymptomsCheck';

const nurseClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const patientClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache()
});

const PatientPage = ({ setToken }) => {
  const [showDailyTips, setShowDailyTips] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false); // State to control the visibility of the Emergency component
  const [showSymtomsChecklist, setShowSymptomsCheckList] = useState(false);

  const handleEmergencyButtonClick = () => {
    setShowEmergency(true); // Show Emergency component when Emergency Alert button is clicked
  };

  const handleDailyTipsButtonClick = () => {
    setShowDailyTips(true);
  };

  const handleSymptomsCheckListClick = () => {
    setShowSymptomsCheckList(true); //shows symtoms checklist when checklist button is clicked
  }

  const LogoutButton = ({ setToken }) => {
    const handleLogout = () => {
      setToken(null);
    };

    return (
      <button onClick={handleLogout}>Logout</button>
    );
  };

  return (
    <div className="patient-page">
      <h1>Patient Page</h1>
      <p>Welcome to the Patient Page. Here you can access patient-specific features.</p>
      <div className="button-container">
        <button onClick={handleEmergencyButtonClick}>Create emergency alert</button>
        <button onClick={handleDailyTipsButtonClick}>Daily Tips</button>
        <button>Fitness games page</button>
        <button>Enter daily information</button>
        <button>{handleSymptomsCheckListClick}Checklist of common signs and symptoms</button>
        <LogoutButton setToken={setToken} />
      </div>
      {showDailyTips && (
        <ApolloProvider client={nurseClient}>
          <DailyTips />
        </ApolloProvider>
      )}
      {showEmergency && (
        <ApolloProvider client={patientClient}>
          <Emergency />
        </ApolloProvider>
      )}
      {showSymtomsChecklist && (
        <ApolloProvider client={patientClient}>
          <SymptomsCheck />
        </ApolloProvider>
      )}
    </div>
  );
};

export default PatientPage;
