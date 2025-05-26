const express = require('express');
const app = express();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API da Biblioteca Funcionando!')
})

module.exports = app;