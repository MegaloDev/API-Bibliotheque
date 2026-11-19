
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            trim: true
        },

        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },

        borrowed_at: {
            type: Date,
            default: Date.now
        },

        returned_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Borrow', borrowSchema);
