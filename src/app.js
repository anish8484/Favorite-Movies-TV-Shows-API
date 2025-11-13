// src/app.js
import 'dotenv/config'; // Load environment variables from .env
import express from 'express';
import entryRoutes from './routes/entry.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Body parsing

// Routes
app.use('/api/entries', entryRoutes);

// Simple health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Favorite Media API is running.',
        status: 'OK',
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
