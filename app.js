const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API da Biblioteca Funcionando!')
})

module.exports = app;