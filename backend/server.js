const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI is not defined!');
  process.exit(1); // Server start nahi hoga
}

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully ✅'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resumes'));
app.use('/api/chat', require('./routes/chat'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
