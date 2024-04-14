import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModelResultsPage = () => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('/train-and-predict');
                setResults(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchResults();
    }, []);

    return (
        <div>
            <h1>Model Results</h1>
            {results ? (
                <div>
                    <p>Elapsed Time: {results.elapsedTime}</p>
                    <p>Loss Value: {results.lossValue}</p>
                    <p>Result for Test 1: {results.resultForTest1}</p>
                    <p>Result for Test 2: {results.resultForTest2}</p>
                    <p>Result for Test 3: {results.resultForTest3}</p>
                </div>
            ) : error ? (
                <p>Error fetching results: {error}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ModelResultsPage;