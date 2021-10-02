module.exports = app => {
  'use strict';
  const router     = require('express').Router();
  const _          = require('lodash');
  const jwt        = require('jsonwebtoken');
  const jwtRefresh = require('jsonwebtoken-refresh');

  router.get('/', (req, res) => {
    const token = req.headers['x-access-token'] || req.body.token || req.params.token;

    if (token) {
      jwt.verify(token, app.locals.config.sKey, function checkToken(err) {
        if (!err) {
          const obj = jwt.decode(token, {complete: true});
          res.send({token: jwtRefresh.refresh(obj, 86400, app.locals.config.sKey, null)});
        } else {
          res.send({token: null});
        }
      });
    } else {
      res.send({token: null});
    }
  });

  return router;
};
