const Article = require('../models/Article');


const getNewArticle = (req, res) => {
  res.render('articles/new', { article: new Article() })
};

const getSingleArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  const user = req.isAuthenticated()
  if (article == null) res.redirect('/');
  res.render('articles/show', { article: article, user: user });
};

const getEditArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect('/');
  res.render('articles/edit', { article: article })
}

const putEditArticle = async (req, res) => {
  let newData = {
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  };
  await Article.findByIdAndUpdate(req.params.id, newData)
  res.redirect(`/articles/${req.params.id}`);
}

const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/');
}

const postArticle = async (req, res) => {
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
}

module.exports = {
  getNewArticle,
  getSingleArticle,
  getEditArticle,
  putEditArticle,
  deleteArticle,
  postArticle
}