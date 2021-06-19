module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../../controllers/config/cfgPayRollCentralizingCtrl')(app.locals.db);
  const router  = express.Router();

  router.get('/', ctrl.findAll);
  router.get('/:id', ctrl.find);
  router.post('/', ctrl.create);
  router.put('/', ctrl.update);
  router.delete('/:id', ctrl.destroy);

  return router;
}