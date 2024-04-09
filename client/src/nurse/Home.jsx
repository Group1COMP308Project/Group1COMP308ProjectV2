import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'; // Import ApolloClient and related modules

// Import AddVisitForm component
import CreateVitals from './CreateVitals';
import ListVisits from './ListVisits'; // Import the ListVisits component

// Create an Apollo Client instance for the patient service
const patientClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql', // Patient service URL
  cache: new InMemoryCache()
});

const NursePage = ({ setToken }) => {
  const [showAddVisitForm, setShowAddVisitForm] = useState(false); // State to control the visibility of the AddVisitForm

  const handleButton1Click = () => {
    // Handle button 1 click
    console.log("Button 1 clicked");
    setShowAddVisitForm(true); // Show AddVisitForm when Button 1 is clicked
  };

  const handleButton2Click = () => {
    // Handle button 2 click
    console.log("Button 2 clicked");
    setShowAddVisitForm(false); // Set showAddVisitForm to false to hide AddVisitForm
  };

  const handleButton3Click = () => {
    // Handle button 3 click
    console.log("Button 3 clicked");
  };

  const handleButton4Click = () => {
    // Handle button 4 click
    console.log("Button 4 clicked");
  };

  return (
    <div className="nurse-page">
      <ApolloProvider client={patientClient}> {/* Provide the Apollo client to child components */}
        <h1>Nurse Page</h1>
        <p>Welcome to the Nurse Page. Here you can access patient-specific features.</p>
        <div className="button-container">
          <button onClick={handleButton1Click}>Add Visit</button>
          <button onClick={handleButton2Click}>Previous Clinics Info</button>
          <button onClick={handleButton3Click}>Send Daily Motivation</button>
          <button onClick={handleButton4Click}>Intelligence</button>
          <LogoutButton setToken={setToken} />
        </div>
        {showAddVisitForm ? <CreateVitals /> : <ListVisits />} {/* Conditionally render CreateVitals or ListVisits component based on showAddVisitForm state */}
      </ApolloProvider>
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

export default NursePage;
