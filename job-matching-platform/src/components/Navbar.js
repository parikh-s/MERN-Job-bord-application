import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };


  return (
   
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Job Match
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Profile</Button>
        <Button color="inherit">Jobs</Button>
        <Button color="inherit">Login</Button>
        <Button color="inherit" href="/search-jobs">Search Jobs</Button>

        <Button color="inherit" onClick={handleLogout}>Logout</Button>

      </Toolbar>
    </AppBar>

  );
};

export default Navbar;
