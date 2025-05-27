const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar categoria' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('books');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};