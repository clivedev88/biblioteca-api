const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, bookController.createBook);
router.get('/', bookController.getBooks);

module.exports = router;