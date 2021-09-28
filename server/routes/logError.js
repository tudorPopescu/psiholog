module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../controllers/logErrorCtrl')(app.locals.db);
  const router  = express.Router();

  router.post('/', ctrl.create);
  router.get('/', ctrl.findAll);
  router.get('/:id', ctrl.find);
  router.delete('/', ctrl.destroyAll);
  router.delete('/:id', ctrl.destroy);

  return router;
};
