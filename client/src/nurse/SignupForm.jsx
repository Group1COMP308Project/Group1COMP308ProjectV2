// Import required modules
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './LoginForm.css';

// Define GraphQL mutation for signup
const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      nurse {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

// NurseSignupForm component definition
const NurseSignupForm = () => {
  // State variables for form fields and signup success
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  // UseMutation hook for signup mutation
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

  // Function to handle signup
  const handleSignup = async () => {
    try {
      // Execute signup mutation
      const { data } = await signup({
        variables: { firstName, lastName, email, password }
      });
      // Log the response data
      console.log(data);
      // Set signupSuccess to true
      setSignupSuccess(true);
      // Optionally, you can redirect the user to a new page after successful signup
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Render signup form JSX
  return (
    <div className="login-container">
      <h2>Nurse Sign Up</h2>
      <form className="login-form">
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} disabled={loading}>Sign Up</button> {/* Signup button */}
      {error && <p>Error: {error.message}</p>} {/* Display error message if exists */}
      {signupSuccess && <p>You are now signed up!</p>} {/* Display signup success message */}
      </form>
    </div>
  );
};

// Export NurseSignupForm component
export default NurseSignupForm;
