require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors')

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { authenticate } = require('./middlewares/authMiddleware');

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes)

app.get('/', (req, res) => {
    res.send('API da Biblioteca Funcionando!')
})

module.exports = app;