import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_MOTIVATION_TIPS_QUERY = gql`
  query AllMotivationTips {
    allMotivationTips {
      id
      content
    }
  }
`;

const DailyTips = () => {
  const { loading, error, data } = useQuery(ALL_MOTIVATION_TIPS_QUERY);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const fetchNewTip = () => {
    setCurrentTipIndex(currentTipIndex + 1); // Increment index to show the next tip
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Get the current tip based on the index
  const currentTip = data.allMotivationTips[currentTipIndex];

  return (
    <div>
      <h2>Daily Motivational Tip</h2>
      <p>{currentTip.content}</p>
      {currentTipIndex < data.allMotivationTips.length - 1 && (
        <button onClick={fetchNewTip}>Refresh</button>
      )}
    </div>
  );
};

export default DailyTips;
