module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/drafts/countryCtrl')(app.locals.db);
  const router  = express.Router();

  router.get('/', ctrl.findAll);

  return router;
};
