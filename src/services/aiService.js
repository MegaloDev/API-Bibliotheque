
const OpenAI = require('openai');

const ai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: process.env.GROQ_BASE_URL,
    timeout: 60000,
    maxRetries: 2
});

/**
 * Génère un résumé de livre avec Groq.
 */
const generateBookSummary = async (book) => {
    const response = await ai.chat.completions.create({
        model: process.env.GROQ_MODEL,
        messages: [
            {
                role: 'system',
                content: `Tu es un expert en littérature.
                Tu génères des résumés concis et accrocheurs
                pour des fiches de bibliothèque.
                Réponds toujours en français.
                Maximum 3 phrases.`
            },
            {
                role: 'user',
                content: `Génère un résumé pour le livre intitulé
                "${book.title}" écrit par
                ${book.author.first_name} ${book.author.last_name},
                publié en ${book.year}.`
            }
        ],
        temperature: 0.7
    });

    return response.choices[0].message.content.trim();
};

/**
 * Transforme une recherche naturelle en critères JSON.
 */
const smartSearchBooks = async (query) => {
    const response = await ai.chat.completions.create({
        model: process.env.GROQ_MODEL,
        messages: [
            {
                role: 'system',
                content: `Tu es un assistant de recherche pour une bibliothèque.
Analyse la demande de l'utilisateur et retourne uniquement un objet JSON valide.

Champs autorisés :
- author : nom complet de l'auteur (string)
- title : titre du livre (string)
- nationality : nationalité de l'auteur (string)
- year_before : année maximale exclusive (number)
- year_after : année minimale exclusive (number)
- available : disponibilité (boolean)

N'invente jamais de critères absents de la demande.
Si aucun critère n'est identifiable, retourne {}.
Ne retourne aucun texte en dehors du JSON.`
            },
            {
                role: 'user',
                content: query
            }
        ],
        temperature: 0
    });

    const content = response.choices[0].message.content.trim();

    return JSON.parse(content);
};

module.exports = {
    generateBookSummary,
    smartSearchBooks
};
