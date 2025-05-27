const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/confirm-email', authController.confirmEmail);
router.put('/:id', authenticate, authController.updateUser);
router.delete('/:id', authenticate, authController.deleteUser);

module.exports = router;