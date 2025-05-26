const { verifyToken } = require('../config/jwt');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '');

    if (!token) {
        return res.statu(401).json({ error: 'Acesso negado!!!' });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        next()
    } catch (err) {
        res.status(401).json({ error: 'Token inválido!' });
    }
};

