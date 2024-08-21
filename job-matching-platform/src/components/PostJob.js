import React, { useState } from 'react';
import axios from 'axios';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/create', 
        { title, description, company, location, salary },
        { headers: { 'x-auth-token': token } }
      );
      console.log('Job posted:', response.data);
    } catch (error) {
      console.error('Error posting job', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" />
      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
      <button type="submit">Post Job</button>
    </form>
  );
};

export default PostJob;
