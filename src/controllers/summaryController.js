const Book = require('../models/Book');
const { generateBookSummary } = require('../services/aiService');

// POST : Générer et sauvegarder le résumé d'un livre
const generateSummary = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('author_id');

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Livre introuvable'
            });
        }

        // Si le résumé existe déjà, on ne rappelle pas Groq
        if (book.summary) {
            return res.status(200).json({
                success: true,
                data: {
                    book_id: book._id,
                    title: book.title,
                    summary: book.summary,
                    generated_by: book.generated_by,
                    generated_at: book.generated_at
                },
                message: 'Résumé déjà disponible'
            });
        }

        // Génération du résumé avec Groq
        const summary = await generateBookSummary({
            title: book.title,
            year: book.year,
            author: book.author_id
        });

        // Sauvegarde dans MongoDB
        book.summary = summary;
        book.generated_by = process.env.GROQ_MODEL;
        book.generated_at = new Date();

        await book.save();

        return res.status(200).json({
            success: true,
            data: {
                book_id: book._id,
                title: book.title,
                summary: book.summary,
                generated_by: book.generated_by,
                generated_at: book.generated_at
            },
            message: 'Résumé généré et sauvegardé avec succès'
        });

    } catch (error) {
        console.error('Erreur génération résumé :', error.message);

        return res.status(503).json({
            success: false,
            data: null,
            message: 'Le service de génération du résumé est temporairement indisponible'
        });
    }
};


// GET : Récupérer le résumé sauvegardé
const getSummary = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Livre introuvable'
            });
        }

        if (!book.summary) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Aucun résumé disponible pour ce livre'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                book_id: book._id,
                title: book.title,
                summary: book.summary,
                generated_by: book.generated_by,
                generated_at: book.generated_at
            },
            message: 'Résumé récupéré avec succès'
        });

    } catch (error) {
        console.error('Erreur récupération résumé :', error.message);

        return res.status(500).json({
            success: false,
            data: null,
            message: 'Erreur lors de la récupération du résumé'
        });
    }
};

module.exports = {
    generateSummary,
    getSummary
};
