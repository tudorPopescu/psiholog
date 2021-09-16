module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../controllers/contactCtrl')(app.locals.db);
  const router  = express.Router();

  router.post('/', ctrl.sendEmail);

  return router;
};
