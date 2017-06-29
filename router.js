const router = require('express').Router();
const path = require('path');
const passport = require('passport');
const cookieParse = require('./models/middleware_functions');

//OAuth routes

//initial login
router.get('/auth/facebook', passport.authenticate('facebook-login', {
  scope: ['user_friends', 'user_photos']
}
))

router.get('/auth/facebook/callback', passport.authenticate('facebook-login'), (req, res) =>{
  res.redirect('/home')
})

//link accounts (authorize)

router.get('/connect/facebook', passport.authorize('facebook', {
  scope: ['email', 'user_posts', 'public_profile']
}
));

router.get('/connect/facebook/callback', passport.authorize('facebook'), (req, res) =>{
  res.redirect('/home')
})


//serialize routes
router.use('/users', cookieParse, require('./controllers/users'))

//render front end routes in react
router.get(/\/*/, (req, res) =>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

module.exports = router
