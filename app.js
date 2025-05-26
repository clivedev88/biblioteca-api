const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API da Biblioteca Funcionando!')
})

module.exports = app;