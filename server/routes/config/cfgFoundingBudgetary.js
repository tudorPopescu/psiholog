module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/config/cfgFoundingBudgetaryCtrl')(app.locals.db);
  const router  = express.Router();

  router.get('/', ctrl.findAll);
  router.get('/unit', ctrl.findAllForUnit);
  router.post('/', ctrl.createDestroy);
  router.post('/activity', ctrl.findAcivityByFounding);

  return router;
}