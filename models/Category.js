const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    createdAt: { type: Date, default: Date.now }
})

module.exports = ('Category', CategorySchema);