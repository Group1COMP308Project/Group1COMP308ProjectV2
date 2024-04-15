import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';


const ADD_FITNESS_AC = gql`
  mutation AddActivity($firstname: String!,$activity: String!) {
    addActivity(firstname: $firstname, activity: $activity) {
      id
      firstname
      activity
    }
  }
`;

const AddActivityForm = ()=> {

    const [firstname, setFirstname] = useState('');
    const [activity, setActivity] = useState('');

    const [AddActivityForm] = useMutation(ADD_FITNESS_AC); 



    const handleSubmit = async(e)=> {

        e.preventDefault();
    try {
      await AddActivityForm({ variables: { firstname, activity} });
      setFirstname('');
      setActivity('');

    } catch (error) {
      console.error('Error adding activity:', error);
      
    }
};

return (
    <div className="addActivity">
      <h2>Add a new Fitness Activity</h2>
      <form className="activity-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Activity : </label>
          <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>First Name:</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname((e.target.value))} required />
        </div>
       
      </form>
    </div>
  );

};

export default AddActivityForm;




