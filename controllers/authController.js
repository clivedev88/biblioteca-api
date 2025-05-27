const User = require('../models/User');
const sendConfirmationEmail = require('../utils/email');
const { generateToken } = require('../config/jwt')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const user = await User.create({ name, email, password });

        const token = generateToken(user._id);
        user.confirmationToken = token;
        await user.save();

        await sendConfirmationEmail(user.email, token);

        res.status(201).json({ message: 'Registro realizado com sucesso! Verifique seu e-mail.', token })
    } catch (err) {
        console.error("Erro detalhado:", err);
        res.status(500).json({ 
            error: 'Erro no servidor',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
        // res.status(500).json({ error: 'Erro no servidor!' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas!' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ error: 'Confirme seu e-mail primeiro!' });
        }

        const token = generateToken(user._id)
        res.json({ token });
    } catch (err) {
        console.error("Erro detalhado:", err);
        res.status(500).json({ error: 'Erro no servidor!' })
    }
};

exports.confirmEmail = async (req, res) => {
    const { token } = req.query;
    
    try {
        const user = await User.findOne({ confirmationToken: token });
        if (!user) {
            return res.status(400).json({ èrror: 'Token inválido' });
        }

        user.isVerified = true;
        user.confirmationToken = undefined;
        await user.save();

        res.json({ message: 'E-mail confirmado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao confirmar o e-mail.' })
    }
};