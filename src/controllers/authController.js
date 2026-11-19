
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérification des champs
        if (!username || !password) {
            return res.status(422).json({
                success: false,
                data: null,
                message: 'Username et password sont obligatoires'
            });
        }

        // Vérification des identifiants
        const validUsername = username === process.env.ADMIN_USERNAME;

        const validPassword = process.env.ADMIN_PASSWORD_HASH
            ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
            : false;

        if (!validUsername || !validPassword) {
            return res.status(401).json({
                success: false,
                data: null,
                message: 'Identifiants incorrects'
            });
        }

        // Création du token JWT
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        return res.status(200).json({
            success: true,
            data: {
                token,
                token_type: 'Bearer'
            },
            message: 'Connexion réussie'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            data: null,
            message: 'Erreur lors de la connexion'
        });
    }
};

module.exports = { login };
