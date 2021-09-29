module.exports = app=> {
  'use strict';
  const updateLastLogin = require('../utils/utils')(app.locals.db).updateLastLogin;
  const authenticate = require('./authentication').authenticate;
  const jwt = require('jsonwebtoken');
  const router = require('express').Router();

  function render(res, user) {
    delete user.salt;
    delete user.password;

    user.token = jwt.sign(user, app.locals.config.sKey, {expiresIn: 86400});
    updateLastLogin(user.id);
    res.json(user);
  }

  router.post('/login', (req, res)=> {
    let d = new RegExp('"', 'g');
    let q = new RegExp('\'', 'g');
    let email = req.body.email.toLowerCase().replace(d, '').replace(q, '').replace(/\s/g, '');
    let email_regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (email_regex.test(email)) {
      app.locals.db.query(`SELECT id, first_name, last_name, password, salt FROM "User" WHERE email = '${req.body.email}'`, {type: app.locals.db.QueryTypes.SELECT}).then(user => {
        if (user.length) {
          if (authenticate(req.body.password, user[0].salt, user[0].password)) {
            render(res, user[0]);
          } else {
            res.json({success: false, message: 'Parolă greșită'});
          }
        } else {
          res.json({success: false, message: 'Utilizator inexistent'});
        }
      }).catch(e => {
        console.error('Autentificare eșuată', e);
        res.json({success: false, message: 'Autentificare eșuată'});
      })
    } else {
      res.json({success: false, message: 'Adresa de email nu este validă'});
    }
  });

  return router;
};
