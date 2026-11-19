const express = require('express');
const cors = require('cors');
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome to the API' });
});

module.exports = app;