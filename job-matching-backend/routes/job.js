const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Job = require('../model/Job');

const router = express.Router();

// Create a job posting
router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, company, location, salary } = req.body;

  try {
    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.user.id,
    });

    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all job postings
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', ['email']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a specific job posting
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', ['email']);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/search', async (req, res) => {
    const { title, company, location } = req.query;
  
    let filter = {};
  
    if (title) {
      filter.title = new RegExp(title, 'i'); // Case-insensitive search
    }
    if (company) {
      filter.company = new RegExp(company, 'i');
    }
    if (location) {
      filter.location = new RegExp(location, 'i');
    }
  
    try {
      const jobs = await Job.find(filter);
      res.json(jobs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;
  

module.exports = router;
