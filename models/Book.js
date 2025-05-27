const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  year: { type: Number },
  quantity: { type: Number, default: 1 },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  createdAt: { type: Date, default: Date.now },
  coverImage: { type: String }
});

module.exports = mongoose.model('Book', BookSchema);