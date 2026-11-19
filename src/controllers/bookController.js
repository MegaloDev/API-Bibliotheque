const Book = require('../models/Book');
const Author = require('../models/Author');

// GET /api/books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author_id');

        return res.status(200).json({
            success: true,
            data: books,
            message: 'Liste des livres récupérée'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Erreur lors de la récupération des livres'
        });
    }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author_id');

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Livre introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: book,
            message: 'Livre récupéré'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Identifiant invalide'
        });
    }
};

// POST /api/books
const createBook = async (req, res) => {
    try {
        const { title, isbn, year, available, author_id } = req.body;

        if (!title || !isbn || !year || !author_id) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'title, isbn, year et author_id sont obligatoires'
            });
        }

        const author = await Author.findById(author_id);

        if (!author) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Cet auteur n’existe pas'
            });
        }

        const book = await Book.create({
            title,
            isbn,
            year,
            available: available ?? true,
            author_id
        });

        return res.status(201).json({
            success: true,
            data: book,
            message: 'Livre créé avec succès'
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Cet ISBN existe déjà'
            });
        }

        return res.status(422).json({
            success: false,
            data: null,
            message: 'Données du livre invalides'
        });
    }
};

// PUT /api/books/:id
const updateBook = async (req, res) => {
    try {
        const { title, isbn, year, available, author_id } = req.body;

        if (!title || !isbn || !year || !author_id) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'title, isbn, year et author_id sont obligatoires'
            });
        }

        const author = await Author.findById(author_id);

        if (!author) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Cet auteur n’existe pas'
            });
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, isbn, year, available: available ?? true, author_id },
            { new: true, runValidators: true }
        ).populate('author_id');

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Livre introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: book,
            message: 'Livre modifié avec succès'
        });
    } catch (error) {
        return res.status(422).json({
            success: false,
            data: null,
            message: 'Données invalides ou ISBN déjà utilisé'
        });
    }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Livre introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: book,
            message: 'Livre supprimé avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Identifiant invalide'
        });
    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};