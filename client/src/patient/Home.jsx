import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import ApolloClient and related modules
import AddVisitForm from './CreateFitnessActivity'; // Import the component to add a visit
import DailyTips from './DailyTips'; // Import the DailyTips component

//import fitness page

// Create an Apollo Client instance for the nurse service
const nurseClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Nurse service URL
  cache: new InMemoryCache()
});

const PatientPage = ({ setToken }) => {
  const [showAddVisitForm, setShowAddVisitForm] = useState(false); // State to control the visibility of the AddVisitForm
  const [showDailyTips, setShowDailyTips] = useState(false); // State to control the visibility of the DailyTips component

  const handleButton1Click = () => {
    // Handle button 1 click
    console.log("Button 1 clicked");
    setShowAddVisitForm(true); // Show AddVisitForm when Button 1 is clicked
  };

  const handleButton2Click = () => {
    // Handle button 2 click
    console.log("Button 2 clicked");
  };

  const handleButton3Click = () => {
    // Handle button 3 click
    console.log("Button 3 clicked");
  };

  const handleButton4Click = () => {
    // Handle button 4 click
    console.log("Button 4 clicked");
  };

  const handleDailyTipsButtonClick = () => {
    // Handle Daily Tips button click
    console.log("DailyTipsButton clicked");
    setShowDailyTips(true); // Show DailyTips component when Daily Tips button is clicked
  };

  return (
    <div className="patient-page">
      <h1>Patient Page</h1>
      <p>Welcome to the Patient Page. Here you can access patient-specific features.</p>
      <div className="button-container">
        <button onClick={handleButton1Click}>Create and send an emergency alert</button>
        <button onClick={handleButton2Click}>Fitness games page</button>
        <button onClick={handleButton3Click}>Enter daily information</button>
        <button onClick={handleButton4Click}>Checklist of common signs and symptoms</button>
        <button onClick={handleDailyTipsButtonClick}>Daily Tips</button>
        <LogoutButton setToken={setToken} />
      </div>
      {showAddVisitForm && <AddVisitForm />} {/* Conditionally render AddVisitForm */}
      {showDailyTips && ( // Conditionally render DailyTips component
        <ApolloProvider client={nurseClient}>
          <DailyTips />
        </ApolloProvider>
      )}
    </div>
  );
};

const LogoutButton = ({ setToken }) => {
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear token)
    setToken(null);
    // Handle successful logout (e.g., redirect user)
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default PatientPage;
