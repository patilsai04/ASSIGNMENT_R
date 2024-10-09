// Import necessary modules using ES6 syntax
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import DataRoutes from './Router/DataRoutes.js';
import StatRoutes from './Router/StatRoutes.js';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

mongoose.set('strictQuery', true);


// Ensure MONGO_URI is properly set in environment variables
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('Error: MONGO_URI is undefined. Please ensure it is set in the .env file.');
    process.exit(1); // Exit the process if MONGO_URI is missing
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit on MongoDB connection failure
});

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/data', DataRoutes);
app.use('/stats', StatRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
