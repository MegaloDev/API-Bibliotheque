const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// GET /api/borrows
const getBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find().populate('book_id');

        return res.status(200).json({
            success: true,
            data: borrows,
            message: 'Liste des emprunts récupérée'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Erreur lors de la récupération des emprunts'
        });
    }
};

// POST /api/borrows
const createBorrow = async (req, res) => {
    try {
        const { user_name, book_id } = req.body;

        if (!user_name || !book_id) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'user_name et book_id sont obligatoires'
            });
        }

        const book = await Book.findById(book_id);

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Livre introuvable'
            });
        }

        if (!book.available) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Ce livre est déjà emprunté'
            });
        }

        // Créer l'emprunt
        const borrow = await Borrow.create({
            user_name,
            book_id,
            borrowed_at: new Date(),
            returned_at: null
        });

        // Rendre le livre indisponible
        book.available = false;
        await book.save();

        return res.status(201).json({
            success: true,
            data: borrow,
            message: 'Emprunt créé avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Impossible de créer cet emprunt'
        });
    }
};

// PATCH /api/borrows/:id/return
const returnBorrow = async (req, res) => {
    try {
        const borrow = await Borrow.findById(req.params.id);

        if (!borrow) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Emprunt introuvable'
            });
        }

        if (borrow.returned_at) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Ce livre a déjà été retourné'
            });
        }

        borrow.returned_at = new Date();
        await borrow.save();

        const book = await Book.findById(borrow.book_id);

        if (book) {
            book.available = true;
            await book.save();
        }

        return res.status(200).json({
            success: true,
            data: borrow,
            message: 'Livre retourné avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Erreur lors du retour du livre'
        });
    }
};

module.exports = {
    getBorrows,
    createBorrow,
    returnBorrow
};