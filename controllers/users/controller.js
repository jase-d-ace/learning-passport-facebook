const user = require('../../models/user');
const controller = {};

controller.find = (req, res) =>{
  user.findByUsername(req.user.username).then((data) =>{
    res.json(data);
  }).catch((error) =>{
    console.log('User Find Error: ', error);
  })
};

controller.logout = (req, res) =>{
  req.logOut();
  req.session.destroy();
  res.clearCookie('connect-sid');
  res.redirect('/');
};

controller.signup = (req, res) =>{
  console.log(req.user);
  res.redirect('/home');
};

controller.login = (req, res) =>{
  console.log(req.user);
  res.redirect('/home');
};

controller.oAuth = (req, res) =>{
  user.getOauth(req.user.id).then((data)=>{
    res.json(data);
  }).catch(()=>{
    console.log('oauth get error: ', error)
  })
}

module.exports = controller;
