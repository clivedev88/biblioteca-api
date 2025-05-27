const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { authenticate } = require('../middlewares/authMiddleware')

router.post('/', authenticate, authorController.createAuthor);
router.get('/', authorController.getAuthors)

module.exports = router;