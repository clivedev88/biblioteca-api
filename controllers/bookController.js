const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    console.error("Erro detalhado:", err);
    res.status(400).json({ error: 'Erro ao criar livro' });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('authors categories');
    res.json(books);
  } catch (err) {
    console.error("Erro detalhado:", err);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
};

const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    // Verifica se autores e categorias existem
    if (req.body.authors) {
      // Validação opcional: verificar se os IDs de autores existem
    }
    
    if (req.body.categories) {
      // Validação opcional: verificar se os IDs de categorias existem
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    console.error("Erro detalhado:", err);
    res.status(400).json({ 
      error: 'Erro ao criar livro',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate({
        path: 'authors',
        select: 'name nationality' // Campos específicos para popular
      })
      .populate({
        path: 'categories',
        select: 'name' // Campos específicos para popular
      });
      
    res.json(books);
  } catch (err) {
    console.error("Erro detalhado:", err);
    res.status(500).json({ 
      error: 'Erro ao buscar livros',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};