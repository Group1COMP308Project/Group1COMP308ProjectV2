import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the mutation for adding a motivational tip
const ADD_MOTIVATIONAL_TIP = gql`
  mutation AddMotivationTip($content: String!, $email: String!) {
    addMotivationTip(content: $content, email: $email) {
      id
      content
      nurse {
        id
        email
      }
    }
  }
`;

const SendMotivationalTips = () => {
  const [content, setContent] = useState('');
  const [nurseEmailAddress, setNurseEmailAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [addMotivationTip] = useMutation(ADD_MOTIVATIONAL_TIP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMotivationTip({
        variables: {
          content,
          email: nurseEmailAddress,
        },
      });
      setContent('');
      setNurseEmailAddress('');
      setSuccessMessage('Motivational tip added successfully');
    } catch (error) {
      console.error('Error adding motivational tip:', error);
      setSuccessMessage('Failed to add motivational tip');
    }
  };

  return (
    <div>
      <h2>Send Motivational Tips</h2>
    
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter motivational tip"
        />
        <br />
        <input
          type="text"
          value={nurseEmailAddress}
          onChange={(e) => setNurseEmailAddress(e.target.value)}
          placeholder="Nurse's Email"
        />
        <br />
        <button type="submit">Send Motivational Tip</button>
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
};

export default SendMotivationalTips;
