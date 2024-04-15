// Import required modules
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './LoginForm.css';

// Define GraphQL mutation for login
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// LoginForm component definition
const LoginForm = ({ setToken, handleLoginSuccess }) => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UseMutation hook for login mutation
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  // Function to handle login
  const handleLogin = async () => {
    try {
      // Execute login mutation
      const { data } = await login({
        variables: { email, password }
      });
      // Retrieve token from response data
      const token = data.login.token;
      // Set token in parent component
      setToken(token);
      // Call handleLoginSuccess function with the token
      handleLoginSuccess(token);
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Render login form JSX
  return (
    
      <div className="login-container">
      <h2>Nurse Login</h2>
      <form className="login-form">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>Login</button> {/* Login button */}
      {error && <p>Error: {error.message}</p>} {/* Display error message if exists */}
      </form>
    </div>
  );
};

// Export LoginForm component
export default LoginForm;
