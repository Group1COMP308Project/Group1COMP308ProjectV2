// Import required modules
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './globalStyles.css'; // Import the styles.css file
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container">
      {!isLoggedIn && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center">Welcome to Our Healthcare Portal</h1>
            <p className="text-center">Please select your role:</p>
            <div className="text-center">
              <button className="btn btn-success mr-2" onClick={() => setUserType('nurse')}>I'm a Nurse</button>
              <button className="btn btn-primary" onClick={() => setUserType('patient')}>I'm a Patient</button>
            </div>
          </div>
        </div>
      )}

      {userType === 'nurse' && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ApolloProvider client={nurseClient}>
              {!token ? <NurseLoginForm setToken={setToken} /> : <NurseLogoutButton setToken={setToken} />}
              {!token && <NurseSignupForm />}
            </ApolloProvider>
          </div>
        </div>
      )}

      {userType === 'patient' && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ApolloProvider client={patientClient}>
              {!token ? <PatientLoginForm setToken={setToken} /> : <PatientLogoutButton setToken={setToken} />}
              {!token && <PatientSignupForm />}
            </ApolloProvider>
          </div>
        </div>
      )}
    </div>
  );
}

// Export App component
export default App;
