const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../model/User');
const path = require('path');
const fs = require('fs');



const router = express.Router();
//cProzfk3Dib3KIq8
// Get user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.post('/me', authMiddleware, async (req, res) => {
  const { name, skills, experience } = req.body;

  try {
    const user = await User.findById(req.user.id);
    user.profile.name = name || user.profile.name;
    user.profile.skills = skills || user.profile.skills;
    user.profile.experience = experience || user.profile.experience;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit to 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only .pdf, .doc, and .docx files are allowed!');
    }
  }
});

// Resume upload route
router.post('/upload-resume', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.profile.resume = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    await user.save();
    res.json({ msg: 'Resume uploaded successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
router.get('/resume', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || !user.profile.resume) {
        return res.status(404).json({ msg: 'Resume not found' });
      }
      res.contentType(user.profile.resume.contentType);
      res.send(user.profile.resume.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
module.exports = router;