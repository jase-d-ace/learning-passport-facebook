const bcrypt = require('bcrypt'),
      db = require('../db');

const user = {};

user.create = (user) =>{
  const password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(5));
  return db.one(`INSERT INTO users(username, password_digest) VALUES($1, $2) returning *`, [user.username, password])
};

user.update = (token, name, facebook_id, id) => {
  return db.one(`UPDATE users SET facebook_token = $1, facebook_name = $2, facebook_id=$3 WHERE id = $4 returning *`, [token, name, facebook_id, id])
}

user.findByUsername = (username) =>{
  return db.one(`SELECT * FROM users WHERE username = $1`, [username])
};

module.exports = user;
