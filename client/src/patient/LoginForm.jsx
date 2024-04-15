import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import './LoginForm.css';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

const LoginForm = ({ setToken, handleLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  
    const handleLogin = async () => {
      try {
        const { data } = await login({
          variables: { email, password }
        });
        const token = data.login.token;
        setToken(token);
        handleLoginSuccess(token); // Call the handleLoginSuccess function with the token
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="login-container">
        <h2>Patient Login</h2>
        <form className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin} disabled={loading}>Login</button>
        {error && <p>Error: {error.message}</p>}
        </form>
      </div>
    );
  };

export default LoginForm;
