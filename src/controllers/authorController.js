const Author = require('../models/Author');

// GET : récupérer tous les auteurs
const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();

        return res.status(200).json({
            success: true,
            data: authors,
            message: 'Liste des auteurs récupérée avec succès'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Erreur lors de la récupération des auteurs'
        });
    }
};

// POST : ajouter un auteur
const createAuthor = async (req, res) => {
    try {
        const { first_name, last_name, nationality } = req.body;

        if (!first_name || !last_name || !nationality) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Tous les champs sont obligatoires'
            });
        }

        const author = await Author.create({
            first_name,
            last_name,
            nationality
        });

        return res.status(201).json({
            success: true,
            data: author,
            message: 'Auteur créé avec succès'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: 'Erreur lors de la création de l’auteur'
        });
    }
};

// GET : récupérer un auteur par son ID
const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Auteur introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: author,
            message: 'Auteur récupéré avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'ID auteur invalide'
        });
    }
};

// PUT : modifier un auteur
const updateAuthor = async (req, res) => {
    try {
        const { first_name, last_name, nationality } = req.body;

        if (!first_name || !last_name || !nationality) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Tous les champs sont obligatoires'
            });
        }

        const author = await Author.findByIdAndUpdate(
            req.params.id,
            { first_name, last_name, nationality },
            { new: true, runValidators: true }
        );

        if (!author) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Auteur introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: author,
            message: 'Auteur modifié avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Erreur lors de la modification de l’auteur'
        });
    }
};

// DELETE : supprimer un auteur
const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);

        if (!author) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Auteur introuvable'
            });
        }

        return res.status(200).json({
            success: true,
            data: author,
            message: 'Auteur supprimé avec succès'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'ID auteur invalide'
        });
    }
};

module.exports = {
    getAuthors,
    createAuthor,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
