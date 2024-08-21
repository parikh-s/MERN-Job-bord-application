import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('authToken', response.data.token);
        navigate('/home'); // Redirect to home page after login
      } catch (error) {
        setErrors({ login: 'Invalid credentials' });
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
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
      {errors.login && (
        <Typography color="error">
          {errors.login}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" style={{ marginTop: '16px' }}>
        Don't have an account? <Link href="/signup">Sign up</Link>
      </Typography>
    </Container>
  );
};

export default Login;
