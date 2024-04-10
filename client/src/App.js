// Import required modules
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './globalStyles.css'; // Import the styles.css file

// Import components
import NurseSignupForm from './nurse/SignupForm';
import NurseLoginForm from './nurse/LoginForm';
import NurseLogoutButton from './nurse/Home';
import PatientSignupForm from './patient/SignupForm';
import PatientLoginForm from './patient/LoginForm';
import PatientLogoutButton from './patient/Home';

// Create an Apollo Client instance for the nurse service
const nurseClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Nurse service URL
  cache: new InMemoryCache()
});

// Create an Apollo Client instance for the patient service
const patientClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql', // Patient service URL
  cache: new InMemoryCache()
});

// App component definition
function App() {
  // State variables for user type and token
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(null);

  // Determine if the user is logged in
  const isLoggedIn = token !== null;

  // Render JSX for App component
  return (
    <div className="App">
      {!isLoggedIn && (
        <div className="user-selection">
          <h1>Welcome to Our Healthcare Portal</h1>
          <p>Please select your role:</p>
          <div className="user-type-buttons">
            <button className="patient-button" onClick={() => setUserType('nurse')}>I'm a Nurse</button>
            <button className="nurse-button" onClick={() => setUserType('patient')}>I'm a Patient</button>
          </div>
        </div>
      )}

      {userType === 'nurse' && (
        <div className="user-form">
          <ApolloProvider client={nurseClient}>
            {!token ? <NurseLoginForm setToken={setToken} /> : <NurseLogoutButton setToken={setToken} />}
            {!token && <NurseSignupForm />}
          </ApolloProvider>
        </div>
      )}

      {userType === 'patient' && (
        <div className="user-form">
          <ApolloProvider client={patientClient}>
            {!token ? <PatientLoginForm setToken={setToken} /> : <PatientLogoutButton setToken={setToken} />}
            {!token && <PatientSignupForm />}
          </ApolloProvider>
        </div>
      )}
    </div>
  );
}

// Export App component
export default App;
