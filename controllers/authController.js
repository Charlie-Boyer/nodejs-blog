const getLogin = ( req, res ) => {
  console.log(req.session)
  res.render('auth/login')
}

const postLogin = ( req, res ) => {
  res.send('login ok')
}

module.exports = {
  getLogin,
  postLogin
}