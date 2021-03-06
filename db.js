const mongoose = require('mongoose');

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