require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const { authenticate } = require('./middlewares/authMiddleware');

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes)

app.use('/api/authors', authRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('API da Biblioteca Funcionando!')
})

module.exports = app;