const router = require('express').Router();
const controller = require('./controller');
const auth = require('../../services/auth');
const passport = require('passport')


router.get('/', controller.find);
router.get('/logout', controller.logout);
router.post('/', passport.authenticate('local-signup'), controller.signup);
router.post('/login', passport.authenticate('local-login'), controller.login);

module.exports = router;
