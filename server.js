const express = require('express');
const app = express();
const session = require('express-session');
require('dotenv').config();

const passport = require('passport');

const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
require('./db');




const articleRouter = require('./routes/articles');
const Article = require('./models/Article');


app.set('view engine', 'ejs');


//middlewares
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(layouts);
app.use('/articles', articleRouter);


const authRouter = require('./routes/auth');
app.use('/auth', authRouter);


app.get('/', async (req, res) => {
  const articles = await Article.find();
  res.render('articles/index', { articles: articles });
});


app.listen(process.env.PORT || 3000, () => {
  console.log('server connection success')
});