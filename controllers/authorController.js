const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author)
    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(400).json({ error: 'Erro ao buscar autores.' })
    }
}

exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('books');
        res.json(authors);
    } catch (err) {
        console.error('Erro detalhado:', err);
        res.status(500).json({ error: 'Erro ao buscar autores' });
    }
};