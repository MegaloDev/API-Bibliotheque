
const express = require('express');
const cors = require('cors');
const authorRoutes = require('./routes/authorRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/authRoutes');

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: null,
        message: 'Welcome to the API'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);

// Exportation de l'application
module.exports = app;
