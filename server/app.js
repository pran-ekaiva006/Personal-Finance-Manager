const express = require('express');
const app = express();

// Add CORS middleware early
const corsMiddleware = require('./middleware/cors');
app.use(corsMiddleware);

// Ensure JSON body parsing is enabled
app.use(express.json());

// e.g., app.use('/api/auth', authRoutes);
module.exports = app;