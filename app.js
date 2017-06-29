//dependencies
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      bcrypt = require('bcrypt'),
      session = require('express-session'),
      morgan = require('morgan'),
      passport = require('passport'),
      env = require('dotenv'),
      PORT = process.env.PORT || 3000;

//hook up dotenv
env.config();

//hook up cors
app.use(cors());

//hook up morgan
app.use(morgan('dev'));

//hook up express and react
app.use(express.static('build'));

//hook up sessions
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//hook up bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

//hook up cookieParser
app.use(cookieParser())

//(de)serialize users
const person = require('./models/user');
const localStrat = require('passport-local').Strategy;
const facebookStrat = require('passport-facebook').Strategy;

//when i integrate with a database, this will be the serialize function that i use.

passport.deserializeUser((userObj, done) =>{
  person.findByUsername(userObj.username).then((user) =>{
    console.log(user)
    done(null, user);
  }).catch((error) =>{
    console.log('serialize error: ', error);
    return done(null, false);
  });
});

// passport.deserializeUser((obj, done) =>{
//   done(null, obj)
// })

passport.serializeUser((user, done) =>{
   done(null, user)
});

//passport strats
//signup strat
passport.use('local-signup', new localStrat({
    usernameField: 'user[username]'
    , passwordField: 'user[password]'
    , passReqToCallback: true
}, (req, username, password, done) => {
    person.create(req.body.user).then((user) => {
        return done(null, user);
    }).catch((error) => {
        console.log('User Creation Error: ', error);
        return done(null, false);
    });
}));

//login strat
passport.use('local-login', new localStrat({
    usernameField: 'user[username]'
    , passwordField: 'user[password]'
    , passReqToCallback: true
}, (req, username, password, done) => {
    person.findByUsername(username).then((user) => {
        if (user) {
            const isAuthed = bcrypt.compareSync(password, user.password_digest);
            if (isAuthed) {
              return done(null, user);
            }
            else {
              return done(null, false);
            }
        }
        else {
          return done(null, false);
        }
    }).catch((error) => {
        console.log('User Login Error: ', error);
    });
}));

//facebook strat
passport.use('facebook-login', new facebookStrat({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  profileFields: ['id', 'displayName', 'photos', 'friends'],
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, callback) =>{
  console.log('in callback', req.user);
  person.update(accessToken, profile.displayName, profile.id, req.user.id).then((user) =>{
    console.log('user updated: ', user)
    return callback(null, user)
  }).catch((error) =>{
    console.log('facebook error: ', error);
    return callback(null, false)
  })
}))

passport.use('facebook', new facebookStrat({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  profileFields: ['id', 'displayName', 'photos', 'friends'],
  callbackURL: 'http://localhost:3000/connect/facebook/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, callback) =>{
  console.log('in callback', req.user);
  person.update(accessToken, profile.displayName, profile.id, req.user.id).then((user) =>{
    console.log('user updated: ', user)
    return callback(null, user)
  }).catch((error) =>{
    console.log('facebook error: ', error);
    return callback(null, false)
  })
}))

//hook up router
app.use(require('./router'));

//check for life
app.listen(PORT, ()=>{
  console.log(`ALIVE ON PORT ${PORT}`)
})
