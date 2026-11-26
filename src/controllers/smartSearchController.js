
const Book = require('../models/Book');
const Author = require('../models/Author');
const { smartSearchBooks } = require('../services/aiService');

// POST /api/v1/books/smart-search
const searchBooks = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || typeof query !== 'string' || !query.trim()) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Veuillez fournir une recherche valide'
            });
        }

        // 1. Interpréter la demande avec Groq
        const criteria = await smartSearchBooks(query.trim());

        // 2. Construire un filtre MongoDB sécurisé
        const filter = {};

        if (criteria.title) {
            filter.title = {
                $regex: criteria.title,
                $options: 'i'
            };
        }

        if (criteria.available !== undefined) {
            filter.available = criteria.available;
        }

        if (criteria.year_before !== undefined) {
            filter.year = {
                ...filter.year,
                $lt: criteria.year_before
            };
        }

        if (criteria.year_after !== undefined) {
            filter.year = {
                ...filter.year,
                $gt: criteria.year_after
            };
        }

        // 3. Rechercher l'auteur si nécessaire
        if (criteria.author || criteria.nationality) {
            const authorFilter = {};

            if (criteria.author) {
                const parts = criteria.author.trim().split(/\s+/);

                if (parts.length >= 2) {
                    authorFilter.first_name = {
                        $regex: parts[0],
                        $options: 'i'
                    };
                    authorFilter.last_name = {
                        $regex: parts.slice(1).join(' '),
                        $options: 'i'
                    };
                } else {
                    authorFilter.$or = [
                        { first_name: { $regex: parts[0], $options: 'i' } },
                        { last_name: { $regex: parts[0], $options: 'i' } }
                    ];
                }
            }

            if (criteria.nationality) {
                authorFilter.nationality = {
                    $regex: criteria.nationality,
                    $options: 'i'
                };
            }

            const authors = await Author.find(authorFilter).select('_id');
            filter.author_id = { $in: authors.map(author => author._id) };
        }

        // 4. Exécuter la recherche
        const books = await Book.find(filter).populate('author_id');

        return res.status(200).json({
            success: true,
            data: {
                criteria,
                count: books.length,
                books
            },
            message: 'Recherche intelligente effectuée avec succès'
        });

    } catch (error) {
        console.error('Erreur Smart Search :', error.message);

        return res.status(503).json({
            success: false,
            data: null,
            message: 'Service de recherche intelligente indisponible'
        });
    }
};

module.exports = { searchBooks };
