const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');

const {
    getBorrows,
    createBorrow,
    returnBorrow
} = require('../controllers/borrowController');

router.use(protect);

router.get('/', getBorrows);
router.post('/', createBorrow);
router.patch('/:id/return', returnBorrow);

module.exports = router;