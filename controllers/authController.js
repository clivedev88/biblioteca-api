const User = require('../models/User');
const sendConfirmationEmail = require('../utils/email');
const { generateToken } = require('../config/jwt')

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const user = await User.create({ name, eamil, password });

        const token = generateToken(user._id);
        user.confirmationToken = token;
        await user.save();

        await sendConfirmationEmail(user.email, token);

        res.status(201).json({ message: 'Registro realizado com sucesso! Verifique seu e-mail.' })
    } catch (err) {
        res.status(500).json({ error: 'Erro no servidor!' });
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
        res.status(500).sjon({ error: 'Erro no servidor!' })
    }
};