const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/', authenticate, bookController.createBook);
router.get('/', bookController.getBooks);
router.put('/:id', authenticate, bookController.updateBook);
router.delete('/:id', authenticate, bookController.deleteBook);


const upload = require('../config/upload');

router.post('/:id/upload-cover', authenticate, upload.single('cover'), bookController.uploadCover);

router.get('/search', bookController.searchBooks);

module.exports = router;