const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));

const PORT = process.env.PORT || 5000;

// routes imports
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');
const profileRoutes = require('./routes/profile');

const jobRoutes = require('./routes/job');
// Middleware
app.use(express.json({ limit: '10mb' }));  // Set limit to 10MB or adjust as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));
// Connect to MongoDB
mongoose.connect('mongodb+srv://sarthakparikh20010409:cProzfk3Dib3KIq8@cluster0.f1bm4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// auth routes
app.use('/api/auth', authRoutes);

app.use('/api/jobs', jobRoutes);
app.use('/api/profile', profileRoutes);


// Basic route
app.get('/', (req, res) => {
  res.send('Job Matching Platform API');
});
// Add this line before the app.listen() in index.js
app.get('/api/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
  });
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

