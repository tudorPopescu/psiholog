module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/config/cfgCompartmentCtrl')(app.locals.db);
  const router  = express.Router();

  router.get('/', ctrl.findAll);
  router.post('/', ctrl.create);

  return router;
}