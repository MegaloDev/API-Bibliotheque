const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.use(protect);

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;