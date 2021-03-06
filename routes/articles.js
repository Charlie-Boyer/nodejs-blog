const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const isAuthenticated = require('../passport');

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
});

router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article });
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect('/');
  res.render('articles/edit', { article: article })
});

router.put('/edit/:id', async (req, res) => {
  let newData = {
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  };
  await Article.findByIdAndUpdate(req.params.id, newData)
  res.redirect(`/articles/${req.params.id}`);
});

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/');
});

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (e) {
    console.log(e);
    res.render('articles/new', { article: article })
  }
});


module.exports = router;
