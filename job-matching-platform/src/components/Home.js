import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/protected', {
          headers: {
            'x-auth-token': token,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching protected data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Home;
