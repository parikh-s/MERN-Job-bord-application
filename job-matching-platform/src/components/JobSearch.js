import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const JobSearch = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs/search', {
        params: { title, company, location }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search for Jobs
      </Typography>
      <TextField
        label="Job Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Company"
        fullWidth
        margin="normal"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <TextField
        label="Location"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Search Results:
      </Typography>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id}>
            <Typography variant="h6">{job.title}</Typography>
            <Typography>{job.company}</Typography>
            <Typography>{job.location}</Typography>
            <Typography>{job.description}</Typography>
          </div>
        ))
      ) : (
        <Typography>No jobs found</Typography>
      )}
    </Container>
  );
};

export default JobSearch;
