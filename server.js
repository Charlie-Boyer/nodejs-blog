const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const express = require('express');
const layouts = require('express-ejs-layouts');


const port = 3000;
const app = express();


const articleRouter = require('./routes/articles');
const Article = require('./models/article');


mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (error) => {
    if (!error) {
      return console.log('db connection success')
    }
    return console.log(error)
  }
)


//middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));


app.use(layouts);
app.set('view engine', 'ejs');



app.use('/articles', articleRouter);



app.get('/', async (req, res) => {
  const articles = await Article.find();
  res.render('articles/index', { articles: articles });
});


app.listen(port, () => {
  console.log('server connection success at port: ' + port)
});