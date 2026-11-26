const express = require('express');
const router = express.Router();
const { searchBooks } = require('../controllers/smartSearchController');

const protect = require('../middleware/authMiddleware');

const {
    generateSummary,
    getSummary
} = require('../controllers/summaryController');

router.post('/smart-search', searchBooks);

// Générer un résumé : authentification obligatoire
router.post('/:id/summary', protect, generateSummary);

// Récupérer un résumé
router.get('/:id/summary', getSummary);

module.exports = router;
