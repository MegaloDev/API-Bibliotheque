
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        isbn: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        year: {
            type: Number,
            required: true,
            min: 1
        },

        available: {
            type: Boolean,
            default: true
        },

        author_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Book', bookSchema);
