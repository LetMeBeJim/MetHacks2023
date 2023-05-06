import React, { useState, useEffect } from 'react';
import SubmitForm from '../components/SubmitForm';


const HomePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:4000/test')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    console.log(data)

    return (
        <>
            <div>
                hello homepage
            </div>
            <SubmitForm/>
        </>
    )
}

export default HomePage;