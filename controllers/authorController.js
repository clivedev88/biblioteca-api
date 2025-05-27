const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    console.error('Erro detalhado:', err);
    res.status(400).json({ 
      error: 'Erro ao criar autor',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('books');
        res.json(authors);
    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ error: 'Erro ao buscar autores' });
    }
};

exports.updateAuthor = async (req, res) => {
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

exports.deleteAuthor = async (req, res) => {
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

exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const items = await Model.find({ deletedAt: null })
      .skip(skip)
      .limit(limit);
    
    const total = await Model.countDocuments({ deletedAt: null });
    
    res.json({
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar' });
  }
};