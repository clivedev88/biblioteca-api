const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');

exports.createBook = async (req, res) => {
  try {
    if (req.body.authors) {
      const authorsExist = await Author.countDocuments({ 
        _id: { $in: req.body.authors } 
      });
      
      if (authorsExist !== req.body.authors.length) {
        return res.status(400).json({ error: 'Um ou mais autores não existem' });
      }
    }

    if (req.body.categories) {
      const categoriesExist = await Category.countDocuments({ 
        _id: { $in: req.body.categories } 
      });
      
      if (categoriesExist !== req.body.categories.length) {
        return res.status(400).json({ error: 'Uma ou mais categorias não existem' });
      }
    }

    const book = await Book.create(req.body);
    
    if (req.body.authors) {
      await Author.updateMany(
        { _id: { $in: req.body.authors } },
        { $push: { books: book._id } }
      );
    }
    
    if (req.body.categories) {
      await Category.updateMany(
        { _id: { $in: req.body.categories } },
        { $push: { books: book._id } }
      );
    }

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
        select: 'name nationality'
      })
      .populate({
        path: 'categories',
        select: 'name description'
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

exports.updateBook = async (req, res) => {
  try {
    const updatedItem = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Model.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    res.json({ message: 'Item marcado como excluído' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
};