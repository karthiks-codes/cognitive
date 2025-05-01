const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const router = require('./routes/routes'); // Import your routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://Boddupalli:Boddupalli@cluster0.trtrkzu.mongodb.net/";

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use('/api', router)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});