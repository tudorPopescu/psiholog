module.exports = app => {
  'use strict';
  const express = require('express');
  const ctrl    = require('../controllers/logActionCtrl')(app.locals.db);
  const router  = express.Router();

  router.post('/', ctrl.create);
  router.get('/:start_date/:end_date', ctrl.findAll);

  return router;
}