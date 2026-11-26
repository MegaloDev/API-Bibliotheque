
const express = require('express');
const cors = require('cors');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

const v1BookRoutes = require('./routes/v1BookRoutes');

const swaggerDocument = YAML.parse(
    fs.readFileSync(path.join(__dirname, '../docs/openapi.yaml'), 'utf8')
);

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
app.use('/api/books', bookRoutes);
app.use('/api/v1/books', v1BookRoutes);
app.use('/api/borrows', borrowRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exportation de l'application
module.exports = app;
