const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  nationality: { type: String },
  birthDate: { type: Date },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], // Correção aqui
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Author', AuthorSchema);