
const OpenAI = require('openai');

const ai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: process.env.GROQ_BASE_URL
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

module.exports = {
    generateBookSummary
};
