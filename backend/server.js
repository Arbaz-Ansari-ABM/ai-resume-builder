const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// MongoDB Connection
// --------------------
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-resume-builder';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully ✅'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --------------------
// API routes
// --------------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/chat', require('./routes/chat'));

// --------------------
// Serve React frontend in production
// --------------------
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendBuildPath));

  app.use((req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// --------------------
// Global Error Handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
