const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;