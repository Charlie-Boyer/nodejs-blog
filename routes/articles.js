const express = require('express');
const router = express.Router();
const isAuthenticated = require('../passport');
const articlesController = require('../controllers/articlesController');

router.get('/new', articlesController.getNewArticle);
router.get('/:id', articlesController.getSingleArticle);
router.get('/edit/:id', isAuthenticated, articlesController.getEditArticle);
router.put('/edit/:id', articlesController.putEditArticle);
router.delete('/:id', articlesController.deleteArticle);
router.post('/', articlesController.postArticle);

module.exports = router;
