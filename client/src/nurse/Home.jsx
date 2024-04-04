// Import React library
import React from 'react';

// NursePage component definition
const NursePage = ({ setToken }) => {
  
  // Function to handle button 1 click
  const handleButton1Click = () => {
    console.log("Button 1 clicked"); // Log button 1 click
  };

  // Function to handle button 2 click
  const handleButton2Click = () => {
    console.log("Button 2 clicked"); // Log button 2 click
  };

  // Function to handle button 3 click
  const handleButton3Click = () => {
    console.log("Button 3 clicked"); // Log button 3 click
  };

  // Function to handle button 4 click
  const handleButton4Click = () => {
    console.log("Button 4 clicked"); // Log button 4 click
  };

  // Return JSX for NursePage component
  return (
    <div className="nurse-page">
      <h1>Nurse Page</h1>
      <p>Welcome to the Nurse Page. Here you can access nurse-specific features.</p>
      <div className="button-container">
        <button onClick={handleButton1Click}>Enter vital signs</button>
        <button onClick={handleButton2Click}>Access information</button>
        <button onClick={handleButton3Click}>Send daily motivational tips </button>
        <button onClick={handleButton4Click}>Intelligent use of symptoms </button>
        <LogoutButton setToken={setToken} /> {/* Render LogoutButton component */}
      </div>
    </div>
  );
};

// LogoutButton component definition
const LogoutButton = ({ setToken }) => {
  // Function to handle logout button click
  const handleLogout = () => { 
    setToken(null); // Set token to null on logout
  };

  // Return JSX for LogoutButton component
  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

// Export NursePage component
export default NursePage;
