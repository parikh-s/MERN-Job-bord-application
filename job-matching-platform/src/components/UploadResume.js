import React, { useState } from 'react';
import { Container, Button, Typography, Input } from '@mui/material';
import axios from 'axios';

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/profile/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        },
      });
      setMessage('Resume uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Upload Your Resume
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      {message && <Typography>{message}</Typography>}
    </Container>
  );
};

export default UploadResume;
