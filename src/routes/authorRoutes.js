const express = require('express');
const router = express.Router();

const {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');

const protect = require('../middleware/authMiddleware');

// Toutes les routes nécessitent un token JWT
router.use(protect);

router.get('/', getAuthors);
router.post('/', createAuthor);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;