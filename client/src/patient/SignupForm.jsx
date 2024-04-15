import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './LoginForm.css';

const SIGNUP_MUTATION = gql`
  mutation Signup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      patient {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION);

  const handleSignup = async () => {
    try {
      await signup({
        variables: { firstName, lastName, email, password }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Sign Up</h2>
      <form className="login-form">
      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} disabled={loading}>Sign Up</button>
      {error && <p>Error: {error.message}</p>}
      {data && data.signup && (
        <p>Signup Successful! You can now log in with your credentials.</p>
      )}
      </form>
    </div>
  );
};

export default SignupForm;
