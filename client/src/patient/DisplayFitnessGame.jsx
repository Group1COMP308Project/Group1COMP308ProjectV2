import React, { useState } from 'react';
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

const getActivity = () => {

    if (loading) return <p>Loading...</p>;

    return (

        <div className="get-activities">
            <h1>Activities</h1>
           

        </div>


    )






}