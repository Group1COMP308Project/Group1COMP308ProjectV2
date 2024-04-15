import React from 'react';
import { useQuery, gql } from '@apollo/client';


const GET_ACTIVITIES = gql`
    query {
        getActivity {

            id
            firstname
            activity
        }
    }


`;

const GetActivity = () => {
    const { loading,refetch } = useQuery(GET_ACTIVITIES);
    const fetchGames = ()=> {
        refetch();
    }

   
      
    

    if (loading) return <p>Loading...</p>

    return (

        <div className="get-activities">
        <h1>List of Activities</h1>
        
        <button onClick={fetchGames}>Refetch activities</button>
        
        {GetActivity.map((activity) => (
            <div key={activity.id} className="activity">
                <div>Id</div>
                <div>{activity.id}</div>
                <div>Activity</div>
                <div>{activity.firstname}</div>
                <>Activity</>
                <div>{activity.activity}</div>
            </div>
        ))}
    </div>
    


    );



};

export default GetActivity;