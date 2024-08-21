import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!email) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Password is required";
    } else if (password.length < 6) {
      formIsValid = false;
      errors["password"] = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Passwords do not match";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password });
        localStorage.setItem('authToken', response.data.token);
        navigate('/home'); // Redirect to home page after signup
      } catch (error) {
        setErrors({ signup: 'Error during signup. Please try again.' });
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />
      {errors.signup && (
        <Typography color="error">
          {errors.signup}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
      <Typography variant="body2" style={{ marginTop: '16px' }}>
        Already have an account? <Link href="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Signup;
