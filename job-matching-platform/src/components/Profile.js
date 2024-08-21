import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Chip, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    skills: [],
    experience: '',
    resume: null,
  });
  const [skillInput, setSkillInput] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/profile/me', {
        headers: { 'x-auth-token': token },
      });
      setProfile(response.data.profile);
    };

    fetchProfile();
  }, []);

  const handleSkillAdd = () => {
    if (skillInput && !profile.skills.includes(skillInput)) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        skills: [...prevProfile.skills, skillInput],
      }));
      setSkillInput('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.post('http://localhost:5000/api/profile/me', profile, {
        headers: { 'x-auth-token': token },
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Name</Typography>
        {editMode ? (
          <TextField
            fullWidth
            name="name"
            value={profile.name}
            onChange={handleInputChange}
          />
        ) : (
          <Typography>{profile.name}</Typography>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Skills</Typography>
        <div>
          {profile.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={editMode ? () => handleSkillDelete(skill) : undefined}
              style={{ marginRight: '5px', marginBottom: '5px' }}
            />
          ))}
        </div>
        {editMode && (
          <div style={{ marginTop: '10px' }}>
            <TextField
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill"
            />
            <IconButton onClick={handleSkillAdd}>
              <AddIcon />
            </IconButton>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Experience</Typography>
        {editMode ? (
          <TextField
            fullWidth
            name="experience"
            value={profile.experience}
            onChange={handleInputChange}
            multiline
            rows={4}
          />
        ) : (
          <Typography>{profile.experience}</Typography>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Resume</Typography>
        {profile.resume ? (
          <a
            href={`http://localhost:5000/api/profile/resume`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        ) : (
          <Typography>No resume uploaded</Typography>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        {editMode ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveProfile}
          >
            Save Profile
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </Container>
  );
};

export default Profile;
