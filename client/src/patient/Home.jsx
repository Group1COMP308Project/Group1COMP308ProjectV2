import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DailyTips from './DailyTips';
import Emergency from './Emergency';
import SymptomsCheck from './SymptomsCheck';
import DailyVitals from './DailyVitals';


// Create Apollo Client instances for each service
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
  const [showEmergency, setShowEmergency] = useState(false);
  const [showSymptomsChecklist, setShowSymptomsChecklist] = useState(false);
  const [showDailyVitals, setShowDailyVitals] = useState(false);


  const handleEmergencyButtonClick = () => {
    setShowEmergency(true);
    setShowDailyTips(false);
    setShowSymptomsChecklist(false);
    setShowDailyVitals(false);
  };

  const handleDailyTipsButtonClick = () => {
    setShowDailyTips(true);
    setShowEmergency(false);
    setShowSymptomsChecklist(false);
    setShowDailyVitals(false);
  };

  const handleSymptomsCheckListClick = () => {
    setShowSymptomsChecklist(true);
    setShowEmergency(false);
    setShowDailyTips(false);
    setShowDailyVitals(false);
  };

  const handleDailyVitalsButtonClick = () => {
    setShowDailyVitals(true);
    setShowEmergency(false);
    setShowDailyTips(false);
    setShowSymptomsChecklist(false);
  };

  const LogoutButton = ({ setToken }) => {
    const handleLogout = () => {
      setToken(null);
    };

    return (
      <button className="btn btn-danger ml-2 mb-2" onClick={handleLogout}>Logout</button>
    );
  };

  return (
    <div className="container mt-5">
      <h1>Patient Page</h1>
      <p>Welcome to the Patient Page. Here you can access patient-specific features.</p>
      <div className="d-flex flex-wrap justify-content-center mb-6">
        <button className="btn btn-primary mr-2 mb-2" onClick={handleEmergencyButtonClick}>Create emergency alert</button>
        <button className="btn btn-primary mr-2 mb-2" onClick={handleDailyTipsButtonClick}>Daily Tips</button>
        <button className="btn btn-primary mr-2 mb-2">Fitness games page</button>
        <button className="btn btn-primary mr-2 mb-2" onClick={handleDailyVitalsButtonClick}>Enter daily information</button>
        <button className="btn btn-primary mb-2" onClick={handleSymptomsCheckListClick}>Checklist of common signs and symptoms</button>
    
        <LogoutButton setToken={setToken} />
      </div>
      {showDailyTips && (
        <ApolloProvider client={nurseClient}>
          <DailyTips />
        </ApolloProvider>
      )}
      {showEmergency && <Emergency />}
      {showSymptomsChecklist && <SymptomsCheck />}
      {showDailyVitals && (
        <ApolloProvider client={patientClient}>
          <DailyVitals />
        </ApolloProvider>
      )}
    </div>
  );
};

export default PatientPage;
