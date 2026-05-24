require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contact');

// Connect to MongoDB before handling requests
connectDB();

const app = express();

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'), { dotfiles: 'ignore' }));

// API routes
app.use('/api/contact', contactRoutes);

// Health check or root API response
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Interior design contact API is running',
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    error: 'Server error. Please try again later.',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
