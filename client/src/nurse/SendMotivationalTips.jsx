import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

//defining the mutation for creating motivational tips
const CREATE_MOTIVATIONAL_TIP = gql`
  mutation CreateMotivationalTip($content: String!, $authorId: ID!) {
    createMotivationalTip(content: $content, authorId: $authorId) {
      id
      content
      author {
        id
        email
      }
    }
  }
`;

// SendMotivationalTips component definition
const SendMotivationalTips = ({ userId }) => {
    const [content, setContent] = useState('');
    const [createMotivationalTip] = useMutation(CREATE_MOTIVATIONAL_TIP);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createMotivationalTip({
          variables: {
            content,
            authorId: userId,
          },
        });
        setContent('');
        console.log('Motivational tip sent successfully');
      } catch (error) {
        console.error('Error sending motivational tip:', error);
      }
    };

    return (
        <div>
          <h2>Send Motivational Tips</h2>
          <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter motivational tip" />
            <button type="submit">Send</button>
          </form>
        </div>
      );
    };
    
    export default SendMotivationalTips;