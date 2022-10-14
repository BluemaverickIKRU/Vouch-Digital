const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dbConnect = require('./database/connectDb');

// Initialize app as a instance of express
const app = express();

// Middleware to be used
app.use(cors());
app.use(express.json());

// Routes
app.use(require('./api'));

// Database Connection
dbConnect();

// Export the app to bin
module.exports = app;
