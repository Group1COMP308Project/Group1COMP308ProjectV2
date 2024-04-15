import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_POINTS_MUTATION = gql`
  mutation AddPoints($patientId: ID!, $points: Int!) {
    addPoints(patientId: $patientId, points: $points) {
      id
      points
    }
  }
`;

const FitnessGame = () => {
  const [userId, setUserId] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0); // State variable for total points
  const [message, setMessage] = useState('');

  const [addPointsMutation] = useMutation(ADD_POINTS_MUTATION);

  // Function to handle user ID input change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  // Function to handle activity selection
  const handleActivitySelect = (activity) => {
    if (!selectedActivities.includes(activity)) {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return; // Ensure user ID is provided

    let pointsToAdd = 0; // Total points to add for selected activities
    // Loop through selected activities and add points based on activity type
    for (const activity of selectedActivities) {
      if (activity === 'walk') {
        pointsToAdd += 5;
      } else if (activity === 'bike') {
        pointsToAdd += 10;
      } else if (activity === 'run') {
        pointsToAdd += 15;
      } else if (activity === 'swim') {
        pointsToAdd += 20;
      }
    }

    // Display message with total points to be added
    setMessage(`Adding ${pointsToAdd} points...`);

    try {
      // Call mutation to add points
      const { data } = await addPointsMutation({ variables: { patientId: userId, points: pointsToAdd } });

      // Update total points
      setTotalPoints(data.addPoints.points);

      // Clear selected activities after adding points
      setSelectedActivities([]);
      // Clear user ID input
      setUserId('');
      // Set success message
      setMessage(`Successfully added ${pointsToAdd} points. Congrats, you have a total of ${data.addPoints.points} points.`);
    } catch (error) {
      console.error('Error adding points:', error);
      // Set error message
      setMessage('Failed to add points. Please try again.');
    }
  };

  return (
    <div>
      <h2>Fitness Game</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input type="text" value={userId} onChange={handleUserIdChange} required />
        </div>
        <div>
          <h3>Select Activities:</h3>
          <label>
            <input type="checkbox" value="run" onChange={() => handleActivitySelect("run")} />
            Run (+15 points)
          </label>
          <br />
          <label>
            <input type="checkbox" value="walk" onChange={() => handleActivitySelect("walk")} />
            Walk (+5 points)
          </label>
          <br />
          <label>
            <input type="checkbox" value="bike" onChange={() => handleActivitySelect("bike")} />
            Bike (+10 points)
          </label>
          <br />
          <label>
            <input type="checkbox" value="swim" onChange={() => handleActivitySelect("swim")} />
            Swim (+20 points)
          </label>
        </div>
        <button type="submit">Add Points</button>
        <br/>
      </form>
      <div>
      <br/>
        <p>{message}</p>

      </div>
    </div>
  );
};

export default FitnessGame;
