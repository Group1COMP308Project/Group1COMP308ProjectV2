// Import required modules
//test
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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
      {/* Render user type selection buttons if user is not logged in */}
      {!isLoggedIn && (
        <div>
          <h2>Choose User Type</h2>
          <button onClick={() => setUserType('nurse')}>Nurse</button>
          <button onClick={() => setUserType('patient')}>Patient</button>
        </div>
      )}

      {/* Render NurseLoginForm, NurseSignupForm, and NurseLogoutButton components if user type is nurse */}
      {userType === 'nurse' && (
        <div>
          <ApolloProvider client={nurseClient}>
            {!token ? <NurseLoginForm setToken={setToken} /> : <NurseLogoutButton setToken={setToken} />}
            {!token && <NurseSignupForm />}
          </ApolloProvider>
        </div>
      )}

      {/* Render PatientLoginForm, PatientSignupForm, and PatientLogoutButton components if user type is patient */}
      {userType === 'patient' && (
        <div>
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
